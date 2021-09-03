import { sleep, blankCard } from "./data"
import { minAloneScore, minCallScore, decidePace, debugMode, logMode, logFuncMode, AIDebugMode } from "../Data/data"

//////////////
// AI LOGIC //
//////////////

const scoreHand = (hand, trumpCode, leftSuitCode) => {
	logFuncMode && console.log("\n\nFUNCTION: scoreHand")
	logFuncMode && console.log(`Trump: ${trumpCode} Left: ${leftSuitCode}`)
	let score = 0
	for (const card of hand) {
		score += getCardScore(card, trumpCode, leftSuitCode, null)
	}
	logFuncMode && console.log(`\nscoreHand RESULT: ${score}`)
	return score
}

const getCardScore = (card, trumpCode, leftSuitCode, matchSuit) => {
	logFuncMode && console.log("\n\nFUNCTION: getCardScore")
	logFuncMode && console.log(`Card: ${card.faceValue} of ${card.suit.name}, Trump Right: ${trumpCode}, Left: ${leftSuitCode}, Match Suit: ${matchSuit}`)
	let score = card.value
	if (card.suit.code === trumpCode) {
		score += 10
		if (card.faceValue === "J") {
			score += 30
		}
	} else if (card.suit.code === leftSuitCode) {
		if (card.faceValue === "J") score += 20
	}
	// deduct points for non match suit so it can't win - this will also deduct from trump plays, however the effect is at worst 6 points which isn't enough to sway the +10, 20, or 30 effect of a trump card
	if (matchSuit !== null && card.suit.code !== matchSuit) {
		logFuncMode && console.log("Does not follow suit")
		// If its not the Left or the Right
		if (!(card.suit.code === trumpCode || (card.suit.code === leftSuitCode && card.faceValue === "J"))) {
			logFuncMode && console.log("Deducting for being offsuit and not left or right")
			score = 0
		}
	}
	logFuncMode && console.log(`\ngetCardScore RESULT: ${score}`)
	return score
}

const scoreHandByTrump = (currentPlayer, hand, matchStage, suitMap, trumpCode, upTrump, suits, dealer) => {
	AIDebugMode && console.log("\n\nFUNCTION: scoreHandByTrump")
	AIDebugMode && console.log(currentPlayer, hand, matchStage, suitMap, trumpCode, upTrump, suits, dealer)
	const leftCode = suits[trumpCode].left.code
	if (trumpCode in suitMap || (leftCode in suitMap && suitMap[leftCode].find(card => card.faceValue === "J"))) {
		AIDebugMode && console.log("TRUMP in hand")
		let handScore = scoreHand(hand, trumpCode, leftCode)
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
		AIDebugMode && console.log("\nscoreHandByTrump RESULT")
		AIDebugMode && console.log(enhancedScore)
		return enhancedScore
	} else return 0
}

export const getPlayerHand = (player, playerHand, nonPlayerHands) => {
	logFuncMode && console.log("\n\nFUNCTION: getPlayerHand")
	logFuncMode && console.log(`Player: ${player}, User Hand Length: ${playerHand.length}`)

	switch (player) {
		case 0: return [...playerHand]
		case 1: return [...nonPlayerHands[0]]
		case 2: return [...nonPlayerHands[1]]
		case 3: return [...nonPlayerHands[2]]
	}
}

export const findIsTeammate = (player1, player2) => {
	logFuncMode && console.log("\n\nFUNCTION: findIsTeammate")
	logFuncMode && console.log(player1, player2)

	logFuncMode && console.log("\nfindIsTeammate RESULT")
	logFuncMode && console.log((player1 + 2) % 4 === player2)
	return (player1 + 2) % 4 === player2
}

