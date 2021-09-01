import React, { useState, useEffect, createContext } from "react"
import * as Device from 'expo-device'
import { Audio } from "expo-av"
import { hearts, diamonds, spades, clubs, Deck } from './Deck/deck'
import { sleep, blankCard, sounds } from "./Data/data"
import {
	decideTrump,
	decideAIplay,
	findIsTeammate,
	groupBySuit,
	getPlayerHand,
	scoreTrick,
} from "./Data/AI"
import { decidePace, debugMode, logMode } from "./Data/data"

export const DataContext = createContext()

export default function GameContext({ appPreferences, setAppPreferences, children }) {
	////////////////
	// GAME STATE //
	////////////////

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
	const [gameplayCount, setGameplayCount] = useState(0)
	const [dealer, setDealer] = useState(0) // 0, 1, 2, 3
	const [currentPlayer, setCurrentPlayer] = useState(dealer + 1) // 0, 1, 2, 3, 4 (result)
	const [turnCount, setTurnCount] = useState(-1)
	const [yourSeat, setYourSeat] = useState(0)
	const [upTrump, setUpTrump] = useState({})

	// Modal/Prompt State
	const [showStartModal, setShowStartModal] = useState(false)
	const [showRulesModal, setShowRulesModal] = useState(false)
	const [showSettingsModal, setShowSettingsModal] = useState(false)
	const [showGameOverModal, setShowGameOverModal] = useState(false)
	const [showHelpModal, setShowHelpModal] = useState(false)
	const [showPromptModal, setShowPromptModal] = useState(false)
	const [showActionPrompt, setShowActionPrompt] = useState(false)
	const [actionText, setActionText] = useState("")
	const [promptText, setPromptText] = useState({
		text: "",
		subtitle: "",
		body: "",
		choices: [],
	})

	// Match State
	const [playerChoice, setPlayerChoice] = useState(null)
	const [trump, setTrump] = useState({}) // {suit, left}
	const [callingPlayer, setCallingPlayer] = useState(null)
	const [teamScore, setTeamScore] = useState(0)
	const [opponentScore, setOpponentScore] = useState(0)
	const [matchStage, setMatchStage] = useState("PREGAME") // PREGAME, NEWGAME, NEWMATCH, DEAL, PICK, CALL, READY, PLAY, RESULT, GAMEOVER
	const [currentMatchScore, setCurrentTrickScore] = useState({})
	const [matchSuit, setMatchSuit] = useState(null)
	const [goAlone, setGoAlone] = useState(null)
	const [matchTricks, setMatchTricks] = useState({
		callingTeam: 0,
		opposingTeam: 0,
	})

	// UI/AV State
	const [enableSound, setEnableSound] = useState(true)
	const [hasNotch, setHasNotch] = useState()
	const [showTrumpStack, setShowTrumpStack] = useState(false)
	const [showDeal, setShowDeal] = useState(false)
	const suits = {
		"h": { ...hearts, left: { ...diamonds }, select() { handleCallUp(suits.h) }, },
		"d": { ...diamonds, left: { ...hearts }, select() { handleCallUp(suits.d) }, },
		"s": { ...spades, left: { ...clubs }, select() { handleCallUp(suits.s) }, },
		"c": { ...clubs, left: { ...spades }, select() { handleCallUp(suits.c) }, },
	}
	async function playAIsound() {
		const { sound } = await Audio.Sound.createAsync(
			sounds.play,
			{ isMuted: !enableSound }
		)
		sound.setVolumeAsync(.2)
		await sound.playAsync()
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
			title: "Match Ready",
			subtitle: `${callingPlayer % 2 === 0
				? `Your team called ${trump.name}`
				: `The other team called ${trump.name}`}`,
			body: "Play will start to the left of the dealer.",
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
			subtitle: "Your Team Lost",
			body: "Get 'em next time!",
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
			subtitle: "",
			body: "",
			choices: [
				{
					text: "ok",
					shortAction: () => handleMatchEnd(),
					longAction: null,
					altText: "Tap to continue"
				}
			],
		},
	}

	const actionPrompts = {
		discard: "Choose a Card to Discard",
		yourTurn: "Choose a Card to Play",
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
		sleep(1000).then(() => {
			if (matchStage !== "PREGAME") {
				setCurrentPlayer((dealer + 1) % 4)
				setTurnCount(-25)
			} else {
				setTurnCount(-1)
			}

		})
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
		logMode && console.log(`${trump.name} called up by ${currentPlayer}`)
		setTrump(trump)
		setCallingPlayer(currentPlayer)
		if (matchStage === "CALL") {
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
			sleep(decidePace).then(() => {
				setMatchStage("READY")
				setCurrentPlayer((dealer + 1) % 4)
				setTurnCount(-10)
			})
		}
	}

	const handlePlayerChoice = (player, card) => {
		debugMode && console.log("handlePlayerChoice", player, card)
		setShowActionPrompt(false)
		if (!matchSuit) {
			debugMode && console.log("NO MATCHSUIT SET")
			if (trump.left.code === card.suit.code && card.faceValue === "J") {
				debugMode && console.log("LEFT LAID = SETTING TRUMP AS MATCH SUIT")
				setMatchSuit(trump.code)
			} else {
				debugMode && console.log("CARD LAID, NOT LEFT = SETTING MATCHSUIT AS CARD SUIT")
				setMatchSuit(card.suit.code)
			}
		} else debugMode && console.log("MATCHSUIT ALREADY SET, CONTINUING...")
		debugMode && console.log("PLAYING THE CARD, DISCARD, THEN ADVANCING CURRENT PLAYER")
		setPlayedCards({ ...playedCards, [player]: card })
		setCurrentPlayer((currentPlayer + 1) % 4)
		handleDiscard(player, card)
	}

	const handleDiscard = (player, card) => {
		debugMode && console.log("------------------HANDLE DISCARD FUNCTION", player, card)
		setShowActionPrompt(false)
		showDeal === true && setShowTrumpStack(false)
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
	}

	const checkValidCard = (hand, card) => {
		// MATCHSUIT NOT DECLARED
		// if matchSuit is not declard, return TRUE
		if (card === upTrump) return false
		if (!matchSuit) return true
		// MATCHSUIT DECLARED
		// Sort Hand by suit
		const suitMap = groupBySuit(hand)
		// if you have matchSuit
		console.log(suitMap)
		if (suitMap.hasOwnProperty(matchSuit)) {
			// Check that the only matchSuit card isn't actually the LEFT bower
			if (suitMap[matchSuit].length === 1 && suitMap[matchSuit][0].faceValue === "J") return true
			// if the card IS matchSuit AND is NOT the left bower (jack of opposite trump suit) return true
			if (card.suit.code === matchSuit && !(card.suit.code === trump.left.code && card.faceValue === "J")) return true
			else return false
		} else {
			// if you DON'T have matchSuit
			return true
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
		logMode && console.log('SCORE MATCH START')
		let tempTeamScore = teamScore
		let tempOpposingScore = opponentScore
		if (matchTricks.callingTeam > matchTricks.opposingTeam) {
			// Calling Team won the match
			logMode && console.log('CALLING TEAM WON', matchTricks.callingTeam, matchTricks.opposingTeam)

			if (matchTricks.callingTeam >= 3) {
				if (matchTricks.callingTeam === 5) {
					const scoreCalc = goAlone !== null ? 4 : 2
					if (callingPlayer === yourSeat || findIsTeammate(callingPlayer, yourSeat)) {
						tempTeamScore += scoreCalc
						setTeamScore(tempTeamScore)
						prompts.matchResult.subtitle = "You Won"
						if (goAlone !== null) prompts.matchResult.body = `Your team took all five tricks while going alone (4pts)`
						else prompts.matchResult.body = `Your team took all five tricks (2pts)`
					} else {
						tempOpposingScore += scoreCalc
						setOpponentScore(tempOpposingScore)
						prompts.matchResult.subtitle = "You Lost"
						if (goAlone !== null) prompts.matchResult.body = `The other team took all five tricks while going alone (4pts)`
						else prompts.matchResult.body = `The other team took all five tricks (2pts)`
					}
				} else {
					if (callingPlayer === yourSeat || findIsTeammate(callingPlayer, yourSeat)) {
						tempTeamScore += 1
						setTeamScore(tempTeamScore)
						prompts.matchResult.subtitle = "You Won"
						prompts.matchResult.body = `Your team took ${matchTricks.callingTeam} tricks (1pt)`
					} else {
						tempOpposingScore += 1
						setOpponentScore(tempOpposingScore)
						prompts.matchResult.subtitle = "You Lost"
						prompts.matchResult.body = `The other team took ${matchTricks.callingTeam} tricks (1pt)`
					}
				}
			}
		} else {
			// Calling Team was Euchred
			logMode && console.log('CALLING TEAM WAS EUCHRED', matchTricks.callingTeam, matchTricks.opposingTeam)
			if (callingPlayer === yourSeat || findIsTeammate(callingPlayer, yourSeat)) {
				tempOpposingScore += 2
				setOpponentScore(tempOpposingScore)
				prompts.matchResult.subtitle = "You got Euchred"
				prompts.matchResult.body = "Your team called Trump but was unable to win at least three tricks"
			}
			else {
				tempTeamScore += 2
				setTeamScore(tempTeamScore)
				prompts.matchResult.subject = "You Euchred the other team"
				prompts.matchResult.body = `They called Trump but were unable to win at least three tricks`
			}
		}

		if (tempTeamScore >= 10 || tempOpposingScore >= 10) {
			logMode && console.log('GAME OVER', matchTricks.callingTeam, matchTricks.opposingTeam)
			setMatchStage("GAMEOVER")
			setTurnCount(100)
		} else {
			setPromptText(prompts.matchResult)
			setShowPromptModal(true)
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
		sleep(250).then(() => {
			setMatchStage("DEAL")
			setTurnCount(-25)
		})
	}

	const resetGame = () => {
		// Card State
		setPlayerHand([])
		setTeammateHand([])
		setOpponentHand1([])
		setOpponentHand2([])
		setPlayedCards({
			0: blankCard,
			1: blankCard,
			2: blankCard,
			3: blankCard,
		})

		// Game State
		setGameplayCount(gameplayCount + 1)
		setYourSeat(0)
		setUpTrump({})

		// Modal/Prompt State
		setActionText("")
		setPromptText({
			text: "",
			subtitle: "",
			body: "",
			choices: [],
		})

		// Match State
		setPlayerChoice(null)
		setTrump({})
		setCallingPlayer(null)
		setTeamScore(0)
		setOpponentScore(0)
		setCurrentTrickScore({})
		setMatchSuit(null)
		setGoAlone(null)
		setMatchTricks({
			callingTeam: 0,
			opposingTeam: 0,
		})
		// UI State
		setShowTrumpStack(false)
		setMatchStage("PREGAME")
		setShowGameOverModal(false)
		setDealer(dealer + 1)
		setCurrentPlayer(dealer + 1)
	}

	const checkForNotch = () => {
		const thisDevice = Device.modelName
		const notchedPhones = ["iPhone XR", "iPhone X", "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 mini", "iPhone 11 Pro", "iPhone 11 Pro Max", "iPhone 11"]
		return notchedPhones.includes(thisDevice)
	}

	////////////////
	// useEffects //
	////////////////

	// Check for notch
	useEffect(() => {
		const notchCheck = checkForNotch()
		setHasNotch(notchCheck)
	}, [])

	// Game/NewDeal Setup
	useEffect(() => {
		debugMode && console.log("New Deal: Getting Deck and setting up hands")
		matchStage === "PREGAME" && sleep(250).then(() => setShowStartModal(true))
		getDeck()
	}, [dealer])

	// Handle Player Drag Choice
	useEffect(() => {
		if (playerChoice) {
			debugMode && console.log(`Player Chose ${playerChoice} by dragging`)
			matchStage === "PLAY" ? handlePlayerChoice(yourSeat, playerChoice) : handleDiscard(yourSeat, playerChoice)
		}
	}, [playerChoice])

	// Handle Sound Preference Change
	useEffect(() => {
		setEnableSound(appPreferences.sounds)
	}, [appPreferences.sounds])

	// Game Logic
	useEffect(() => {
		logMode && console.log(matchStage, "TurnCount", turnCount, "CurrentPlayer", currentPlayer)
		switch (matchStage) {
			case "PREGAME": {
				logMode && console.log("------------------ PREGAME Stage")
				break
			}
			case "NEWGAME": {
				// FROM: StartModal OR MatchEnd
				// TO: CALL Stage to start picking Trump
				logMode && console.log("------------------ NEWGAME Stage")
				debugMode && console.log("%cPlayer Hand", "color: green", playerHand)
				debugMode && console.log("%cNon-Player Hands", "color: green", nonPlayerHands)
				if (upTrump.faceValue === undefined)
					sleep(500).then(() => setTurnCount(turnCount - 1))
				else {
					setMatchStage("DEAL")
					setTurnCount(-25)
				}
				break
			}
			case "NEWMATCH": {
				// NOT CURRENTLY USED
				logMode && console.log("------------------ NEWMATCH Stage")
				debugMode && console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, upTrump)
				debugMode && console.log("%cPlayer Hand", "color: green", playerHand)
				debugMode && console.log("%cNon-Player Hands", "color: green", nonPlayerHands)
				break
			}
			case "DEAL": {
				logMode && console.log("------------------ DEAL Stage")
				turnCount === 0 && setCurrentPlayer((dealer + 1) % 4)
				setShowDeal(true)
				showTrumpStack === false && sleep(4000).then(() => setShowTrumpStack(true))
				sleep(4500).then(() => {
					setMatchStage("CALL")
					setTurnCount(0)
				})
				break
			}
			case "CALL": {
				logMode && console.log("------------------ Call Stage")
				logMode && console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, upTrump.name)
				turnCount === 0 && setCurrentPlayer((dealer + 1) % 4)
				if (turnCount >= 0) {
					if (turnCount > 3) {
						setMatchStage("PICK")
						setCurrentPlayer((dealer + 1) % 4)
						setTurnCount(0)
					} else {
						if (currentPlayer === yourSeat) {
							setPromptText(prompts.trump1Turn) // OPTION TO CALL IT UP
							sleep(decidePace).then(() => setShowPromptModal(true))
						} else {
							sleep(decidePace).then(() => {
								setPromptText(prompts.trump1Round) // AWAITING TURN TO CALL IT UP
								setShowPromptModal(true)
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
							})
						}
					}
				} else {
					setTurnCount(0)
				}
				break
			}
			case "PICK": {
				logMode && console.log("------------------ Pick Stage")
				logMode && console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, upTrump.name)
				if (turnCount > 2) {
					setMatchStage("STUCK")
					setCurrentPlayer(dealer)
					setTurnCount(-1)
				} else {
					if (currentPlayer === yourSeat) {
						setPromptText(prompts.trump2Turn)
						setShowPromptModal(true)
					} else {
						setPromptText(prompts.trump2Round)
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
				logMode && console.log("------------------ STUCK Stage")
				logMode && console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, upTrump.name)
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
				logMode && console.log("------------------ READY Stage")
				setUpTrump({})
				setShowTrumpStack(false)
				if (goAlone === null) {
					setPromptText(prompts.ready)
					setShowPromptModal(true)
				} else {
					setPromptText(prompts.readyAlone)
					setShowPromptModal(true)
				}
				break
			}
			case "DISCARD": {
				setShowPromptModal(false)
				logMode && console.log("------------------ DISCARD Stage")
				logMode && console.log(`Current Player: ${currentPlayer} \nturnCount: ${turnCount} \nDealer: ${dealer}`, "\nDealer:", upTrump.name)
				if (yourSeat === dealer) {
					setShowPromptModal(false)
					setActionText(actionPrompts.discard)
					setShowActionPrompt(true)
				}
				else handleDiscard(dealer, upTrump)
				break
			}
			case "PLAY": {
				// MATCH PLAY
				logMode && console.log("------------------ Play Stage")
				if (goAlone !== null && currentPlayer === (goAlone + 2) % 4) {
					setCurrentPlayer((currentPlayer + 1) % 4)
					setTurnCount(turnCount + 1)
					break
				}
				if (turnCount < 4) {
					if (currentPlayer === yourSeat) {
						sleep(decidePace).then(() => {
							setShowPromptModal(false)
							setActionText(actionPrompts.yourTurn)
							setShowActionPrompt(true)
						})
					} else {
						setPromptText(prompts.othersTurn)
						setShowPromptModal(true)
						sleep(decidePace).then(() => {
							playAIsound()
							decideAIplay(
								currentPlayer,
								trump,
								matchSuit,
								playerHand,
								nonPlayerHands,
								handlePlayerChoice,
								playedCards
							)
						})
					}
				} else {
					const trickScoreData = scoreTrick(playedCards, trump, matchSuit)
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
						prompts.trickResultWin.subtitle = `${trickScoreData.winner === yourSeat ? 'You Won' : 'Your Teammate Won'}`
						setShowPromptModal(true)
					} else {
						setPromptText(prompts.trickResultLose)
						prompts.trickResultLose.body = `Player ${trickScoreData.winner} won the trick`
						setShowPromptModal(true)
					}
				}
				break
			}
			case "RESULT": {
				// END OF TRICK OR END OF MATCH
				logMode && console.log("------------------ RESULT Stage")
				if (teamScore >= 10 || opponentScore >= 10) {
					setMatchStage("GAMEOVER")
					setTurnCount(100)
					break
				}
				if (matchTricks.opposingTeam + matchTricks.callingTeam === 5) {
					logMode && console.log("------------------ RESULT Stage: 5 tricks done - scorematch")
					setShowDeal(false)
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
				logMode && console.log("------------------ GAMEOVER Stage")
				setShowGameOverModal(true)
				break
			}
			default:
				logMode && console.log("------------------ Unknown Stage")
		}
	}, [turnCount])

	return (
		<DataContext.Provider
			value={{
				appPreferences, setAppPreferences,
				enableSound, setEnableSound,
				gameplayCount, setGameplayCount,
				showPromptModal, setShowPromptModal,
				showRulesModal, setShowRulesModal,
				showSettingsModal, setShowSettingsModal,
				showStartModal, setShowStartModal,
				showHelpModal, setShowHelpModal,
				showGameOverModal, setShowGameOverModal,
				showActionPrompt, setShowActionPrompt,
				showTrumpStack, setShowTrumpStack,
				showDeal, setShowDeal,
				playedCards, setPlayedCards,
				matchSuit, setMatchSuit,
				turnCount, setTurnCount,
				callingPlayer, setCallingPlayer,
				opponentScore, setOpponentScore,
				promptText, setPromptText,
				playerHand, setPlayerHand,
				teammateHand, setTeammateHand,
				opponentHand1, setOpponentHand1,
				opponentHand2, setOpponentHand2,
				trump, setTrump,
				teamScore, setTeamScore,
				matchStage, setMatchStage,
				dealer, setDealer,
				currentPlayer, setCurrentPlayer,
				playerChoice, setPlayerChoice,
				actionText, setActionText,
				checkValidCard,
				goAlone,
				matchTricks,
				handlePlayerChoice,
				handleDiscard,
				pass,
				hasNotch,
				yourSeat,
				upTrump,
				suits,
				resetGame
			}}
		>
			{children}
		</DataContext.Provider>
	)
}