import React, { useState, useEffect, createContext } from "react"
import * as Device from 'expo-device'
import { Audio } from "expo-av"
import { hearts, diamonds, spades, clubs, Deck } from './Data/deck'
import { sleep, blankCard, sounds, decidePace } from "./Data/data"
import {
	decideTrump,
	decideAIplay,
	decideAIdiscard,
	findIsTeammate,
	groupBySuit,
	scoreTrick,
} from "./Data/AI"

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
	const nonPlayerHands = [opponentHand1, teammateHand, opponentHand2]

	// Game State
	const [gameplayCount, setGameplayCount] = useState(0)
	const [dealer, setDealer] = useState(0) // 0, 1, 2, 3
	const [currentPlayer, setCurrentPlayer] = useState(dealer + 1) // 0, 1, 2, 3, 4 (result)
	const [turnCount, setTurnCount] = useState(-1)
	const [yourSeat, setYourSeat] = useState(0)
	const [upTrump, setUpTrump] = useState({})
	const [upTrumpHistory, setUpTrumpHistory] = useState({})

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
	const [playerChoice, setPlayerChoice] = useState(blankCard)
	const [opponentOneChoice, setOpponentOneChoice] = useState(blankCard)
	const [teammateChoice, setTeammateChoice] = useState(blankCard)
	const [opponentThreeChoice, setOpponentThreeChoice] = useState(blankCard)
	const [trump, setTrump] = useState({}) // {suit, left}
	const [callingPlayer, setCallingPlayer] = useState(null)
	const [teamScore, setTeamScore] = useState(9)
	const [opponentScore, setOpponentScore] = useState(9)
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
	const [showTrumpCard, setShowTrumpCard] = useState(false)
	const [showDeal, setShowDeal] = useState(false)
	const suits = {
		"h": {
			...hearts, left: { ...diamonds }, select() {
				let hand
				hand = dealer === 0 ? playerHand : nonPlayerHands[dealer - 1]
				handleCallUp(suits.h, hand)
			},
		},
		"d": {
			...diamonds, left: { ...hearts }, select() {
				let hand
				hand = dealer === 0 ? playerHand : nonPlayerHands[dealer - 1]
				handleCallUp(suits.d, hand)
			},
		},
		"s": {
			...spades, left: { ...clubs }, select() {
				let hand
				hand = dealer === 0 ? playerHand : nonPlayerHands[dealer - 1]
				handleCallUp(suits.s, hand)
			},
		},
		"c": {
			...clubs, left: { ...spades }, select() {
				let hand
				hand = dealer === 0 ? playerHand : nonPlayerHands[dealer - 1]
				handleCallUp(suits.c, hand)
			},
		},
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
			subtitle: `${ currentPlayer % 2 === 0
				? "Your Teammate is deciding"
				: `Player ${ currentPlayer } is deciding` }`,
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
			subtitle: `${ currentPlayer % 2 === 0
				? "Your Teammate is deciding"
				: `Player ${ currentPlayer } is deciding` }`,
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
			subtitle: `${ callingPlayer % 2 === 0
				? `Your team called ${ trump.name }`
				: `The other team called ${ trump.name }` }`,
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
			title: `${ trump.name } is Trump`,
			subtitle: `${ goAlone === yourSeat
				? "You are going alone"
				: (goAlone + 2) % 4 === goAlone
					? "Your teammate is going alone"
					: `Player ${ goAlone } is going alone`
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
			subtitle: `${ currentPlayer % 2 === 0
				? "It's your teammate's turn"
				: `It's Player ${ currentPlayer }'s turn` }`,
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
		// console.log('getDeck ran')
		const newDeck = new Deck()
		newDeck.generateDeck()
		newDeck.shuffleDeck()
		setPlayerHand(sortHand([...newDeck.deck.slice(0, 5)]))
		setTeammateHand([...newDeck.deck.slice(5, 10)])
		setOpponentHand1([...newDeck.deck.slice(10, 15)])
		setOpponentHand2([...newDeck.deck.slice(15, 20)])
		setUpTrump(newDeck.deck[20])
	}

	const pass = () => {
		// console.log("pass fxn ran by", currentPlayer, "on turn", turnCount)
		setCurrentPlayer((currentPlayer + 1) % 4)
		setTurnCount(turnCount + 1)
	}

	const handleGoAlone = (trumpSuitCode) => {
		// console.log("handleGoAlone on suit", trumpSuitCode, "called by player", currentPlayer)
		setGoAlone(currentPlayer)
		suits[trumpSuitCode].select()
	}

	const startMatch = () => {
		// console.log("startMatch fxn")
		setMatchStage("PLAY")
		setCurrentPlayer((dealer + 1) % 4)
		setTurnCount(0)
	}

	const sortHand = (hand, givenTrump) => {
		// console.log("sortHand fxn", hand, "trump argument:", givenTrump)
		const byTrump = givenTrump ? givenTrump : trump
		const suitMap = groupBySuit(hand, byTrump)
		// console.log("suitMap:", suitMap)
		const sortedHand = []
		if (byTrump.code === undefined) {
			for (const suitCode in suitMap) {
				suitMap[suitCode].sort((a, b) => a.value - b.value)
				suitMap[suitCode].forEach((card) => sortedHand.push(card))
			}
		} else {
			for (const suitCode in suitMap) {
				if (suitCode !== byTrump.code) {
					suitMap[suitCode].sort((a, b) => a.value - b.value)
					suitMap[suitCode].forEach(card => sortedHand.push(card))
				}
			}
			if (suitMap.hasOwnProperty(byTrump.code)) {
				const trumpCards = []
				let left, right
				suitMap[byTrump.code].forEach(card => {
					if (card.faceValue === "J" && card.suit.code === byTrump.code) right = card
					else if (card.faceValue === "J" && card.suit.code === byTrump.left.code) left = card
					else trumpCards.push(card)
				})
				trumpCards.sort((a, b) => a.value - b.value)
				if (left) {
					trumpCards.push(left)
				}
				if (right) {
					trumpCards.push(right)
				}
				sortedHand.push(...trumpCards)
			}
		}
		// console.log("sortedHand = ", sortedHand)
		return sortedHand
	}

	const handleCallUp = (trump, hand) => {
		// console.log("handleCallUp fxn of", trump, "for hand", hand)
		const sortedHand = sortHand([...hand], trump)
		setTrump(trump)
		setCallingPlayer(currentPlayer)
		if (matchStage === "CALL") {
			// add the card to the dealer's hand
			setShowTrumpCard(false)
			sleep(decidePace).then(() => {
				switch (dealer) {
					case 0: {
						setPlayerHand([...sortedHand, upTrump])
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

	const handleDiscard = (player, card, incomingHand) => {
		let hand = [...incomingHand]
		setShowActionPrompt(false)
		showDeal === true && sleep(300).then(() => setShowTrumpStack(false))
		switch (player) {
			case 0: {
				if (hand.length === 1) setPlayerHand([])
				else {
					hand.splice(hand.indexOf(card), 1)
					setPlayerHand(sortHand([...hand]))
				}
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
			setPlayerChoice(blankCard)
			setMatchStage("READY")
			setCurrentPlayer(dealer + 1)
			setTurnCount(turnCount - 1)
		}
	}

	const handlePlayerChoice = (player, card) => {
		let hand
		setShowActionPrompt(false)
		if (!matchSuit) {
			if (trump.left.code === card.suit.code && card.faceValue === "J") {
				setMatchSuit(trump.code)
			} else {
				setMatchSuit(card.suit.code)
			}
		}
		hand = player === 0 ? [...playerHand] : [...nonPlayerHands[player - 1]]
		switch (player) {
			case 0: {
				setPlayerChoice(card)
				break
			}
			case 1: {
				setOpponentOneChoice(card)
				break
			}
			case 2: {
				setTeammateChoice(card)
				break
			}
			case 3: {
				setOpponentThreeChoice(card)
				break
			}
			default: console.log("no given player in handlePlayerChoice")
		}
		handleDiscard(player, card, hand)
		// setCurrentPlayer((player + 1) % 4)
	}


	const checkValidCard = (hand, card) => {
		if (card === upTrump) return false
		if (!matchSuit) {
			return true
		}
		const suitMap = groupBySuit(hand, trump)
		if (suitMap.hasOwnProperty(matchSuit) && suitMap[matchSuit].length > 0) {
			if (suitMap[matchSuit].includes(card)) return true
			else return false
		} else return true
	}

	const handleTrickEnd = () => {
		setPlayerChoice(blankCard)
		setOpponentOneChoice(blankCard)
		setTeammateChoice(blankCard)
		setOpponentThreeChoice(blankCard)
		setMatchSuit(null)
		setMatchStage("RESULT")
		setTurnCount(-10)
	}

	const scoreMatch = () => {
		// console.log("scoreMatch fxn")
		let tempTeamScore = teamScore
		let tempOpposingScore = opponentScore
		if (matchTricks.callingTeam > matchTricks.opposingTeam) {
			if (matchTricks.callingTeam === 5) {
				const scoreCalc = goAlone !== null ? 4 : 2
				if (callingPlayer === yourSeat || findIsTeammate(callingPlayer, yourSeat)) {
					tempTeamScore += scoreCalc
					setTeamScore(tempTeamScore)
					prompts.matchResult.subtitle = "You Won"
					if (goAlone !== null) prompts.matchResult.body = `Your team took all five tricks while going alone(4pts)`
					else prompts.matchResult.body = `Your team took all five tricks(2pts)`
				} else {
					tempOpposingScore += scoreCalc
					setOpponentScore(tempOpposingScore)
					prompts.matchResult.subtitle = "You Lost"
					if (goAlone !== null) prompts.matchResult.body = `The other team took all five tricks while going alone(4pts)`
					else prompts.matchResult.body = `The other team took all five tricks(2pts)`
				}
			} else {
				if (callingPlayer === yourSeat || findIsTeammate(callingPlayer, yourSeat)) {
					tempTeamScore += 1
					setTeamScore(tempTeamScore)
					prompts.matchResult.subtitle = "You Won"
					prompts.matchResult.body = `Your team took ${ matchTricks.callingTeam } tricks(1pt)`
				} else {
					tempOpposingScore += 1
					setOpponentScore(tempOpposingScore)
					prompts.matchResult.subtitle = "You Lost"
					prompts.matchResult.body = `The other team took ${ matchTricks.callingTeam } tricks(1pt)`
				}
			}
		} else {
			if (callingPlayer === yourSeat || findIsTeammate(callingPlayer, yourSeat)) {
				tempOpposingScore += 2
				setOpponentScore(tempOpposingScore)
				prompts.matchResult.subtitle = "You got Euchred"
				prompts.matchResult.body = "Your team called Trump but was unable to win at least three tricks"
			}
			else {
				tempTeamScore += 2
				setTeamScore(tempTeamScore)
				prompts.matchResult.subtitle = "The other team got Euchred"
				prompts.matchResult.body = `The other team called Trump but were unable to win at least three tricks`
			}
		}

		if (tempTeamScore >= 10 || tempOpposingScore >= 10) {
			setMatchStage("GAMEOVER")
			setTurnCount(100)
		} else {
			setPromptText(prompts.matchResult)
			setShowPromptModal(true)
		}
	}

	const handleMatchEnd = () => {
		setDealer((dealer + 1) % 4)
		setUpTrumpHistory(upTrump)
		setUpTrump({})
		setTrump({})
		setGoAlone(null)
		setMatchTricks({
			callingTeam: 0,
			opposingTeam: 0,
		})
		setCallingPlayer(null)
		sleep(250).then(() => {
			setMatchStage("NEWMATCH")
			setTurnCount(-25)
		})
	}

	const resetGame = () => {
		setShowGameOverModal(false)

		// Card State
		setPlayerHand([])
		setTeammateHand([])
		setOpponentHand1([])
		setOpponentHand2([])

		// Game State
		setGameplayCount(gameplayCount + 1)
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
		setPlayerChoice(blankCard)
		setOpponentOneChoice(blankCard)
		setTeammateChoice(blankCard)
		setOpponentThreeChoice(blankCard)
		setDealer(0)
		setCurrentPlayer(1)
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
		setShowTrumpCard(false)
		setShowDeal(false)
		setMatchStage("PREGAME")
		setTurnCount(-999)
	}

	const checkForNotch = () => {
		const thisDevice = Device.modelName
		const notchedPhones = ["iPhone XR", "iPhone X", "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 mini", "iPhone 11 Pro", "iPhone 11 Pro Max", "iPhone 11", "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 mini",]
		return notchedPhones.includes(thisDevice)
	}

	////////////////
	// useEffects //
	////////////////


	// Re-Sort playerHand after Trump state change
	useEffect(() => {
		setPlayerHand(sortHand([...playerHand]))
	}, [trump])

	// Check for notch
	useEffect(() => {
		const notchCheck = checkForNotch()
		setHasNotch(notchCheck)
	}, [])

	// Handle Player Drag Choice
	useEffect(() => {
		if (playerChoice !== blankCard) {
			matchStage === "PLAY" ? handlePlayerChoice(yourSeat, playerChoice) : handleDiscard(yourSeat, playerChoice, playerHand)
		}
	}, [playerChoice])

	// Handle Sound Preference Change
	useEffect(() => {
		setEnableSound(appPreferences.sounds)
	}, [appPreferences.sounds])

	// Game Logic
	useEffect(() => {
		// console.log('DEBUG LOG START ---------------------------------------------')
		// console.log("match stage", matchStage)
		// console.log("current player", currentPlayer)
		// console.log("dealer", dealer)
		// console.log("turn count", turnCount)
		// console.log('showTrumpCard', showTrumpCard)
		// console.log('showtrumpstack', showTrumpStack)
		// console.log('showDeal', showDeal)
		// console.log(`DEBUG LOG END -----------------------------------------------\n\n\n`)

		switch (matchStage) {
			case "PREGAME": {
				setShowStartModal(true)
				getDeck()
				break
			}
			case "NEWGAME": {
				// FROM: StartModal OR MatchEnd
				// TO: CALL Stage to start picking Trump
				if (upTrump.faceValue === undefined) {
					sleep(500).then(() => setTurnCount(turnCount - 1))
				} else {
					setMatchStage("DEAL")
					setTurnCount(turnCount - 1)
				}
				break
			}
			case "NEWMATCH": {
				getDeck()
				sleep(500).then(() => {
					setMatchStage('NEWGAME')
					setTurnCount(turnCount - 1)
				})
				break
			}
			case "DEAL": {
				// console.log('DEAL STAGE HIT')
				setCurrentPlayer((dealer + 1) % 4)
				setShowDeal(true)
				sleep(4000).then(() => {
					// console.log('SET SHOW TRUMP STUFF')
					setShowTrumpStack(true)
					setShowTrumpCard(true)
				})
				sleep(5000).then(() => {
					// console.log('SWITCHING TO CALL')
					setMatchStage("CALL")
					setTurnCount(0)
				})
				break
			}
			case "CALL": {
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
									setGoAlone,
									upTrumpHistory
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
				if (turnCount > 2) {
					setMatchStage("STUCK")
					setCurrentPlayer(dealer)
					setTurnCount(-1)
				} else {
					setShowTrumpCard(false)
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
								setGoAlone,
								upTrumpHistory
							)
						)
					}
				}
				break
			}
			case "STUCK": {
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
							setGoAlone,
							upTrumpHistory
						)
					)
				}
				break
			}
			case "READY": {
				// setPlayerHand(sortHand([ ...playerHand ]))
				setUpTrumpHistory(upTrump)
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
				if (yourSeat === dealer) {
					setShowPromptModal(false)
					setActionText(actionPrompts.discard)
					setShowActionPrompt(true)
				}
				else {
					const player = dealer
					const hand = nonPlayerHands[player - 1]
					const discardChoice = decideAIdiscard(hand, trump)
					handleDiscard(player, discardChoice, hand)
				}
				break
			}
			case "PLAY": {
				// MATCH PLAY
				if (goAlone !== null && currentPlayer === (goAlone + 2) % 4) {
					setCurrentPlayer((currentPlayer + 1) % 4)
					setTurnCount(turnCount + 1)
					break
				}
				if (turnCount < 4) {
					if (currentPlayer === yourSeat) {
						setShowPromptModal(false)
						setActionText(actionPrompts.yourTurn)
						setShowActionPrompt(true)
					} else {
						setPromptText(prompts.othersTurn)
						setShowPromptModal(true)
						sleep(decidePace).then(() => {
							playAIsound()
							decideAIplay(
								currentPlayer,
								trump,
								matchSuit,
								nonPlayerHands[currentPlayer - 1],
								handlePlayerChoice,
								{
									0: playerChoice,
									1: opponentOneChoice,
									2: teammateChoice,
									3: opponentThreeChoice
								}
							)
						})
					}
				} else {
					const trickScoreData = scoreTrick({
						0: playerChoice,
						1: opponentOneChoice,
						2: teammateChoice,
						3: opponentThreeChoice
					}, trump, matchSuit, true) // true = isTrickEnd
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
						prompts.trickResultWin.subtitle = `${ trickScoreData.winner === yourSeat ? 'You Won' : 'Your Teammate Won' } `
						setPromptText(prompts.trickResultWin)
						setShowPromptModal(true)
					} else {
						prompts.trickResultLose.body = `Player ${ trickScoreData.winner } won the trick`
						setPromptText(prompts.trickResultLose)
						setShowPromptModal(true)
					}
				}
				break
			}
			case "RESULT": {
				// END OF TRICK OR END OF MATCH
				if (teamScore >= 10 || opponentScore >= 10) {
					setMatchStage("GAMEOVER")
					setTurnCount(100)
					break
				}
				if (matchTricks.opposingTeam + matchTricks.callingTeam === 5) {
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
				setShowGameOverModal(true)
				break
			}
			default:
			// console.log("------------------ Unknown Stage")
		}
	}, [turnCount])

	return (
		<DataContext.Provider
			value={ {
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
				showTrumpCard, setShowTrumpCard,
				playerChoice, setPlayerChoice,
				opponentOneChoice, setOpponentOneChoice,
				teammateChoice, setTeammateChoice,
				opponentThreeChoice, setOpponentThreeChoice,
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
				checkValidCard, upTrumpHistory, goAlone, matchTricks, handlePlayerChoice, pass, hasNotch, yourSeat, upTrump, suits, resetGame, sortHand
			} }
		>
			{ children }
		</DataContext.Provider>
	)
}