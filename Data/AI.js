import { sleep, blankCard } from "./data"
import { minAloneScore, minCallScore, decidePace, debugMode, logMode, logFuncMode, AIDebugMode, resetDefaultGamSettingsFlag } from "../Data/data"

///////////////////
// AI LOGIC //
///////////////////

const scoreHand = (hand, trumpCode, leftSuitCode) => {
	logFuncMode && console.log("\n\nFUNCTION: scoreHand --------------------------")
	logFuncMode && console.log(`Trump: ${ trumpCode } Left: ${ leftSuitCode }`)
	let score = 0
	for (const card of hand) {
		score += getCardScore(card, trumpCode, leftSuitCode, null)
	}
	logFuncMode && console.log(`\nscoreHand RESULT: ${ score } ----------------------`)
	return score
}

const getCardScore = (card, trumpCode, leftSuitCode, matchSuit) => {
	logFuncMode || resetDefaultGamSettingsFlag && console.log("\n\nFUNCTION: getCardScore")
	logFuncMode || resetDefaultGamSettingsFlag && console.log(`Card: ${ card.faceValue } of ${ card.suit.name }, Trump Right: ${ trumpCode }, Left: ${ leftSuitCode }, Match Suit: ${ matchSuit }`)
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
		logFuncMode || resetDefaultGamSettingsFlag && console.log("Does not follow suit")
		// If its not the Left or the Right
		if (!(card.suit.code === trumpCode || (card.suit.code === leftSuitCode && card.faceValue === "J"))) {
			logFuncMode || resetDefaultGamSettingsFlag && console.log("Deducting for being offsuit and not left or right")
			score = 0
		}
	}
	logFuncMode || resetDefaultGamSettingsFlag && console.log(`\ngetCardScore RESULT: ${ score }`)
	return score
}

const scoreHandByTrump = (currentPlayer, hand, matchStage, suitMap, trumpCode, upTrump, suits, dealer) => {
	debugMode && console.log("\n\nFUNCTION: scoreHandByTrump")
	debugMode && console.log(currentPlayer, hand, matchStage, suitMap, trumpCode, upTrump, suits, dealer)
	const leftCode = suits[ trumpCode ].left.code
	if (trumpCode in suitMap) {
		debugMode && console.log("TRUMP in hand")
		let handScore = scoreHand(hand, trumpCode, leftCode)
		let enhancedScore = handScore
		if (matchStage === "CALL" && currentPlayer !== dealer) {
			if (findIsTeammate(currentPlayer, dealer)) {
				enhancedScore += (upTrump.value + 10)
				if (upTrump.faceValue === "J") enhancedScore += 30
			} else {
				enhancedScore -= (upTrump.value + 10)
				if (upTrump.faceValue === "J") enhancedScore -= 30
			}
		} else if (matchStage === "PICK") {
			AIDebugMode && console.log("ENHANCING SCORE BASED ON AMT OF TRUMP: BEFORE", enhancedScore)
			suitMap[ trumpCode ].forEach(card => {
				enhancedScore += (card.value + 2)
			})
			enhancedScore += (5 * suitMap[ trumpCode ].filter(card => card.faceValue === "J").length)
			AIDebugMode && console.log("ENHANCING SCORE BASED ON AMT OF TRUMP: AFTER", enhancedScore)
		}
		debugMode && console.log("\nscoreHandByTrump RESULT")
		debugMode && console.log(enhancedScore)
		return enhancedScore
	} else return 0
}

export const getPlayerHand = (player, playerHand, nonPlayerHands) => {
	logFuncMode && console.log("\n\nFUNCTION: getPlayerHand")
	logFuncMode && console.log(`Player: ${ player }, User Hand Length: ${ playerHand.length }`)

	switch (player) {
		case 0: return [ ...playerHand ]
		case 1: return [ ...nonPlayerHands[ 0 ] ]
		case 2: return [ ...nonPlayerHands[ 1 ] ]
		case 3: return [ ...nonPlayerHands[ 2 ] ]
	}
}

export const findIsTeammate = (player1, player2) => {
	logFuncMode && console.log("\n\nFUNCTION: findIsTeammate")
	logFuncMode && console.log(player1, player2)

	logFuncMode && console.log("\nfindIsTeammate RESULT")
	logFuncMode && console.log((player1 + 2) % 4 === player2)
	return (player1 + 2) % 4 === player2
}

