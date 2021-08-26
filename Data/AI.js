import { sleep, blankCard } from "./data"
import { minAloneScore, minCallScore, decidePace, debugMode, logMode } from "../Data/data"

//////////////
// AI LOGIC //
//////////////

const scoreHand = (hand, trumpCode, leftSuitCode, matchSuit) => {
	let score = 0
	for (const card of hand) {
		score += getCardScore(card, trumpCode, leftSuitCode, matchSuit)
	}
	return score
}

const getCardScore = (card, trumpCode, leftSuitCode, matchSuit) => {
	let score = card.value
	if (card.suit.code === trumpCode) {
		score += 10
		if (card.faceValue === "J") {
			score += 30
		}
	} else if (card.suit.code === leftSuitCode) {
		if (card.faceValue === "J") score += 20
	} else if (matchSuit !== null) {
		// a match IS in play, so deduct points for non match suit
		if (card.suit.code !== matchSuit) score -= card.value
	}
	return score
}

const scoreHandByTrump = (currentPlayer, hand, matchStage, suitMap, trumpCode, upTrump, suits, dealer) => {
	debugMode && console.log(suitMap)
	const leftCode = suits[trumpCode].left.code
	if (trumpCode in suitMap || (leftCode in suitMap && suitMap[leftCode].find(card => card.faceValue === "J"))) {
		debugMode && console.log("TRUMP in hand")
		let handScore = scoreHand(hand, trumpCode, leftCode, null) // null is matchSuit since scoreHand is used in trump selection AND play
		let enhancedScore = handScore
		if (matchStage === "CALL" && currentPlayer !== dealer) {
			if (findIsTeammate(currentPlayer, dealer)) {
				enhancedScore += upTrump.value + 10
				if (upTrump.faceValue === "J") enhancedScore += 30
			} else {
				enhancedScore -= upTrump.value + 10
				if (upTrump.faceValue === "J") enhancedScore -= 20
			}
		}
		return enhancedScore
	} else return 0
}

export const getPlayerHand = (player, playerHand, nonPlayerHands) => {
	switch (player) {
		case 0: return [...playerHand]
		case 1: return [...nonPlayerHands[0]]
		case 2: return [...nonPlayerHands[1]]
		case 3: return [...nonPlayerHands[2]]
	}
}

export const findIsTeammate = (player1, player2) => {
	if ((player1 + 2) % 4 === player2) return true
	else return false
}

export const groupBySuit = (cards) => {
	return cards.reduce((acc, card) => {
		let key = card.suit.code
		if (!acc[key]) {
			acc[key] = []
		}
		acc[key].push(card)
		return acc
	}, {})
}

export const scoreTrick = (playedCards, trump, matchSuit) => {
	debugMode && console.log(playedCards, trump)
	let highScore = -Infinity
	let winner
	const plays = [playedCards[0], playedCards[1], playedCards[2], playedCards[3]]
	plays.forEach((play, idx) => {
		if (play !== blankCard) {
			const cardScore = getCardScore(play, trump.code, trump.left.code, matchSuit)
			if (cardScore > highScore) {
				highScore = cardScore
				winner = idx
			}
		}
	})
	return { winner, highScore }
}


