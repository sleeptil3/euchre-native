import { sleep, blankCard } from "./data";
import { minAloneScore, minCallScore, decidePace } from "../Data/data";

///////////////////
// AI LOGIC //
///////////////////

const scoreHand = (hand, trumpCode, leftSuitCode) => {
	// console.log("scoreHand fxn")
	// console.log("hand", hand, "trumpCode", trumpCode, "leftSuitCode", leftSuitCode)
	let score = 0;
	for (const card of hand) {
		score += getCardScore(card, trumpCode, leftSuitCode, null);
	}
	// console.log("scoreHand fxn result score:", score)
	return score;
};

const getCardScore = (card, trumpCode, leftSuitCode, matchSuit) => {
	// console.log("getCardScore fxn for card", card)
	// console.log("trumpCode", trumpCode, "leftSuitCode", leftSuitCode, "matchSuit", matchSuit)
	let score = card.value;
	if (card.suit.code === trumpCode) {
		// console.log("is trump")
		score += 10;
		if (card.faceValue === "J") {
			// console.log("is right")
			score += 30;
		}
	} else if (card.suit.code === leftSuitCode) {
		if (card.faceValue === "J") {
			// console.log("is left")
			score += 20
		}
	}
	// deduct points for non match suit so it can't win - this will also deduct from trump plays, however the effect is at worst 6 points which isn't enough to sway the +10, 20, or 30 effect of a trump card
	if (matchSuit !== null && card.suit.code !== matchSuit) {
		// If its not the Left or the Right
		if (!(card.suit.code === trumpCode || (card.suit.code === leftSuitCode && card.faceValue === "J"))) {
			// console.log("card is nil value being off suit")
			score = 0;
		}
	}
	// console.log("getCardScore result = ", score)
	return score;
};

const scoreHandByTrump = (currentPlayer, hand, matchStage, suitMap, trumpCode, upTrump, suits, dealer) => {
	const leftCode = suits[trumpCode].left.code;
	// console.log("scoreHandByTrump for player", currentPlayer)
	// console.log("key:")
	// console.log("currentPlayer, hand, matchStage, suitMap, trumpCode, upTrump, suits, dealer, trumpLeftCode")
	// console.log(currentPlayer, "\n", hand, "\n", matchStage, "\n", suitMap, "\n", trumpCode, "\n", upTrump, "\n", suits, "\n", dealer)
	if (trumpCode in suitMap) {
		let handScore = scoreHand(hand, trumpCode, leftCode);
		let enhancedScore = handScore;
		if (matchStage === "CALL" && currentPlayer !== dealer) {
			if (findIsTeammate(currentPlayer, dealer)) {
				enhancedScore += upTrump.value + 10;
				if (upTrump.faceValue === "J") enhancedScore += 30;
			} else {
				enhancedScore -= upTrump.value + 10;
				if (upTrump.faceValue === "J") enhancedScore -= 30;
			}
		} else if (matchStage === "PICK") {
			suitMap[trumpCode].forEach((card) => {
				enhancedScore += card.value + 2;
			});
			enhancedScore += 5 * suitMap[trumpCode].filter((card) => card.faceValue === "J").length;
		}
		// console.log("scoreHandByTrump result:", enhancedScore)
		return enhancedScore;
	} else {
		// console.log("scoreHandByTrump result 0 (no trump in hand)")
		return 0
	};
};

export const findIsTeammate = (player1, player2) => {
	return (player1 + 2) % 4 === player2;
};

export const groupBySuit = (cards, trump) => {
	// console.log("groupBySuit fxn")
	// console.log("cards", cards)
	// console.log("trump", trump)
	const suitMap = cards.reduce((acc, card) => {
		let key = card.suit.code;
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(card);
		return acc;
	}, {});
	if (trump.code !== undefined) {
		// If you have Trump suit in your hand
		if (suitMap.hasOwnProperty(trump.left.code)) {
			const left = suitMap[trump.left.code].find((card) => card.faceValue === "J");
			// If you have the LEFT bower, put it in the Trump suit group (sort happends in sortHand)
			if (left !== undefined) {
				// console.log("suitMap before shift for left bower", suitMap)
				const leftIdx = suitMap[trump.left.code].indexOf(left);
				suitMap[trump.left.code].splice(leftIdx, 1);
				if (suitMap.hasOwnProperty(trump.code)) suitMap[trump.code].push(left);
				else suitMap[trump.code] = [left];
			}
		}
	}
	// console.log("suitMap result", suitMap)
	return suitMap;
};

