import { v4 as uuid } from 'uuid'

// Scoring Modes
export const minAloneScore = 100
export const minCallScore = 70
// export const minAloneScore = 500
// export const minCallScore = 500

// Pace Settings
export const decidePace = 1250

// Log/Debug Mode Settings
export const logMode = false
export const debugMode = false


export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
// sleep(1500).then(() => setMatchStage("DEAL"));

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
		c9: require("../assets/decks/Default/c9.png"),
		c10: require("../assets/decks/Default/c10.png"),
		ca: require("../assets/decks/Default/ca.png"),
		cj: require("../assets/decks/Default/cj.png"),
		ck: require("../assets/decks/Default/ck.png"),
		cq: require("../assets/decks/Default/cq.png"),
		d9: require("../assets/decks/Default/d9.png"),
		d10: require("../assets/decks/Default/d10.png"),
		da: require("../assets/decks/Default/da.png"),
		dj: require("../assets/decks/Default/dj.png"),
		dk: require("../assets/decks/Default/dk.png"),
		dq: require("../assets/decks/Default/dq.png"),
		h9: require("../assets/decks/Default/h9.png"),
		h10: require("../assets/decks/Default/h10.png"),
		ha: require("../assets/decks/Default/ha.png"),
		hj: require("../assets/decks/Default/hj.png"),
		hk: require("../assets/decks/Default/hk.png"),
		hq: require("../assets/decks/Default/hq.png"),
		s9: require("../assets/decks/Default/s9.png"),
		s10: require("../assets/decks/Default/s10.png"),
		sa: require("../assets/decks/Default/sa.png"),
		sj: require("../assets/decks/Default/sj.png"),
		sk: require("../assets/decks/Default/sk.png"),
		sq: require("../assets/decks/Default/sq.png"),
		blank: require("../assets/decks/Default/blank.png"),
		deck: require("../assets/decks/Default/downHands/deck.png"),
		down0: require("../assets/decks/Default/downHands/down0.png"),
		down1: require("../assets/decks/Default/downHands/down1.png"),
		down2: require("../assets/decks/Default/downHands/down2.png"),
		down3: require("../assets/decks/Default/downHands/down3.png"),
		down4: require("../assets/decks/Default/downHands/down4.png"),
		down5: require("../assets/decks/Default/downHands/down5.png"),
	},
	QueenG: {
		c9: require("../assets/decks/QueenG/c9.png"),
		c10: require("../assets/decks/QueenG/c10.png"),
		ca: require("../assets/decks/QueenG/ca.png"),
		cj: require("../assets/decks/QueenG/cj.png"),
		ck: require("../assets/decks/QueenG/ck.png"),
		cq: require("../assets/decks/QueenG/cq.png"),
		d9: require("../assets/decks/QueenG/d9.png"),
		d10: require("../assets/decks/QueenG/d10.png"),
		da: require("../assets/decks/QueenG/da.png"),
		dj: require("../assets/decks/QueenG/dj.png"),
		dk: require("../assets/decks/QueenG/dk.png"),
		dq: require("../assets/decks/QueenG/dq.png"),
		h9: require("../assets/decks/QueenG/h9.png"),
		h10: require("../assets/decks/QueenG/h10.png"),
		ha: require("../assets/decks/QueenG/ha.png"),
		hj: require("../assets/decks/QueenG/hj.png"),
		hk: require("../assets/decks/QueenG/hk.png"),
		hq: require("../assets/decks/QueenG/hq.png"),
		s9: require("../assets/decks/QueenG/s9.png"),
		s10: require("../assets/decks/QueenG/s10.png"),
		sa: require("../assets/decks/QueenG/sa.png"),
		sj: require("../assets/decks/QueenG/sj.png"),
		sk: require("../assets/decks/QueenG/sk.png"),
		sq: require("../assets/decks/QueenG/sq.png"),
		blank: require("../assets/decks/QueenG/blank.png"),
		deck: require("../assets/decks/QueenG/downHands/deck.png"),
		down0: require("../assets/decks/QueenG/downHands/down0.png"),
		down1: require("../assets/decks/QueenG/downHands/down1.png"),
		down2: require("../assets/decks/QueenG/downHands/down2.png"),
		down3: require("../assets/decks/QueenG/downHands/down3.png"),
		down4: require("../assets/decks/QueenG/downHands/down4.png"),
		down5: require("../assets/decks/QueenG/downHands/down5.png"),

	}
}