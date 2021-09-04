import { v4 as uuid } from 'uuid'

// Scoring Modes
export const minCallScore = 72
export const minAloneScore = 100
// export const minCallScore = 500
// export const minAloneScore = 500

// Pace Settings
export const decidePace = 900

// Log/Debug Mode Settings
export const logMode = false
export const debugMode = false
export const logFuncMode = false
export const AIDebugMode = false

/* Things to Check Before Unflagging:
	- minCall and minAlone Scores (72,100)
	- decidePace (1000)
	- all log modes FALSE
*/
export const resetDefaultGamSettingsFlag = false

export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const blankCard = {
	_id: uuid(),
	faceValue: "0",
	suit: {
		code: "0",
		name: "Blank",
		left: {
			code: "0",
			name: "0"
		}
	},
	value: 0,
}

export const cardImages = {
	Default: {
		c9: require("../Assets/decks/Default/c9.png"),
		c10: require("../Assets/decks/Default/c10.png"),
		ca: require("../Assets/decks/Default/ca.png"),
		cj: require("../Assets/decks/Default/cj.png"),
		ck: require("../Assets/decks/Default/ck.png"),
		cq: require("../Assets/decks/Default/cq.png"),
		d9: require("../Assets/decks/Default/d9.png"),
		d10: require("../Assets/decks/Default/d10.png"),
		da: require("../Assets/decks/Default/da.png"),
		dj: require("../Assets/decks/Default/dj.png"),
		dk: require("../Assets/decks/Default/dk.png"),
		dq: require("../Assets/decks/Default/dq.png"),
		h9: require("../Assets/decks/Default/h9.png"),
		h10: require("../Assets/decks/Default/h10.png"),
		ha: require("../Assets/decks/Default/ha.png"),
		hj: require("../Assets/decks/Default/hj.png"),
		hk: require("../Assets/decks/Default/hk.png"),
		hq: require("../Assets/decks/Default/hq.png"),
		s9: require("../Assets/decks/Default/s9.png"),
		s10: require("../Assets/decks/Default/s10.png"),
		sa: require("../Assets/decks/Default/sa.png"),
		sj: require("../Assets/decks/Default/sj.png"),
		sk: require("../Assets/decks/Default/sk.png"),
		sq: require("../Assets/decks/Default/sq.png"),
		blank: require("../Assets/decks/Default/blank.png"),
		deck: require("../Assets/decks/Default/downHands/deck.png"),
		down1: require("../Assets/decks/Default/downHands/down1.png"),
	},
	Year2099: {
		c9: require("../Assets/decks/Year2099/c9.png"),
		c10: require("../Assets/decks/Year2099/c10.png"),
		ca: require("../Assets/decks/Year2099/ca.png"),
		cj: require("../Assets/decks/Year2099/cj.png"),
		ck: require("../Assets/decks/Year2099/ck.png"),
		cq: require("../Assets/decks/Year2099/cq.png"),
		d9: require("../Assets/decks/Year2099/d9.png"),
		d10: require("../Assets/decks/Year2099/d10.png"),
		da: require("../Assets/decks/Year2099/da.png"),
		dj: require("../Assets/decks/Year2099/dj.png"),
		dk: require("../Assets/decks/Year2099/dk.png"),
		dq: require("../Assets/decks/Year2099/dq.png"),
		h9: require("../Assets/decks/Year2099/h9.png"),
		h10: require("../Assets/decks/Year2099/h10.png"),
		ha: require("../Assets/decks/Year2099/ha.png"),
		hj: require("../Assets/decks/Year2099/hj.png"),
		hk: require("../Assets/decks/Year2099/hk.png"),
		hq: require("../Assets/decks/Year2099/hq.png"),
		s9: require("../Assets/decks/Year2099/s9.png"),
		s10: require("../Assets/decks/Year2099/s10.png"),
		sa: require("../Assets/decks/Year2099/sa.png"),
		sj: require("../Assets/decks/Year2099/sj.png"),
		sk: require("../Assets/decks/Year2099/sk.png"),
		sq: require("../Assets/decks/Year2099/sq.png"),
		blank: require("../Assets/decks/Year2099/blank.png"),
		deck: require("../Assets/decks/Year2099/downHands/deck.png"),
		down1: require("../Assets/decks/Year2099/downHands/down1.png"),
	}
}

export const sounds = {
	deal: require("../Assets/sounds/deal.mp3"),
	play: require("../Assets/sounds/play.mp3"),
	flip: require("../Assets/sounds/flip.mp3"),
}