export const scoreTrick = (playedCards, trump, matchSuit, isTrickEnd) => {
	// console.log("scoreTrick fxn")
	// console.log("playedCards", playedCards)
	// console.log("trump", trump)
	// console.log("matchSuit", matchSuit)
	let highScore = -Infinity;
	let winner;
	const plays = [playedCards[0], playedCards[1], playedCards[2], playedCards[3]];
	plays.forEach((play, idx) => {
		if (play !== blankCard) {
			const cardScore = getCardScore(play, trump.code, trump.left.code, matchSuit);
			if (cardScore > highScore) {
				highScore = cardScore;
				winner = idx;
			}
		}
	});
	// console.log("scoreTrick result = ", { winner, highScore })
	return { winner, highScore };
};

export const decideTrump = (currentPlayer, hand, matchStage, upTrump, suits, dealer, pass, setGoAlone, upTrumpHistory) => {
	// console.log("decideTrump fxn for player", currentPlayer)
	// console.log("key: hand, matchStage, upTrump, suits, dealer, pass, setGoAlone, upTrumpHistory")
	// console.log(hand, "\n", matchStage, "\n", upTrump, "\n", suits, "\n", dealer, "\n", pass, "\n", setGoAlone, "\n", upTrumpHistory)
	switch (matchStage) {
		case "CALL": {
			const suitMap = groupBySuit(hand, suits[upTrump.suit.code]);
			const result = scoreHandByTrump(currentPlayer, hand, matchStage, suitMap, upTrump.suit.code, upTrump, suits, dealer);
			if (result >= minAloneScore) setGoAlone(currentPlayer);
			if (result > minCallScore) suits[upTrump.suit.code].select();
			else sleep(decidePace).then(() => pass());
			break;
		}
		// PICK OR STUCK
		default: {
			const suitMapH = groupBySuit(hand, suits.h);
			const suitMapD = groupBySuit(hand, suits.d);
			const suitMapC = groupBySuit(hand, suits.c);
			const suitMapS = groupBySuit(hand, suits.s);
			const suitScores = [
				[scoreHandByTrump(currentPlayer, hand, matchStage, suitMapH, "h", upTrump, suits, dealer), "h"],
				[scoreHandByTrump(currentPlayer, hand, matchStage, suitMapD, "d", upTrump, suits, dealer), "d"],
				[scoreHandByTrump(currentPlayer, hand, matchStage, suitMapC, "c", upTrump, suits, dealer), "c"],
				[scoreHandByTrump(currentPlayer, hand, matchStage, suitMapS, "s", upTrump, suits, dealer), "s"],
			];
			let highestScore = 0;
			let highSuitCode;
			for (const score of suitScores) {
				if (score[1] !== upTrumpHistory.code && score[0] > highestScore) {
					highestScore = score[0];
					highSuitCode = score[1];
				}
			}
			if (matchStage === "PICK") {
				if (highestScore >= minAloneScore) setGoAlone(currentPlayer);
				if (highestScore > minCallScore) suits[highSuitCode].select();
				else sleep(decidePace).then(() => pass());
			} else {
				if (highestScore >= minAloneScore) setGoAlone(currentPlayer);
				suits[highSuitCode].select();
			}
			break;
		}
	}
};

export const decideAIdiscard = (hand, trump) => {
	// console.log("decideAIdiscard fxn")
	// console.log("hand, trump", hand, trump)
	let chosenCard
	let lowestValue = Infinity
	hand.forEach(card => {
		const score = getCardScore(card, trump.code, trump.left.code, null)
		if (score < lowestValue) {
			lowestValue = score
			chosenCard = card
		}
	})
	// console.log("decideAIdiscard chosenCard result:", chosenCard)
	return chosenCard
}