export const groupBySuit = (cards, player, trump) => {
	logFuncMode && console.log("\n\n---- FUNCTION: groupBySuit")
	logFuncMode && console.log(`User: ${player} | Trump: ${trump.name !== undefined ? trump.name : "not set"}`)
	logFuncMode && cards.forEach(card => console.log(`${card.faceValue} of ${card.suit.name}`))

	const suitMap = cards.reduce((acc, card) => {
		let key = card.suit.code
		if (!acc[key]) {
			acc[key] = []
		}
		acc[key].push(card)
		return acc
	}, {})
	if (player) {
		// If this is the USER, move the Left to Trump Suit, if applicable
		if (trump.code !== undefined) {
			// If you have Trump suit in your hand
			if (suitMap.hasOwnProperty(trump.left.code) && suitMap[trump.left.code].find(card => card.faceValue === "J") !== undefined) {
				// If you have the LEFT bower, put it in the Trump suit group (sort happends in sortHand)
				const leftIdx = suitMap[trump.left.code].findIndex(card => card.faceValue === "J")
				const left = suitMap[trump.left.code][leftIdx]
				suitMap[trump.left.code].splice(leftIdx)
				if (suitMap.hasOwnProperty(trump.code)) suitMap[trump.code].push(left)
				else suitMap[trump.code] = [left]
				logFuncMode && console.log("\n---- groupBySuit player RESULT (Trump is set + Left was moved to Trump Suit")
				logFuncMode && Object.keys(suitMap).forEach(suit => {
					console.log(`\n${suit}:`)
					suitMap[suit].forEach(card => {
						console.log(`${card.faceValue} of ${card.suit.name}`)
					})
				})
				return suitMap
			} else {
				// If you don't have the left bower
				logFuncMode && console.log("\n---- groupBySuit player RESULT (Trump is set + No Left in hand")
				logFuncMode && Object.keys(suitMap).forEach(suit => {
					console.log(`\n${suit}:`)
					suitMap[suit].forEach(card => {
						console.log(`${card.faceValue} of ${card.suit.name}`)
					})
				})
				return suitMap
			}
		} else {
			logFuncMode && console.log("\n---- groupBySuit player RESULT (Trump is NOT set)")
			logFuncMode && Object.keys(suitMap).forEach(suit => {
				console.log(`\n${suit}:`)
				suitMap[suit].forEach(card => {
					console.log(`${card.faceValue} of ${card.suit.name}`)
				})
			})
			return suitMap
		}
	} else {
		logFuncMode && console.log("\n---- groupBySuit RESULT (non-player)")
		logFuncMode && Object.keys(suitMap).forEach(suit => {
			console.log(`\n${suit}:`)
			suitMap[suit].forEach(card => {
				console.log(`${card.faceValue} of ${card.suit.name}`)
			})
		})
		return suitMap
	}
}

export const scoreTrick = (playedCards, trump, matchSuit) => {
	logFuncMode && console.log("\n\nFUNCTION: scoreTrick")
	logFuncMode && console.log(`Trump: ${trump.name} | Match Suit: ${matchSuit}`)
	let highScore = -Infinity
	let winner
	const plays = [playedCards[0], playedCards[1], playedCards[2], playedCards[3]]
	plays.forEach((play, idx) => {
		if (play !== blankCard) {
			logFuncMode && console.log(`scoreTrick for Player: ${idx} | Card: ${play.faceValue} of ${play.suit.name}`)
			const cardScore = getCardScore(play, trump.code, trump.left.code, matchSuit)
			if (cardScore > highScore) {
				highScore = cardScore
				winner = idx
			}
		} else logFuncMode && console.log(`scoreTrick for Player: ${idx} | Card: Blank Card`)
	})
	logFuncMode && console.log("\nscoreTrick RESULT")
	logFuncMode && console.log(`Winner: Player ${winner} with score ${highScore}`)
	return { winner, highScore }
}