export const decideTrump = (currentPlayer, hand, matchStage, upTrump, suits, dealer, pass, setGoAlone) => {
	debugMode && console.log("------------------ DECIDE TRUMP FUNCTION: Player: ", currentPlayer, matchStage)
	const suitMap = groupBySuit(hand)
	switch (matchStage) {
		case "CALL": {
			const trumpCode = upTrump.suit.code
			const result = scoreHandByTrump(currentPlayer, hand, matchStage, suitMap, trumpCode, upTrump, suits, dealer)
			debugMode && console.log("Hand Score: ", result)
			if (result >= minAloneScore) setGoAlone(currentPlayer)
			if (result > minCallScore) suits[upTrump.suit.code].select()
			else sleep(decidePace).then(() => pass())
			break
		}
		// PICK OR STUCK
		default: {
			const suitScores = [
				[scoreHandByTrump(currentPlayer, hand, matchStage, suitMap, "h", upTrump, suits, dealer), 'h'],
				[scoreHandByTrump(currentPlayer, hand, matchStage, suitMap, "d", upTrump, suits, dealer), 'd'],
				[scoreHandByTrump(currentPlayer, hand, matchStage, suitMap, "c", upTrump, suits, dealer), 'c'],
				[scoreHandByTrump(currentPlayer, hand, matchStage, suitMap, "s", upTrump, suits, dealer), 's']]
			let highestScore = 0
			let highSuitCode
			for (const score of suitScores) {
				if (score[1] === upTrump.code) continue
				else if (score[0] > highestScore) {
					highestScore = score[0]
					highSuitCode = score[1]
				}
			}
			debugMode && console.log("Hand Scores per Trump (h/d/c/s): ", suitScores)
			// setShowPromptModal(false)
			if (matchStage === "PICK") {
				if (highestScore >= minAloneScore) setGoAlone(currentPlayer)
				if (highestScore > minCallScore) suits[highSuitCode].select()
				else sleep(decidePace).then(() => pass())
			} else {
				if (highestScore >= minAloneScore) setGoAlone(currentPlayer)
				suits[highSuitCode].select()
			}
			break
		}
	}
}