export const decideAIplay = (currentPlayer, trump, matchSuit, hand, handlePlayerChoice, playedCards) => {
	// console.log("decideAIplay fxn for player", currentPlayer)
	// console.log("key: trump, matchSuit, hand, handlePlayerChoice, playedCards")
	// console.log(trump, "\n", matchSuit, "\n", hand, "\n", handlePlayerChoice, "\n", playedCards)
	const suitMap = groupBySuit(hand, trump);
	let chosenCard = null;
	// if you are first player of match
	if (!matchSuit) {
		let highOffSuitValue = 0;
		let highOffSuitCard;
		for (const suitCode in suitMap) {
			if (suitCode === trump.code) continue;
			for (const card of suitMap[suitCode]) {
				if (card.value > highOffSuitValue) {
					highOffSuitValue = card.value;
					highOffSuitCard = card;
				}
			}
		}
		// if sufficient high offsuit card, set chosenCard
		if (highOffSuitValue > 4) {
			chosenCard = highOffSuitCard;
		}
		// if no sufficient high offsuit card and you have trump
		if (!chosenCard && suitMap.hasOwnProperty(trump.code) && suitMap[trump.code].length > 0) {
			// if you have trump and its the right (J), bring out the dead
			const rightTrump = suitMap[trump.code].find((card) => card.faceValue === "J" && card.suit.code === trump.code);
			chosenCard = rightTrump !== undefined ? rightTrump : null;
		}
		// You don't have the right
		if (!chosenCard) {
			chosenCard = highOffSuitCard;
		}
		//  There was no high off card
		if (!chosenCard) {
			let highTrumpValue = 0;
			let highTrumpCard;
			for (const card of suitMap[trump.code]) {
				if (card.value > highTrumpValue) {
					highTrumpValue = card.value;
					highTrumpCard = card;
				}
			}
			chosenCard = highTrumpCard;
		}
	} else {
		// not the first player, so play to matchSuit or Trump
		const currentWinData = scoreTrick(playedCards, trump, matchSuit);
		if (suitMap.hasOwnProperty(matchSuit) && suitMap[matchSuit].length > 0) {
			if (findIsTeammate(currentWinData.winner, currentPlayer)) {
				// lay something low
				let lowCardValue = Infinity;
				let lowCard;
				for (const card of suitMap[matchSuit]) {
					if (card.value < lowCardValue) {
						lowCardValue = card.value;
						lowCard = card;
					}
				}
				chosenCard = lowCard;
			} else {
				// try to win
				let highCardValue = currentWinData.highScore;
				let highCard;
				for (const card of suitMap[matchSuit]) {
					if (card.value > highCardValue) {
						highCardValue = card.value;
						highCard = card;
					}
				}
				chosenCard = highCard;
				// can't beat it, lay low offsuit
				if (!chosenCard) {
					let lowCardValue = Infinity;
					let lowCard;
					for (const card of suitMap[matchSuit]) {
						if (card.value < lowCardValue) {
							lowCardValue = card.value;
							lowCard = card;
						}
					}
					chosenCard = lowCard;
				}
			}
		} else {
			if (findIsTeammate(currentWinData.winner, currentPlayer)) {
				// if you have off trump, lay lowest
				let lowCardValue = Infinity;
				let lowCard;
				for (const suit in suitMap) {
					if (suit === trump.code) continue;
					for (const card of suitMap[suit]) {
						if (card.value < lowCardValue) {
							lowCardValue = card.value;
							lowCard = card;
						}
					}
				}
				chosenCard = lowCard;
				// if you only have trump, lay lowest
				if (!chosenCard) {
					let lowTrumpValue = Infinity;
					let lowTrumpCard;
					for (const card of suitMap[trump.code]) {
						if (card.value < lowTrumpValue) {
							lowCardValue = card.value;
							lowTrumpCard = card;
						}
					}
					chosenCard = lowTrumpCard;
				}
			} else {
				if (suitMap.hasOwnProperty(trump.code) && suitMap[trump.code].length > 0) {
					let lowTrumpValue = Infinity;
					let lowTrumpCard = null;
					for (const trumpCard of suitMap[trump.code]) {
						const scoredTrump = getCardScore(trumpCard, trump.code, trump.left.code, matchSuit);
						if (scoredTrump > currentWinData.highScore) {
							if (scoredTrump < lowTrumpValue) {
								lowTrumpValue = scoredTrump;
								lowTrumpCard = trumpCard;
							}
						}
					}
					chosenCard = lowTrumpCard;
				}
				// didn't have any winning trump
				if (!chosenCard) {
					let lowestOffSuitValue = Infinity;
					let lowestOffSuitCard;
					for (const card of hand) {
						if (card.suit.code === trump.code) continue;
						if (card.value < lowestOffSuitValue) {
							lowestOffSuitValue = card.value;
							lowestOffSuitCard = card;
						}
					}
					chosenCard = lowestOffSuitCard;
				}
				if (!chosenCard) {
					let lowTrumpValue = Infinity;
					let lowTrumpCard = null;
					for (const card of suitMap[trump.code]) {
						if (card.value < lowTrumpValue) {
							lowTrumpValue = card.value;
							lowTrumpCard = card;
						}
					}
					chosenCard = lowTrumpCard;
				}
			}
		}
	}
	if (!chosenCard) console.error("AI ERROR - NO CHOSEN CARD for player: ", currentPlayer);
	// console.log("decideAIplay result player", currentPlayer, "chose:", chosenCard)
	handlePlayerChoice(currentPlayer, chosenCard);
};
