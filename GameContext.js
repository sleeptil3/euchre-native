import React, { useState, useEffect, createContext } from "react"
import { hearts, diamonds, spades, clubs, Deck } from './Deck/deck'
import { sleep, blankCard } from "./Data/data"
import {
	decideTrump,
	decideAIplay,
	findIsTeammate,
	groupBySuit,
	getPlayerHand,
	scoreTrick,
} from "./Data/AI"

export const DataContext = createContext()

export default function GameContext({ children }) {
	////////////////
	// GAME STATE //
	////////////////

	// Normal Mode Settings
	const decidePace = 1000
	const debug = false

	// Debug Mode Settings
	// const debug = true
	// const decidePace = 100

	// Card State
	const [playerHand, setPlayerHand] = useState([])
	const [teammateHand, setTeammateHand] = useState([])
	const [opponentHand1, setOpponentHand1] = useState([])
	const [opponentHand2, setOpponentHand2] = useState([])
	const [playedCards, setPlayedCards] = useState({
		0: blankCard,
		1: blankCard,
		2: blankCard,
		3: blankCard,
	})
	const nonPlayerHands = [opponentHand1, teammateHand, opponentHand2]

	// Game State
	const [uuid, setUuid] = useState(0)
	const [dealer, setDealer] = useState(0) // 0, 1, 2, 3
	const [currentPlayer, setCurrentPlayer] = useState(dealer + 1) // 0, 1, 2, 3, 4 (result)
	const [turnCount, setTurnCount] = useState(-1)
	const [yourSeat, setYourSeat] = useState(0)
	const [upTrump, setUpTrump] = useState({})

	// Modal State
	const [showPromptModal, setShowPromptModal] = useState(false)
	const [showStartModal, setShowStartModal] = useState(false)

	// Match State
	const [trump, setTrump] = useState({}) // {suit, left}
	const [callingPlayer, setCallingPlayer] = useState(null)
	const [teamScore, setTeamScore] = useState(0)
	const [opponentScore, setOpponentScore] = useState(0)
	const [matchStage, setMatchStage] = useState("PREGAME") // NEWGAME, NEWMATCH, DEAL, CALL, PICK, PLAY
	const [promptText, setPromptText] = useState({
		text: "",
		subtitle: "",
		body: "",
		choices: [],
	})
	const [currentPrompt, setCurrentPrompt] = useState(0)
	const [matchTricks, setMatchTricks] = useState({
		callingTeam: 0,
		opposingTeam: 0,
	})
	const [currentMatchScore, setCurrentTrickScore] = useState({})
	const [matchSuit, setMatchSuit] = useState(null)
	const [goAlone, setGoAlone] = useState(null)

	// UI State
	const [showTrumpCard, setShowTrumpCard] = useState(false)
	const [trumpCardPosition, setTrumpCardPosition] = useState("translate-y-0 -translate-y-0 translate-x-0 -translate-x-0")
	const [showTrumpStack, setShowTrumpStack] = useState(false)
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
			subtitle: `${currentPlayer % 2 === 0
				? "Your Teammate is deciding"
				: `Player ${currentPlayer} is deciding`}`,
			body: "Please wait",
			choices: [],
		},
		trump1Turn: {
			title: "Trump Selection",
			subtitle: "Order it up or pass?",
			body: "Press and hold to go alone",
			choices: [
				{
					text: "u",
					shortAction: () => suits[upTrump.suit.code].select(),
					longAction: () => handleGoAlone(upTrump.suit.code),
					altText: "Tap to order up trump or press and hold to go alone"
				},
				{
					text: "p",
					shortAction: () => pass(),
					longAction: null,
					altText: "Pass on calling it up"
				},
			],
		},
		trump2Round: {
			title: "Trump Selection",
			subtitle: `${currentPlayer % 2 === 0
				? "Your Teammate is deciding"
				: `Player ${currentPlayer} is deciding`}`,
			body: "Please wait",
			choices: [],
		},
		trump2Turn: {
			title: "Trump Selection",
			subtitle: "Call Trump or pass?",
			body: "Press and hold to go alone",
			choices: [
				{
					text: "s",
					shortAction: suits.s.select,
					longAction: () => handleGoAlone("s"),
					altText: "Tap to select spades or press and hold to go alone"
				},
				{
					text: "d",
					shortAction: suits.d.select,
					longAction: () => handleGoAlone("d"),
					altText: "Tap to select diamonds or press and hold to go alone"
				},
				{
					text: "c",
					shortAction: suits.c.select,
					longAction: () => handleGoAlone("c"),
					altText: "Tap to select clubs or press and hold to go alone"
				},
				{
					text: "h",
					shortAction: suits.h.select,
					longAction: () => handleGoAlone("h"),
					altText: "Tap to select hearts or press and hold to go alone"
				},
				{
					text: "p",
					shortAction: () => pass(),
					longAction: null,
					altText: "Pass your turn"
				},
			],
		},
		trump2Stuck: {
			title: "Stuck to Dealer",
			subtitle: "You must select Trump",
			body: "Press and hold to go alone",
			choices: [
				{
					text: "s",
					shortAction: suits.s.select,
					longAction: () => handleGoAlone("s"),
					altText: "Tap to select spades or press and hold to go alone"
				},
				{
					text: "d",
					shortAction: suits.d.select,
					longAction: () => handleGoAlone("d"),
					altText: "Tap to select diamonds or press and hold to go alone"
				},
				{
					text: "c",
					shortAction: suits.c.select,
					longAction: () => handleGoAlone("c"),
					altText: "Tap to select clubs or press and hold to go alone"
				},
				{
					text: "h",
					shortAction: suits.h.select,
					longAction: () => handleGoAlone("h"),
					altText: "Tap to select hearts or press and hold to go alone"
				}
			]
		},
		trump2StuckOther: {
			title: "Stuck to Dealer",
			subtitle: "The dealer is deciding",
			body: "Please wait",
			choices: [],
		},
		ready: {
			title: `${trump.name} is Trump`,
			subtitle: `${callingPlayer % 2 === 0
				? `Your team called it`
				: `The other team called it`}`,
			body: "Good luck",
			choices: [
				{
					text: "ok",
					shortAction: () => startMatch(),
					longAction: null,
					altText: "Begin match"
				}
			],
		},
		readyAlone: {
			title: `${trump.name} is Trump`,
			subtitle: `${goAlone === yourSeat
				? "You are going alone"
				: (goAlone + 2) % 4 === goAlone
					? "Your teammate is going alone"
					: `Player ${goAlone} is going alone`
				}`,
			body: "Good luck",
			choices: [
				{
					text: "ok",
					shortAction: () => startMatch(),
					longAction: null,
					altText: "Begin match"
				}
			],
		},
		discard: {
			title: "Discard",
			subtitle: `${callingPlayer % 2 === 0 ? "Your Team Called Trump" : "The Other Team Called Trump"
				}`,
			body: "Tap OK then select a card to discard",
			choices: [
				{
					text: "ok",
					shortAction: null,
					longAction: null,
					altText: "Press okay then discard"
				}
			],
		},
		yourTurn: {
			title: "Your Turn",
			subtitle: "Choose a card",
			body: `The trick suit is ${matchSuit ? suits[matchSuit].name : ""}`,
			choices: [
				{
					text: "ok",
					shortAction: null,
					longAction: null,
					altText: "Press okay then play a card"
				}
			],
		},
		othersTurn: {
			title: "Please Wait",
			subtitle: `${currentPlayer % 2 === 0
				? "It's your teammate's turn"
				: `It's Player ${currentPlayer}'s turn`}`,
			body: "They are deciding",
			choices: [],
		},
		trickResultWin: {
			title: "Trick Results",
			subtitle: "You Won",
			body: "Great job!",
			choices: [
				{
					text: "ok",
					shortAction: () => handleTrickEnd(),
					longAction: null,
					altText: "Tap to continue"
				}
			],
		},
		trickResultLose: {
			title: "Trick Results",
			subtitle: "You Lost",
			body: "Get them next time!",
			choices: [
				{
					text: "ok",
					shortAction: () => handleTrickEnd(),
					longAction: null,
					altText: "Tap to continue"
				}
			],
		},
		matchResult: {
			title: "Match Complete",
			subtitle: `The Game Continues...`,
			body: "The first team to 10 wins",
			choices: [
				{
					text: "ok",
					shortAction: () => handleTrickEnd(),
					longAction: null,
					altText: "Tap to continue"
				}
			],
		},
	}

	///////////////////////
	// General Functions //
	///////////////////////

	const getDeck = () => {
		const newDeck = new Deck()
		newDeck.generateDeck()
		newDeck.shuffleDeck()
		setPlayerHand(sortHand([...newDeck.deck.slice(0, 5)]))
		setTeammateHand([...newDeck.deck.slice(5, 10)])
		setOpponentHand1([...newDeck.deck.slice(10, 15)])
		setOpponentHand2([...newDeck.deck.slice(15, 20)])
		setUpTrump(newDeck.deck[20])
		if (matchStage !== "PREGAME") {
			setMatchStage("CALL")
			setCurrentPlayer((dealer + 1) % 4)
			setTurnCount(0)
		} else setTurnCount(-1)
	}

	const pass = () => {
		setCurrentPlayer((currentPlayer + 1) % 4)
		setTurnCount(turnCount + 1)
	}

	const handleGoAlone = (trumpSuitCode) => {
		setGoAlone(currentPlayer)
		suits[trumpSuitCode].select()
	}

	const startMatch = () => {
		// "Begin Match" user prompt action
		setMatchStage("PLAY")
		setCurrentPlayer((dealer + 1) % 4)
		setTurnCount(0)
	}

	const sortHand = (hand) => {
		const suitMap = groupBySuit(hand)
		let sortedHand = []
		for (const suitCode in suitMap) {
			suitMap[suitCode].sort((a, b) => a.value - b.value)
			suitMap[suitCode].forEach((card) => sortedHand.push(card))
		}
		return sortedHand
	}

	const handleCallUp = (trump) => {
		console.log("calllupppp")
		setTrump(trump)
		setCallingPlayer(currentPlayer)
		if (matchStage === "CALL") {
			// handle the Trump Card Position/Opacity effects
			setShowTrumpCard(false)

			// add the card to the dealer's hand
			sleep(decidePace).then(() => {
				switch (dealer) {
					case 0: {
						setPlayerHand([...playerHand, upTrump])
						break
					}
					case 1: {
						setOpponentHand1([...opponentHand1, upTrump])
						break
					}
					case 2: {
						setTeammateHand([...teammateHand, upTrump])
						break
					}
					case 3: {
						setOpponentHand2([...opponentHand2, upTrump])
						break
					}
				}
				setMatchStage("DISCARD")
				setCurrentPlayer(dealer)
				setTurnCount(-10)
			})
		} else if (matchStage === "PICK" || matchStage === "STUCK") {
			setMatchStage("READY")
			setCurrentPlayer((dealer + 1) % 4)
			setTurnCount(-10)
		}
	}

	const handlePlayerChoice = (player, card) => {
		// debug && console.log("handlePlayerChoice", player, card)
		if (!matchSuit) {
			if (trump.left.code === card.suit.code && card.faceValue === "J")
				setMatchSuit(trump.code)
			else setMatchSuit(card.suit.code)
		}
		setPlayedCards({ ...playedCards, [player]: card })
		setCurrentPlayer((currentPlayer + 1) % 4)
		handleDiscard(player, card)
	}

	const handleDiscard = (player, card) => {
		// debug && console.log("------------------HANDLE DISCARD FUNCTION", player, card)
		const hand = getPlayerHand(player, playerHand, nonPlayerHands)
		switch (player) {
			case 0: {
				hand.splice(hand.indexOf(card), 1)
				setPlayerHand(sortHand([...hand]))
				break
			}
			case 1: {
				hand.splice(hand.indexOf(card), 1)
				setOpponentHand1([...hand])
				break
			}
			case 2: {
				hand.splice(hand.indexOf(card), 1)
				setTeammateHand([...hand])
				break
			}
			case 3: {
				hand.splice(hand.indexOf(card), 1)
				setOpponentHand2([...hand])
				break
			}
		}
		if (matchStage === "PLAY") {
			setCurrentPlayer((currentPlayer + 1) % 4)
			setTurnCount(turnCount + 1)
		} else {
			setMatchStage("READY")
			setTurnCount(turnCount - 1)
		}
		function swap(arr, idx1, idx2) {
			[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
		}
	}

	const handleTrickEnd = () => {
		setPlayedCards({
			0: blankCard,
			1: blankCard,
			2: blankCard,
			3: blankCard,
		})
		setMatchSuit(null)
		setMatchStage("RESULT")
		setTurnCount(-10)
	}

	const scoreMatch = () => {
		let tempTeamScore = teamScore
		let tempOpposingScore = opponentScore
		if (matchTricks.callingTeam > matchTricks.opposingTeam) {
			// Calling Team won the match
			if (matchTricks.callingTeam >= 3) {
				if (matchTricks.callingTeam === 5) {
					const scoreCalc = goAlone !== null ? 4 : 2
					if (callingPlayer === yourSeat || findIsTeammate(callingPlayer, yourSeat)) {
						tempTeamScore += scoreCalc
						setTeamScore(tempTeamScore)
					} else {
						tempOpposingScore += scoreCalc
						setOpponentScore(tempOpposingScore)
					}
				} else {
					if (callingPlayer === yourSeat || findIsTeammate(callingPlayer, yourSeat)) {
						tempTeamScore++
						setTeamScore(tempTeamScore)
					} else {
						tempOpposingScore++
						setOpponentScore(tempOpposingScore)
					}
				}
			}
		} else {
			// Calling Team was Euchred
			if (callingPlayer === yourSeat || findIsTeammate(callingPlayer, yourSeat))
				setOpponentScore(opponentScore + 2)
			else setTeamScore(teamScore + 2)
		}
		if (tempTeamScore >= 10 || tempOpposingScore >= 10) {
			setMatchStage("GAMEOVER")
			setTurnCount(100)
		} else {
			setPromptText(prompts.matchResult)
		}
	}

	const handleMatchEnd = () => {
		setDealer((dealer + 1) % 4)
		setUpTrump({})
		setTrump({})
		setGoAlone(null)
		setMatchTricks({
			callingTeam: 0,
			opposingTeam: 0,
		})
		setCallingPlayer(null)
		setMatchStage("CALL")
		setTurnCount(0)
	}

	////////////////
	// useEffects //
	////////////////

	// Game Setup
	useEffect(() => {
		// debug && console.log("New Deal: Getting Deck and setting up hands")
		getDeck()
		sleep(250).then(() => setShowStartModal(true))
	}, [dealer])

	// Game Logic
	useEffect(() => {
		console.log(matchStage, "TurnCount", turnCount, "CurrentPlayer", currentPlayer)
		switch (matchStage) {
			case "PREGAME": {
				debug && console.log("------------------ PREGAME Stage")
				break
			}
			case "NEWGAME": {
				// FROM: StartModal OR MatchEnd
				// TO: CALL Stage to start picking Trump
				debug && console.log("------------------ NEWGAME Stage")
				// debug && console.log("%cPlayer Hand", "color: green", playerHand)
				// debug && console.log("%cNon-Player Hands", "color: green", nonPlayerHands)
				if (upTrump.faceValue === undefined)
					sleep(500).then(() => setTurnCount(turnCount - 1))
				else {
					setMatchStage("CALL")
					setTurnCount(0)
				}
				break
			}
			case "NEWMATCH": {
				// NOT CURRENTLY USED
				debug && console.log("------------------ NEWMATCH Stage")
				// debug && console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, upTrump)
				// debug && console.log("%cPlayer Hand", "color: green", playerHand)
				// debug && console.log("%cNon-Player Hands", "color: green", nonPlayerHands)
				break
			}
			case "CALL": {
				debug && console.log("------------------ Call Stage")
				debug && console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, upTrump)

				turnCount === 0 && setCurrentPlayer((dealer + 1) % 4)
				showTrumpStack === false && sleep(500).then(() => setShowTrumpStack(true))
				showTrumpCard === false && sleep(1250).then(() => setShowTrumpCard(true))
				if (turnCount >= 0) {
					if (turnCount > 3) {
						setMatchStage("PICK")
						setCurrentPlayer((dealer + 1) % 4)
						setTurnCount(0)
					} else {
						if (currentPlayer === yourSeat) {
							setPromptText(prompts.trump1Turn) // OPTION TO CALL IT UP
							setShowPromptModal(true)
						} else {
							setPromptText(prompts.trump1Round) // AWAITING TURN TO CALL IT UP
							setShowPromptModal(true)
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
							)
						}
					}
				} else {
					setTurnCount(0)
				}
				break
			}
			case "PICK": {
				debug && console.log("------------------ Pick Stage")
				debug && console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, upTrump)
				showTrumpCard === true && setShowTrumpCard(false)
				if (turnCount > 2) {
					setMatchStage("STUCK")
					setCurrentPlayer(dealer)
					setTurnCount(-1)
				} else {
					if (currentPlayer === yourSeat) {
						setPromptText(prompts.trump2Turn) // AWAITING TURN TO DECLARE IT
						setShowPromptModal(true)
					} else {
						setPromptText(prompts.trump2Round) // OPTION TO DECLARE IT
						setShowPromptModal(true)
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
						)
					}
				}
				break
			}
			case "STUCK": {
				debug && console.log("------------------ STUCK Stage")
				debug && console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, upTrump)
				if (dealer === yourSeat) {
					setPromptText(prompts.trump2Stuck) // STUCK TO DEALER YOU
					setShowPromptModal(true)
				} else {
					setPromptText(prompts.trump2StuckOther) // STUCK TO DEALER OTHER PLAYER
					setShowPromptModal(true)
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
					)
				}
				break
			}
			case "READY": {
				debug && console.log("------------------ READY Stage")
				setShowTrumpStack(false)
				if (!goAlone) {
					setPromptText(prompts.ready)
					setShowPromptModal(true)
				} else {
					setPromptText(prompts.goAlone)
					setShowPromptModal(true)
				}
				break
			}
			case "DISCARD": {
				debug && console.log("------------------ DISCARD Stage")
				// debug && console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, upTrump)
				if (yourSeat === dealer) {
					setPromptText(prompts.discard)
					setShowPromptModal(true)
				}
				else handleDiscard(dealer, upTrump)
				break
			}
			case "PLAY": {
				// MATCH PLAY
				debug && console.log("------------------ Play Stage")
				if (goAlone !== null && currentPlayer === (goAlone + 2) % 4) {
					setCurrentPlayer((currentPlayer + 1) % 4)
					setTurnCount(turnCount + 1)
					break
				}
				if (turnCount < 4) {
					if (currentPlayer === yourSeat) {
						setPromptText(prompts.yourTurn)
						setShowPromptModal(true)
					} else {
						setPromptText(prompts.othersTurn)
						setShowPromptModal(true)
						decideAIplay(
							currentPlayer,
							trump,
							matchSuit,
							playerHand,
							nonPlayerHands,
							handlePlayerChoice,
							playedCards
						)
					}
				} else {
					const trickScoreData = scoreTrick(playedCards, trump)
					setCurrentTrickScore(trickScoreData)
					if (trickScoreData.winner === callingPlayer || findIsTeammate(trickScoreData.winner, callingPlayer)) {
						setMatchTricks({
							...matchTricks,
							callingTeam: ++matchTricks.callingTeam,
						})
					} else {
						setMatchTricks({
							...matchTricks,
							opposingTeam: ++matchTricks.opposingTeam,
						})
					}
					if (trickScoreData.winner === yourSeat || findIsTeammate(trickScoreData.winner, yourSeat)) {
						setPromptText(prompts.trickResultWin)
						setShowPromptModal(true)
					} else {
						setPromptText(prompts.trickResultLose)
						setShowPromptModal(true)
					}
				}
				break
			}
			case "RESULT": {
				// END OF TRICK OR END OF MATCH
				debug && console.log("------------------ RESULT Stage")
				if (teamScore >= 10 || opponentScore >= 10) {
					setMatchStage("GAMEOVER")
					setTurnCount(100)
					break
				}
				if (matchTricks.opposingTeam + matchTricks.callingTeam === 5) {
					debug && console.log("------------------ RESULT Stage: 5 tricks done - scorematch")
					scoreMatch()
				} else {
					setCurrentPlayer(currentMatchScore.winner)
					setMatchStage("PLAY")
					setTurnCount(0)
				}
				break
			}
			case "GAMEOVER": {
				// WIN CONDITION MET
				debug && console.log("------------------ GAMEOVER Stage")
				// Setup a reset for another game
				break
			}
			default:
				debug && console.log("------------------ Default Stage")
		}
	}, [turnCount])



	return (
		<DataContext.Provider
			value={{
				goAlone,
				showTrumpStack,
				setShowTrumpStack,
				matchTricks,
				playedCards,
				setPlayedCards,
				handlePlayerChoice,
				handleDiscard,
				showTrumpCard,
				setShowTrumpCard,
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
				showPromptModal,
				setShowPromptModal,
				showStartModal,
				setShowStartModal,
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
			}}
		>
			{children}
		</DataContext.Provider>
	)
}

