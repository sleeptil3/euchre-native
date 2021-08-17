import React, { useState, useEffect, createContext } from "react";
import { sleep, hearts, diamonds, spades, clubs, blankCard, Deck } from './Deck/deck'
import {
	decideTrump,
	decideAIplay,
	findIsTeammate,
	groupBySuit,
	getPlayerHand,
	scoreTrick,
} from "./Data/AI";

export const DataContext = createContext();

export default function GameContext({ children }) {
	////////////////
	// GAME STATE //
	////////////////

	// Normal Pace
	const decidePace = 1000;

	// Debug Pace
	// const decidePace = 100

	// Card State
	const [pile, setPile] = useState([])
	const [playerHand, setPlayerHand] = useState([]);
	const [teammateHand, setTeammateHand] = useState([]);
	const [opponentHand1, setOpponentHand1] = useState([]);
	const [opponentHand2, setOpponentHand2] = useState([]);
	const [playedCards, setPlayedCards] = useState({
		0: blankCard,
		1: blankCard,
		2: blankCard,
		3: blankCard,
	});
	const nonPlayerHands = [opponentHand1, teammateHand, opponentHand2];

	// Game State
	const [dealer, setDealer] = useState(0); // 0, 1, 2, 3
	const [currentPlayer, setCurrentPlayer] = useState(dealer + 1); // 0, 1, 2, 3, 4 (result)
	const [turnCount, setTurnCount] = useState(-1);
	const [yourSeat, setYourSeat] = useState(0);
	const [upTrump, setUpTrump] = useState({});

	// Match State
	const [trump, setTrump] = useState({}); // {suit, left}
	const [callingPlayer, setCallingPlayer] = useState(null);
	const [teamScore, setTeamScore] = useState(0);
	const [opponentScore, setOpponentScore] = useState(0);
	const [matchStage, setMatchStage] = useState("PREGAME"); // NEWGAME, NEWMATCH, DEAL, CALL, PICK, PLAY
	const [showPrompt, setShowPrompt] = useState(false);
	const [promptText, setPromptText] = useState({
		title: "",
		question: "",
		choices: [],
	});
	const [currentPrompt, setCurrentPrompt] = useState(0);
	const [matchTricks, setMatchTricks] = useState({
		callingTeam: 0,
		opposingTeam: 0,
	});
	const [currentMatchScore, setCurrentTrickScore] = useState({});
	const [matchSuit, setMatchSuit] = useState(null);
	const [goAlone, setGoAlone] = useState(null);

	// UI State
	const [trumpCardOpacity, setTrumpCardOpacity] = useState("opacity-0");
	const [trumpCardPosition, setTrumpCardPosition] = useState("translate-y-0 -translate-y-0 translate-x-0 -translate-x-0");
	const [trumpStackOpacity, setTrumpStackOpacity] = useState("opacity-0");
	const suits = {
		"h": { ...hearts, left: { ...diamonds }, select() { handleCallUp(suits.h) }, },
		"d": { ...diamonds, left: { ...hearts }, select() { handleCallUp(suits.d) }, },
		"s": { ...spades, left: { ...clubs }, select() { handleCallUp(suits.s) }, },
		"c": { ...clubs, left: { ...spades }, select() { handleCallUp(suits.c) }, },
	}

	////////////////
	// PROMPT MAP //
	////////////////

	const prompts = {
		trump1Round: {
			title: "Trump Selection",
			question: `${currentPlayer % 2 === 0
				? "Your Teammate is making their decision"
				: `Player ${currentPlayer} is making their decision`}`,
			choices: [],
		},
		trump1Turn: {
			title: "Trump Selection",
			question: "What would you like to do?",
			choices: [
				{
					text: "Order It Up",
					action: () => suits[upTrump.suit.code].select(),
				},
				{ text: "Go Alone", action: () => handleGoAlone(upTrump.suit.code) },
				{ text: "Pass", action: () => pass() },
			],
		},
		trump2Round: {
			title: "Trump Selection",
			question: `It's ${currentPlayer === 2 ? "your teammate's" : "the other team's"
				} turn`,
			choices: [],
		},
		trump2Turn: {
			title: "Trump Selection",
			question: "Want to call Trump or pass?",
			choices: [
				{ text: suits.d.name, action: suits.d.select },
				{ text: suits.h.name, action: suits.h.select },
				{ text: suits.c.name, action: suits.c.select },
				{ text: suits.s.name, action: suits.s.select },
				{
					text: "Go Alone",
					action: () => setPromptText(prompts.trump2TurnAlone),
				},
				{ text: "Pass", action: () => pass() },
			],
		},
		trump2TurnAlone: {
			title: "Feeling lucky, huh?",
			question: "Which suit?",
			choices: [
				{ text: suits.d.name, action: () => handleGoAlone(suits.d.code) },
				{ text: suits.h.name, action: () => handleGoAlone(suits.h.code) },
				{ text: suits.c.name, action: () => handleGoAlone(suits.c.code) },
				{ text: suits.s.name, action: () => handleGoAlone(suits.s.code) },
				{
					text: "Cancel",
					action: () =>
						matchStage === "STUCK"
							? setPromptText(prompts.trump2Stuck)
							: setPromptText(prompts.trump2Turn),
				},
			],
		},
		trump2Stuck: {
			title: "Stuck to Dealer",
			question: "You must select Trump:",
			choices: [
				{ text: suits.d.name, action: suits.d.select },
				{ text: suits.h.name, action: suits.h.select },
				{ text: suits.c.name, action: suits.c.select },
				{ text: suits.s.name, action: suits.s.select },
				{
					text: "Go Alone",
					action: () => setPromptText(prompts.trump2TurnAlone),
				},
				{ text: "Pass", action: () => pass() },
			],
		},
		trump2StuckOther: {
			title: "Stuck to Dealer",
			question: "...the dealer is making their decision...",
			choices: [],
		},
		ready: {
			title: `Ready to Play`,
			question: `${callingPlayer % 2 === 0
				? `Your team called ${trump.name}`
				: `The other team called ${trump.name}`
				}.`,
			choices: [{ text: "Begin Match", action: () => startMatch() }],
		},
		readyAlone: {
			title: `Ready to Play`,
			question: `${goAlone === yourSeat
				? "You decided to Go Alone. Good luck!"
				: (goAlone + 2) % 4 === goAlone
					? "Your teammate decided to go alone. Sit back and relax!"
					: `Player ${goAlone} on the other team is going alone. Good luck!`
				}`,
			choices: [{ text: "Begin Match", action: () => startMatch() }],
		},
		discard: {
			title: `${callingPlayer % 2 === 0 ? "Your Team Called Trump" : "The Other Team Called Trump"
				}`,
			question: `Choose a card to discard`,
			choices: [],
		},
		yourTurn: {
			title: "It's your turn",
			question: `Choose a card to play`,
			choices: [],
		},
		othersTurn: {
			title: `${currentPlayer % 2 === 0
				? "It's your teammate's turn"
				: `It's Player ${currentPlayer}'s turn`
				}`,
			question: "Please wait...",
			choices: [],
		},
		trickResultWin: {
			title: "Trick Results",
			question: "Your Team Won The Trick",
			choices: [{ text: "Continue", action: () => handleTrickEnd() }],
		},
		trickResultLose: {
			title: "Trick Results",
			question: "The Other Team Won The Trick",
			choices: [{ text: "Continue", action: () => handleTrickEnd() }],
		},
		matchResult: {
			title: "Match Complete",
			question: `The Game Continues...`,
			choices: [{ text: "Next Round", action: () => handleMatchEnd() }],
		},
	};

	///////////////////////
	// General Functions //
	///////////////////////

	const getDeck = () => {
		const newDeck = new Deck()
		newDeck.generateDeck()
		newDeck.shuffleDeck()
		setPlayerHand(sortHand([...newDeck.deck.slice(0, 5)]));
		setTeammateHand([...newDeck.deck.slice(5, 10)]);
		setOpponentHand1([...newDeck.deck.slice(10, 15)]);
		setOpponentHand2([...newDeck.deck.slice(15, 20)]);
		setUpTrump(newDeck.deck[20]);
		if (matchStage !== "PREGAME") {
			setMatchStage("CALL");
			setCurrentPlayer((dealer + 1) % 4);
			setTurnCount(0);
		} else setTurnCount(-1);
	};

	const pass = () => {
		setCurrentPlayer((currentPlayer + 1) % 4);
		setTurnCount(turnCount + 1);
	};

	const handleGoAlone = (trumpSuitCode) => {
		setGoAlone(currentPlayer);
		suits[trumpSuitCode].select();
	};

	const startMatch = () => {
		// "Begin Match" user prompt action
		setMatchStage("PLAY");
		setCurrentPlayer((dealer + 1) % 4);
		setTurnCount(0);
	};

	const sortHand = (hand) => {
		const suitMap = groupBySuit(hand);
		let sortedHand = [];
		for (const suitCode in suitMap) {
			suitMap[suitCode].sort((a, b) => a.value - b.value);
			suitMap[suitCode].forEach((card) => sortedHand.push(card));
		}
		return sortedHand;
	};

	const handleCallUp = (trump) => {
		setTrump(trump);
		setCallingPlayer(currentPlayer);
		if (matchStage === "CALL") {
			// handle the Trump Card Position/Opacity effects
			dealer === yourSeat && setTrumpCardPosition("translate-y-20"); // user
			dealer === 1 && setTrumpCardPosition("-translate-x-20"); // opp1
			dealer === 2 && setTrumpCardPosition("-translate-y-20"); // teammate
			dealer === 3 && setTrumpCardPosition("translate-x-20"); // opp2
			sleep(750).then(() => setTrumpCardOpacity("opacity-0"));

			// add the card to the dealer's hand
			sleep(decidePace).then(() => {
				switch (dealer) {
					case 0: {
						setPlayerHand([...playerHand, upTrump]);
						break;
					}
					case 1: {
						setOpponentHand1([...opponentHand1, upTrump]);
						break;
					}
					case 2: {
						setTeammateHand([...teammateHand, upTrump]);
						break;
					}
					case 3: {
						setOpponentHand2([...opponentHand2, upTrump]);
						break;
					}
				}
				setMatchStage("DISCARD");
				setCurrentPlayer(dealer);
				setTurnCount(-10);
			});
		} else if (matchStage === "PICK" || matchStage === "STUCK") {
			setMatchStage("READY");
			setCurrentPlayer((dealer + 1) % 4);
			setTurnCount(-10);
		}
	};

	const handlePlayerChoice = (player, card) => {
		// console.log("handlePlayerChoice", player, card);
		if (!matchSuit) {
			if (trump.left.code === card.suit.code && card.faceValue === "J")
				setMatchSuit(trump.code);
			else setMatchSuit(card.suit.code);
		}
		setPlayedCards({ ...playedCards, [player]: card });
		setCurrentPlayer((currentPlayer + 1) % 4);
		handleDiscard(player, card);
	};

	const handleDiscard = (player, card) => {
		// console.log("------------------HANDLE DISCARD FUNCTION", player, card);
		const hand = getPlayerHand(player, playerHand, nonPlayerHands);
		switch (player) {
			case 0: {
				hand.splice(hand.indexOf(card), 1);
				setPlayerHand(sortHand([...hand]));
				break;
			}
			case 1: {
				hand.splice(hand.indexOf(card), 1);
				setOpponentHand1([...hand]);
				break;
			}
			case 2: {
				hand.splice(hand.indexOf(card), 1);
				setTeammateHand([...hand]);
				break;
			}
			case 3: {
				hand.splice(hand.indexOf(card), 1);
				setOpponentHand2([...hand]);
				break;
			}
		}
		if (matchStage === "PLAY") {
			setCurrentPlayer((currentPlayer + 1) % 4);
			setTurnCount(turnCount + 1);
		} else {
			setMatchStage("READY");
			setTurnCount(turnCount - 1);
		}
		function swap(arr, idx1, idx2) {
			[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
		}
	};

	const handleTrickEnd = () => {
		setPlayedCards({
			0: blankCard,
			1: blankCard,
			2: blankCard,
			3: blankCard,
		});
		setMatchSuit(null);
		setMatchStage("RESULT");
		setTurnCount(-10);
	};

	const scoreMatch = () => {
		let tempTeamScore = teamScore;
		let tempOpposingScore = opponentScore;
		if (matchTricks.callingTeam > matchTricks.opposingTeam) {
			// Calling Team won the match
			if (matchTricks.callingTeam >= 3) {
				if (matchTricks.callingTeam === 5) {
					const scoreCalc = goAlone !== null ? 4 : 2;
					if (callingPlayer === yourSeat || findIsTeammate(callingPlayer, yourSeat)) {
						tempTeamScore += scoreCalc;
						setTeamScore(tempTeamScore);
					} else {
						tempOpposingScore += scoreCalc;
						setOpponentScore(tempOpposingScore);
					}
				} else {
					if (callingPlayer === yourSeat || findIsTeammate(callingPlayer, yourSeat)) {
						tempTeamScore++;
						setTeamScore(tempTeamScore);
					} else {
						tempOpposingScore++;
						setOpponentScore(tempOpposingScore);
					}
				}
			}
		} else {
			// Calling Team was Euchred
			if (callingPlayer === yourSeat || findIsTeammate(callingPlayer, yourSeat))
				setOpponentScore(opponentScore + 2);
			else setTeamScore(teamScore + 2);
		}
		if (tempTeamScore >= 10 || tempOpposingScore >= 10) {
			setMatchStage("GAMEOVER");
			setTurnCount(100);
		} else {
			setPromptText(prompts.matchResult);
		}
	};

	const handleMatchEnd = () => {
		setDealer((dealer + 1) % 4);
		setUpTrump({});
		setTrump({});
		setGoAlone(null);
		setMatchTricks({
			callingTeam: 0,
			opposingTeam: 0,
		});
		setCallingPlayer(null);
		setMatchStage("CALL");
		setTurnCount(0);
	};

	////////////////
	// useEffects //
	////////////////

	// Game Setup
	useEffect(() => {
		// console.log("New Deal: Getting Deck and setting up hands");
		getDeck();
	}, [dealer]);

	// Game Logic
	useEffect(() => {
		switch (matchStage) {
			case "PREGAME": {
				// console.log("------------------ PREGAME Stage");
				break;
			}
			case "NEWGAME": {
				// console.log("------------------ NEWGAME Stage");
				// console.log("%cPlayer Hand", "color: green", playerHand);
				// console.log("%cNon-Player Hands", "color: green", nonPlayerHands);
				if (upTrump.faceValue === undefined)
					sleep(500).then(() => setTurnCount(turnCount - 1));
				else {
					setMatchStage("CALL");
					setTurnCount(0);
				}
				break;
			}
			case "NEWMATCH": {
				// console.log("------------------ NEWMATCH Stage");
				// console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, upTrump);
				// console.log("%cPlayer Hand", "color: green", playerHand);
				// console.log("%cNon-Player Hands", "color: green", nonPlayerHands);
				break;
			}
			case "CALL": {
				// console.log("------------------ Call Stage");
				// console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, upTrump);

				turnCount === 0 && setCurrentPlayer((dealer + 1) % 4);
				if (upTrump.faceValue === undefined) {
					sleep(750).then(() => setTurnCount(turnCount - 1));
				} else {
					trumpStackOpacity === "opacity-0" &&
						sleep(750).then(() => setTrumpStackOpacity("opacity-100"));
					trumpCardOpacity === "opacity-0" &&
						sleep(1250).then(() => setTrumpCardOpacity("opacity-100"));
					if (turnCount >= 0) {
						if (turnCount > 3) {
							setMatchStage("PICK");
							setCurrentPlayer((dealer + 1) % 4);
							setTurnCount(0);
							break;
						} else {
							if (currentPlayer === yourSeat) {
								setPromptText(prompts.trump1Turn); // OPTION TO CALL IT UP
							} else {
								setPromptText(prompts.trump1Round); // AWAITING TURN TO CALL IT UP
								sleep(decidePace).then(() =>
									decideTrump(
										currentPlayer,
										nonPlayerHands[currentPlayer - 1],
										matchStage,
										upTrump,
										suits,
										dealer,
										pass,
										setGoAlone
									)
								);
							}
						}
					} else {
						setTurnCount(0);
					}
				}
				break;
			}
			case "PICK": {
				// console.log("------------------ Pick Stage");
				// console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, upTrump);
				trumpCardOpacity === "opacity-100" && setTrumpCardOpacity("opacity-0");
				if (turnCount > 2) {
					setMatchStage("STUCK");
					setCurrentPlayer(dealer);
					setTurnCount(-1);
				} else {
					if (currentPlayer === yourSeat) {
						setPromptText(prompts.trump2Turn); // AWAITING TURN TO DECLARE IT
					} else {
						setPromptText(prompts.trump2Round); // OPTION TO DECLARE IT
						sleep(decidePace).then(() =>
							decideTrump(
								currentPlayer,
								nonPlayerHands[currentPlayer - 1],
								matchStage,
								upTrump,
								suits,
								dealer,
								pass,
								setGoAlone
							)
						);
					}
				}
				break;
			}
			case "STUCK": {
				// console.log("------------------ STUCK Stage");
				// console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, upTrump);
				if (dealer === yourSeat) {
					setPromptText(prompts.trump2Stuck); // STUCK TO DEALER YOU
				} else {
					setPromptText(prompts.trump2StuckOther); // STUCK TO DEALER OTHER PLAYER
					sleep(decidePace).then(() =>
						decideTrump(
							currentPlayer,
							nonPlayerHands[dealer - 1],
							matchStage,
							upTrump,
							suits,
							dealer,
							pass,
							setGoAlone
						)
					);
				}
				break;
			}
			case "READY": {
				// console.log("------------------ READY Stage");
				setTrumpStackOpacity("opacity-0");
				setTrumpCardPosition("translate-y-0 -translate-y-0 translate-x-0 -translate-x-0");
				!goAlone ? setPromptText(prompts.ready) : setPromptText(prompts.goAlone);
				break;
			}
			case "DISCARD": {
				// console.log("------------------ DISCARD Stage");
				// console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, upTrump);
				if (yourSeat === dealer) setPromptText(prompts.discard);
				else handleDiscard(dealer, upTrump);
				break;
			}
			case "PLAY": {
				// MATCH PLAY
				// console.log("------------------ Play Stage");
				if (goAlone !== null && currentPlayer === (goAlone + 2) % 4) {
					setCurrentPlayer((currentPlayer + 1) % 4);
					setTurnCount(turnCount + 1);
					break;
				}
				if (turnCount < 4) {
					if (currentPlayer === yourSeat) {
						setPromptText(prompts.yourTurn);
					} else {
						setPromptText(prompts.othersTurn);
						decideAIplay(
							currentPlayer,
							trump,
							matchSuit,
							playerHand,
							nonPlayerHands,
							handlePlayerChoice,
							playedCards
						);
					}
				} else {
					const trickScoreData = scoreTrick(playedCards, trump);
					setCurrentTrickScore(trickScoreData);
					if (
						trickScoreData.winner === callingPlayer ||
						findIsTeammate(trickScoreData.winner, callingPlayer)
					) {
						setMatchTricks({
							...matchTricks,
							callingTeam: ++matchTricks.callingTeam,
						});
					} else {
						setMatchTricks({
							...matchTricks,
							opposingTeam: ++matchTricks.opposingTeam,
						});
					}
					if (
						trickScoreData.winner === yourSeat ||
						findIsTeammate(trickScoreData.winner, yourSeat)
					) {
						setPromptText(prompts.trickResultWin);
					} else {
						setPromptText(prompts.trickResultLose);
					}
				}
				break;
			}
			case "RESULT": {
				// END OF TRICK OR END OF MATCH
				// console.log("------------------ RESULT Stage");
				if (teamScore >= 10 || opponentScore >= 10) {
					setMatchStage("GAMEOVER");
					setTurnCount(100);
					break;
				}
				if (matchTricks.opposingTeam + matchTricks.callingTeam === 5) {
					// console.log("------------------ RESULT Stage: 5 tricks done - scorematch");
					scoreMatch();
				} else {
					setCurrentPlayer(currentMatchScore.winner);
					setMatchStage("PLAY");
					setTurnCount(0);
				}
				break;
			}
			case "GAMEOVER": {
				// WIN CONDITION MET
				// console.log("------------------ GAMEOVER Stage");
				// Setup a reset for another game
				break;
			}
			default:
			// console.log("------------------ Default Stage");
		}
	}, [turnCount]);



	return (
		<DataContext.Provider
			value={{
				goAlone,
				trumpStackOpacity,
				setTrumpStackOpacity,
				matchTricks,
				playedCards,
				setPlayedCards,
				handlePlayerChoice,
				handleDiscard,
				trumpCardPosition,
				setTrumpCardPosition,
				trumpCardOpacity,
				setTrumpCardOpacity,
				pass,
				yourSeat,
				turnCount,
				setTurnCount,
				callingPlayer,
				setCallingPlayer,
				upTrump,
				suits,
				opponentScore,
				setOpponentScore,
				currentPrompt,
				setCurrentPrompt,
				promptText,
				setPromptText,
				showPrompt,
				setShowPrompt,
				playerHand,
				setPlayerHand,
				teammateHand,
				setTeammateHand,
				opponentHand1,
				setOpponentHand1,
				opponentHand2,
				setOpponentHand2,
				trump,
				setTrump,
				teamScore,
				setTeamScore,
				matchStage,
				setMatchStage,
				dealer,
				setDealer,
				currentPlayer,
				setCurrentPlayer,
				pile,
				setPile
			}}
		>
			{children}
		</DataContext.Provider>
	)
}