export const decideAIplay = (currentPlayer, trump, matchSuit, playerHand, nonPlayerHands, handlePlayerChoice, playedCards) => {
	debugMode && console.log("------------------ DECIDE AI PLAY FUNCTION: Player: ", currentPlayer)
	const hand = [...getPlayerHand(currentPlayer, playerHand, nonPlayerHands)]
	const suitMap = groupBySuit(hand)
	// Move the left to the proper trump suit in suitMap
	if (trump.left.code in suitMap && suitMap[trump.left.code].find(card => card.faceValue === "J")) {
		const leftIdx = suitMap[trump.left.code].findIndex(card => card.faceValue === "J")
		const leftCard = suitMap[trump.left.code][leftIdx]
		suitMap[trump.left.code].slice(leftIdx, 1)
		if (trump.code in suitMap) suitMap[trump.code].push(leftCard)
		else suitMap[trump.code] = [leftCard]
	}
	let chosenCard = null
	debugMode && console.log(hand, suitMap)
	// if you are first player of match
	if (!matchSuit) {
		debugMode && console.log("decideAIplay: NO MATCH SUIT SET")
		let highOffSuitValue = 0
		let highOffSuitCard
		for (const suitCode in suitMap) {
			if (suitCode === trump.code) continue
			for (const card of suitMap[suitCode]) {
				if (card.value > highOffSuitValue) {
					highOffSuitValue = card.value
					highOffSuitCard = card
				}
			}
		}
		// if sufficient high offsuit card, set chosenCard
		if (highOffSuitValue > 4) {
			debugMode && console.log("decideAIplay: sufficient high offsuit card")
			chosenCard = highOffSuitCard
		}
		// if no sufficient high offsuit card
		else if (suitMap.hasOwnProperty(trump.code)) {
			debugMode && console.log("decideAIplay: NO sufficient high offsuit card, but you have TRUMP suit")
			// if you have trump and its the right (J), bring out the dead
			const rightTrump = suitMap[trump.code].find(card => card.faceValue === "J")
			chosenCard = rightTrump !== undefined ? rightTrump : null
		}
		if (!chosenCard) {
			debugMode && console.log("decideAIplay: NO high offsuit card, NO J of TRUMP suit, choosing highest offsuit")
			chosenCard = highOffSuitCard
		}
		if (!chosenCard) {
			// Player only has trump in hand, so lay high trump
			// if you have off trump, lay lowest
			let highTrumpValue = 0
			let highTrumpCard
			for (const card of suitMap[trump.code]) {
				if (card.value > highTrumpValue) {
					highTrumpValue = card.value
					highTrumpCard = card
				}
			}
			chosenCard = highTrumpCard
		}
	} else {
		// not the first player, so play to matchSuit or Trump
		debugMode && console.log("decideAIplay: MATCH SUIT ALREADY SET")
		const currentWinData = scoreTrick(playedCards, trump, matchSuit)
		if (suitMap.hasOwnProperty(matchSuit)) {
			debugMode && console.log("decideAIplay: PLAYER HAS MATCH SUIT IN HAND", matchSuit)
			if (findIsTeammate(currentWinData.winner, currentPlayer)) {
				// lay something low
				debugMode && console.log("decideAIplay: TEAMMATE IS WINNING, LAY LOW")
				let lowCardValue = Infinity
				let lowCard
				for (const card of suitMap[matchSuit]) {
					if (card.value < lowCardValue) {
						lowCardValue = card.value
						lowCard = card
					}
				}
				chosenCard = lowCard
			} else {
				debugMode && console.log("decideAIplay: TEAMMATE IS NOT WINNING, LAY HIGH IF YOU CAN BEAT IT")
				// try to win
				let highCardValue = currentWinData.highScore
				let highCard
				for (const card of suitMap[matchSuit]) {
					if (card.value > highCardValue) {
						highCardValue = card.value
						highCard = card
					}
				}
				chosenCard = highCard
				// can't beat it, lay low offsuit
				if (!chosenCard) {
					let lowCardValue = Infinity
					let lowCard
					for (const card of suitMap[matchSuit]) {
						if (card.value < lowCardValue) {
							lowCardValue = card.value
							lowCard = card
						}
					}
					chosenCard = lowCard
				}
			}
		} else {
			debugMode && console.log("decideAIplay: PLAYER DOES NOT HAVE MATCH SUIT IN HAND")
			if (findIsTeammate(currentWinData.winner, currentPlayer)) {
				debugMode && console.log("decideAIplay: TEAMMATE IS WINNING, LAY LOW OFF SUIT")
				// if you have off trump, lay lowest
				let lowCardValue = Infinity
				let lowCard
				for (const suit in suitMap) {
					if (suit === trump.code) continue
					for (const card of suitMap[suit]) {
						if (card.value < lowCardValue) {
							lowCardValue = card.value
							lowCard = card
						}
					}
				}
				chosenCard = lowCard
				// if you only have trump, lay lowest
				if (!chosenCard) {
					let lowTrumpValue = Infinity
					let lowTrumpCard
					for (const card of suitMap[trump.code]) {
						if (card.value < lowTrumpValue) {
							lowCardValue = card.value
							lowTrumpCard = card
						}
					}
					chosenCard = lowTrumpCard
				}
			} else {
				debugMode && console.log("decideAIplay: TEAMMATE IS NOT WINNING, LAY LOWEST WINNING TRUMP TO WIN OR LOW OFFSUIT TO PASS")
				let lowTrumpValue = Infinity
				let lowTrumpCard = null
				if (suitMap.hasOwnProperty(trump.code)) {
					for (const trumpCard of suitMap[trump.code]) {
						const scoredTrump = getCardScore(trumpCard, trump.code, trump.left.code, matchSuit)
						if (scoredTrump > currentWinData.highScore) {
							if (scoredTrump < lowTrumpValue) {
								lowTrumpValue = scoredTrump
								lowTrumpCard = trumpCard
							}
						}
					}
					chosenCard = lowTrumpCard
				}
				// didn't have any winning trump
				if (!chosenCard) {
					let lowestOffSuitValue = Infinity
					let lowestOffSuitCard
					for (const card of hand) {
						if (card.suit.code === trump.code) continue
						if (card.value < lowestOffSuitValue) {
							lowestOffSuitValue = card.value
							lowestOffSuitCard = card
						}
					}
					chosenCard = lowestOffSuitCard
				}
				if (!chosenCard) {
					let highTrumpValue = 0
					let highTrumpCard = null
					for (const card of suitMap[trump.code]) {
						if (card.value > highTrumpValue) {
							highTrumpValue = card.value
							highTrumpCard = card
						}
					}
					chosenCard = highTrumpCard
				}
			}
		}
	}
	if (!chosenCard) {
		debugMode && console.log("AI ERROR - NO CHOSEN CARD for player: ", currentPlayer)
	}
	debugMode && console.log("------------------ DECIDE AI PLAY RESULT: (card/hand)", chosenCard, hand)
	handlePlayerChoice(currentPlayer, chosenCard)
}