export const groupBySuit = (cards, trump) => {
	logFuncMode && console.log("\n\n---- FUNCTION: groupBySuit")
	logFuncMode && console.log(`Trump: ${ trump.name !== undefined ? trump.name : "not set" }`)
	logFuncMode && cards.forEach(card => console.log(`${ card.faceValue } of ${ card.suit.name }`))

	const suitMap = cards.reduce((acc, card) => {
		let key = card.suit.code
		if (!acc[ key ]) {
			acc[ key ] = []
		}
		acc[ key ].push(card)
		return acc
	}, {})
	if (trump.code !== undefined) {
		// If you have Trump suit in your hand
		if (suitMap.hasOwnProperty(trump.left.code) && suitMap[ trump.left.code ].find(card => card.faceValue === "J") !== undefined) {
			// If you have the LEFT bower, put it in the Trump suit group (sort happends in sortHand)
			const leftIdx = suitMap[ trump.left.code ].findIndex(card => card.faceValue === "J")
			const left = suitMap[ trump.left.code ][ leftIdx ]
			suitMap[ trump.left.code ].splice(leftIdx)
			if (suitMap.hasOwnProperty(trump.code)) suitMap[ trump.code ].push(left)
			else suitMap[ trump.code ] = [ left ]
			logFuncMode && console.log("\n---- groupBySuit player RESULT (Trump is set + Left was moved to Trump Suit")
			logFuncMode && Object.keys(suitMap).forEach(suit => {
				console.log(`\n${ suit }:`)
				suitMap[ suit ].forEach(card => {
					console.log(`${ card.faceValue } of ${ card.suit.name }`)
				})
			})
			return suitMap
		} else {
			// If you don't have the left bower
			logFuncMode && console.log("\n---- groupBySuit player RESULT (Trump is set + No Left in hand")
			logFuncMode && Object.keys(suitMap).forEach(suit => {
				console.log(`\n${ suit }:`)
				suitMap[ suit ].forEach(card => {
					console.log(`${ card.faceValue } of ${ card.suit.name }`)
				})
			})
			return suitMap
		}
	} else {
		logFuncMode && console.log("\n---- groupBySuit player RESULT (Trump is NOT set)")
		logFuncMode && Object.keys(suitMap).forEach(suit => {
			console.log(`\n${ suit }:`)
			suitMap[ suit ].forEach(card => {
				console.log(`${ card.faceValue } of ${ card.suit.name }`)
			})
		})
		return suitMap
	}

}

export const scoreTrick = (playedCards, trump, matchSuit) => {
	logFuncMode || resetDefaultGamSettingsFlag && console.log("\n\nFUNCTION: scoreTrick")
	logFuncMode || resetDefaultGamSettingsFlag && console.log(`Trump: ${ trump.name } | Match Suit: ${ matchSuit }`)
	let highScore = -Infinity
	let winner
	const plays = [ playedCards[ 0 ], playedCards[ 1 ], playedCards[ 2 ], playedCards[ 3 ] ]
	plays.forEach((play, idx) => {
		if (play !== blankCard) {
			logFuncMode || resetDefaultGamSettingsFlag && console.log(`scoreTrick for Player: ${ idx } | Card: ${ play.faceValue } of ${ play.suit.name }`)
			const cardScore = getCardScore(play, trump.code, trump.left.code, matchSuit)
			if (cardScore > highScore) {
				highScore = cardScore
				winner = idx
			}
		} else logFuncMode || resetDefaultGamSettingsFlag && console.log(`scoreTrick for Player: ${ idx } | Card: Blank Card`)
	})
	logFuncMode || resetDefaultGamSettingsFlag && console.log("\nscoreTrick RESULT")
	logFuncMode || resetDefaultGamSettingsFlag && console.log(`Winner: Player ${ winner } with score ${ highScore }`)
	return { winner, highScore }
}