export const decideTrump = (currentPlayer, hand, matchStage, upTrump, suits, dealer, pass, setGoAlone, upTrumpHistory) => {
	AIDebugMode && console.log("FUNCTION: decideTrump")
	AIDebugMode && console.log("currentPlayer, hand, matchStage, upTrump, suits, dealer, pass, setGoAlone")
	AIDebugMode && console.log(currentPlayer, hand, matchStage, upTrump, suits, dealer, pass, setGoAlone)
	const suitMap = groupBySuit(hand, false, suits[upTrump.suit.code])
	switch (matchStage) {
		case "CALL": {
			const trumpCode = upTrump.suit.code
			const result = scoreHandByTrump(currentPlayer, hand, matchStage, suitMap, trumpCode, upTrump, suits, dealer)
			AIDebugMode && console.log("Hand Score: ", result)
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
				if (score[1] !== upTrumpHistory.code && score[0] > highestScore) {
					highestScore = score[0]
					highSuitCode = score[1]
				}
			}
			AIDebugMode && console.log("Hand Scores per Trump (h/d/c/s): ", suitScores)
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
	AIDebugMode && console.log("------------------ DECIDE AI PLAY FUNCTION: Player: ", currentPlayer)
	const hand = [...getPlayerHand(currentPlayer, playerHand, nonPlayerHands)]
	const suitMap = groupBySuit(hand, false, trump)
	// Move the left to the proper trump suit in suitMap
	if (trump.left.code in suitMap && suitMap[trump.left.code].find(card => card.faceValue === "J")) {
		const leftIdx = suitMap[trump.left.code].findIndex(card => card.faceValue === "J")
		const leftCard = suitMap[trump.left.code][leftIdx]
		suitMap[trump.left.code].slice(leftIdx, 1)
		if (trump.code in suitMap) suitMap[trump.code].push(leftCard)
		else suitMap[trump.code] = [leftCard]
	}
	let chosenCard = null
	AIDebugMode && console.log(hand, suitMap)
	// if you are first player of match
	if (!matchSuit) {
		AIDebugMode && console.log("decideAIplay: NO MATCH SUIT SET")
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
			AIDebugMode && console.log("decideAIplay: sufficient high offsuit card")
			chosenCard = highOffSuitCard
		}
		// if no sufficient high offsuit card
		else if (suitMap.hasOwnProperty(trump.code)) {
			AIDebugMode && console.log("decideAIplay: NO sufficient high offsuit card, but you have TRUMP suit")
			// if you have trump and its the right (J), bring out the dead
			const rightTrump = suitMap[trump.code].find(card => card.faceValue === "J")
			chosenCard = rightTrump !== undefined ? rightTrump : null
		}
		if (!chosenCard) {
			AIDebugMode && console.log("decideAIplay: NO high offsuit card, NO J of TRUMP suit, choosing highest offsuit")
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
		AIDebugMode && console.log("decideAIplay: MATCH SUIT ALREADY SET")
		const currentWinData = scoreTrick(playedCards, trump, matchSuit)
		if (suitMap.hasOwnProperty(matchSuit)) {
			AIDebugMode && console.log("decideAIplay: PLAYER HAS MATCH SUIT IN HAND", matchSuit)
			if (findIsTeammate(currentWinData.winner, currentPlayer)) {
				// lay something low
				AIDebugMode && console.log("decideAIplay: TEAMMATE IS WINNING, LAY LOW")
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
				AIDebugMode && console.log("decideAIplay: TEAMMATE IS NOT WINNING, LAY HIGH IF YOU CAN BEAT IT")
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
			AIDebugMode && console.log("decideAIplay: PLAYER DOES NOT HAVE MATCH SUIT IN HAND")
			if (findIsTeammate(currentWinData.winner, currentPlayer)) {
				AIDebugMode && console.log("decideAIplay: TEAMMATE IS WINNING, LAY LOW OFF SUIT")
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
				AIDebugMode && console.log("decideAIplay: TEAMMATE IS NOT WINNING, LAY LOWEST WINNING TRUMP TO WIN OR LOW OFFSUIT TO PASS")
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
		AIDebugMode && console.log("AI ERROR - NO CHOSEN CARD for player: ", currentPlayer)
	}
	AIDebugMode && console.log("------------------ DECIDE AI PLAY RESULT: (card/hand)", chosenCard, hand)
	handlePlayerChoice(currentPlayer, chosenCard)
}