export const decideTrump = (currentPlayer, hand, matchStage, upTrump, suits, dealer, pass, setGoAlone, upTrumpHistory) => {
	AIDebugMode && matchStage === "CALL" && console.log("\x1b[41m\x1b[37m%s\x1b[0m", "----------------------------------- AI DEBUG MODE - DECIDE TRUMP CALL -----------------------------------")
	AIDebugMode && matchStage !== "CALL" && console.log("\x1b[45m\x1b[37m%s\x1b[0m", "----------------------------------- AI DEBUG MODE - DECIDE TRUMP CALL -----------------------------------")
	AIDebugMode && console.log(`FUNCTION: decideTrump Player ${ currentPlayer } during ${ matchStage } stage`)
	switch (matchStage) {
		case "CALL": {
			const suitMap = groupBySuit(hand, suits[ upTrump.suit.code ])
			const result = scoreHandByTrump(currentPlayer, hand, matchStage, suitMap, upTrump.suit.code, upTrump, suits, dealer)
			AIDebugMode && console.log("----- Hand Score: ", result)
			if (result >= minAloneScore) setGoAlone(currentPlayer)
			if (result > minCallScore) suits[ upTrump.suit.code ].select()
			else sleep(decidePace).then(() => pass())
			break
		}
		// PICK OR STUCK
		default: {
			const suitMapH = groupBySuit(hand, suits.h)
			const suitMapD = groupBySuit(hand, suits.d)
			const suitMapC = groupBySuit(hand, suits.c)
			const suitMapS = groupBySuit(hand, suits.s)
			const suitScores = [
				[ scoreHandByTrump(currentPlayer, hand, matchStage, suitMapH, "h", upTrump, suits, dealer), 'h' ],
				[ scoreHandByTrump(currentPlayer, hand, matchStage, suitMapD, "d", upTrump, suits, dealer), 'd' ],
				[ scoreHandByTrump(currentPlayer, hand, matchStage, suitMapC, "c", upTrump, suits, dealer), 'c' ],
				[ scoreHandByTrump(currentPlayer, hand, matchStage, suitMapS, "s", upTrump, suits, dealer), 's' ] ]
			let highestScore = 0
			let highSuitCode
			for (const score of suitScores) {
				if (score[ 1 ] !== upTrumpHistory.code && score[ 0 ] > highestScore) {
					highestScore = score[ 0 ]
					highSuitCode = score[ 1 ]
				}
			}
			AIDebugMode && console.log("Hand Scores per possible Trump: ")
			AIDebugMode && suitScores.forEach(suit => console.log(`${ suit[ 1 ] }: ${ suit[ 0 ] }`))
			AIDebugMode && console.log(`Highest Scored Choice: ${ highSuitCode }: ${ highestScore }`)
			if (matchStage === "PICK") {
				if (highestScore >= minAloneScore) setGoAlone(currentPlayer)
				if (highestScore > minCallScore) suits[ highSuitCode ].select()
				else sleep(decidePace).then(() => pass())
			} else {
				if (highestScore >= minAloneScore) setGoAlone(currentPlayer)
				suits[ highSuitCode ].select()
			}
			break
		}
	}
}

export const decideAIplay = (currentPlayer, trump, matchSuit, playerHand, nonPlayerHands, handlePlayerChoice, playedCards) => {
	AIDebugMode && console.log("\x1b[42m\x1b[37m%s\x1b[0m", "----------------------------------- AI DEBUG MODE - DECIDE PLAY -----------------------------------")
	AIDebugMode && console.log("------------------ DECIDE AI PLAY FUNCTION: Player", currentPlayer)
	const hand = [ ...getPlayerHand(currentPlayer, playerHand, nonPlayerHands) ]
	const suitMap = groupBySuit(hand, trump)
	let chosenCard = null
	AIDebugMode && console.log("Suit Map:")
	AIDebugMode && Object.keys(suitMap).forEach(suit => {
		console.log(`\n${ suit }:`)
		suitMap[ suit ].forEach(card => {
			console.log(`${ card.faceValue } of ${ card.suit.name }`)
		})
	})
	// if you are first player of match
	if (!matchSuit) {
		AIDebugMode && console.log("decideAIplay: NO MATCH SUIT SET")
		let highOffSuitValue = 0
		let highOffSuitCard
		for (const suitCode in suitMap) {
			if (suitCode === trump.code) continue
			for (const card of suitMap[ suitCode ]) {
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
		// if no sufficient high offsuit card and you have trump
		if (!chosenCard && suitMap.hasOwnProperty(trump.code) && suitMap[ trump.code ].length > 0) {
			AIDebugMode && console.log("decideAIplay: NO sufficient high offsuit card, but you have TRUMP suit - attempting the right")
			// if you have trump and its the right (J), bring out the dead
			const rightTrump = suitMap[ trump.code ].find(card => card.faceValue === "J" && card.suit.code === trump.code)
			chosenCard = rightTrump !== undefined ? rightTrump : null
		}
		// You don't have the right
		if (!chosenCard) {
			AIDebugMode && console.log("decideAIplay: NO high offsuit card, NO J of TRUMP suit, choosing highest offsuit")
			chosenCard = highOffSuitCard
		}
		//  There was no high off card
		if (!chosenCard) {
			AIDebugMode && console.log("decideAIplay: No highoffsuit card at all must only have trump - laying highest trump, ")
			let highTrumpValue = 0
			let highTrumpCard
			for (const card of suitMap[ trump.code ]) {
				if (card.value > highTrumpValue) {
					highTrumpValue = card.value
					highTrumpCard = card
				}
			}
			chosenCard = highTrumpCard
		}
	} else {
		// not the first player, so play to matchSuit or Trump
		const currentWinData = scoreTrick(playedCards, trump, matchSuit)
		AIDebugMode && console.log("decideAIplay: MATCH SUIT ALREADY SET")
		AIDebugMode && console.log(`Current Winner/Score: ${ currentWinData.winner }/${ currentWinData.highScore }`)
		if (suitMap.hasOwnProperty(matchSuit) && suitMap[ matchSuit ].length > 0) {
			AIDebugMode && console.log("decideAIplay: PLAYER HAS MATCH SUIT IN HAND:", matchSuit)
			if (findIsTeammate(currentWinData.winner, currentPlayer)) {
				// lay something low
				AIDebugMode && console.log("decideAIplay: TEAMMATE IS WINNING, LAY LOW")
				let lowCardValue = Infinity
				let lowCard
				for (const card of suitMap[ matchSuit ]) {
					if (card.value < lowCardValue) {
						lowCardValue = card.value
						lowCard = card
					}
				}
				chosenCard = lowCard
				if (!chosenCard) {
					// 
				}
			} else {
				AIDebugMode && console.log("decideAIplay: TEAMMATE IS NOT WINNING, LAY HIGH IF YOU CAN BEAT IT")
				// try to win
				let highCardValue = currentWinData.highScore
				let highCard
				for (const card of suitMap[ matchSuit ]) {
					if (card.value > highCardValue) {
						highCardValue = card.value
						highCard = card
					}
				}
				chosenCard = highCard
				// can't beat it, lay low offsuit
				if (!chosenCard) {
					AIDebugMode && console.log("decideAIplay: UNABLE TO BEAT IT, LAYING LOW")
					let lowCardValue = Infinity
					let lowCard
					for (const card of suitMap[ matchSuit ]) {
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
					for (const card of suitMap[ suit ]) {
						if (card.value < lowCardValue) {
							lowCardValue = card.value
							lowCard = card
						}
					}
				}
				chosenCard = lowCard
				// if you only have trump, lay lowest
				if (!chosenCard) {
					AIDebugMode && console.log("NO OFF SUIT, LAYING A LOW TRUMP")
					let lowTrumpValue = Infinity
					let lowTrumpCard
					for (const card of suitMap[ trump.code ]) {
						if (card.value < lowTrumpValue) {
							lowCardValue = card.value
							lowTrumpCard = card
						}
					}
					chosenCard = lowTrumpCard
				}
			} else {
				AIDebugMode && console.log("decideAIplay: TEAMMATE IS NOT WINNING, LAY LOWEST WINNING TRUMP IF YOU HAVE IT")
				if (suitMap.hasOwnProperty(trump.code) && suitMap[ trump.code ].length > 0) {
					AIDebugMode && console.log("HAS TRUMP")
					let lowTrumpValue = Infinity
					let lowTrumpCard = null
					for (const trumpCard of suitMap[ trump.code ]) {
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
					AIDebugMode && console.log("NO WINNING TRUMP, LAY LOW OFF SUIT TO PASS")
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
					AIDebugMode && console.log("NO CHOSEN CARD YET, CANT WIN, LAYING LOWEST TRUMP")
					let lowTrumpValue = Infinity
					let lowTrumpCard = null
					for (const card of suitMap[ trump.code ]) {
						if (card.value < lowTrumpValue) {
							lowTrumpValue = card.value
							lowTrumpCard = card
						}
					}
					chosenCard = lowTrumpCard
				}
			}
		}
	}
	if (!chosenCard) {
		AIDebugMode && console.error("AI ERROR - NO CHOSEN CARD for player: ", currentPlayer)
	}
	AIDebugMode && console.log(`------------------ DECIDE AI PLAY Chosen Card: ${ chosenCard.faceValue } of ${ chosenCard.suit.name } `)
	handlePlayerChoice(currentPlayer, chosenCard)
}