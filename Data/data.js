import { v4 as uuid } from 'uuid'

// Scoring Modes
export const minCallScore = 72
export const minAloneScore = 100

// Pace Settings
export const decidePace = 1000

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
		down1: require("../assets/decks/Default/downHands/down1.png"),
	},
	Year2099: {
		c9: require("../assets/decks/Year2099/c9.png"),
		c10: require("../assets/decks/Year2099/c10.png"),
		ca: require("../assets/decks/Year2099/ca.png"),
		cj: require("../assets/decks/Year2099/cj.png"),
		ck: require("../assets/decks/Year2099/ck.png"),
		cq: require("../assets/decks/Year2099/cq.png"),
		d9: require("../assets/decks/Year2099/d9.png"),
		d10: require("../assets/decks/Year2099/d10.png"),
		da: require("../assets/decks/Year2099/da.png"),
		dj: require("../assets/decks/Year2099/dj.png"),
		dk: require("../assets/decks/Year2099/dk.png"),
		dq: require("../assets/decks/Year2099/dq.png"),
		h9: require("../assets/decks/Year2099/h9.png"),
		h10: require("../assets/decks/Year2099/h10.png"),
		ha: require("../assets/decks/Year2099/ha.png"),
		hj: require("../assets/decks/Year2099/hj.png"),
		hk: require("../assets/decks/Year2099/hk.png"),
		hq: require("../assets/decks/Year2099/hq.png"),
		s9: require("../assets/decks/Year2099/s9.png"),
		s10: require("../assets/decks/Year2099/s10.png"),
		sa: require("../assets/decks/Year2099/sa.png"),
		sj: require("../assets/decks/Year2099/sj.png"),
		sk: require("../assets/decks/Year2099/sk.png"),
		sq: require("../assets/decks/Year2099/sq.png"),
		blank: require("../assets/decks/Year2099/blank.png"),
		deck: require("../assets/decks/Year2099/downHands/deck.png"),
		down1: require("../assets/decks/Year2099/downHands/down1.png"),
	}
}

export const sounds = {
	deal: require("../assets/sounds/deal.mp3"),
	play: require("../assets/sounds/play.mp3"),
	flip: require("../assets/sounds/flip.mp3"),
	win: require("../assets/sounds/win.wav"),
	lose: require("../assets/sounds/lose.wav"),
}

export const customFonts = {
	"SFPro-Light": require("../assets/fonts/SF-Pro-Text-Light.otf"),
	"SFPro-Heavy": require("../assets/fonts/SF-Pro-Text-Heavy.otf"),
	"SFPro-Bold": require("../assets/fonts/SF-Pro-Text-Bold.otf"),
	"SF-Pro-Display-ThinItalic": require("../assets/fonts/SF-Pro-Display-ThinItalic.otf"),
	"SFPro-Display-Bold": require("../assets/fonts/SF-Pro-Display-Bold.otf"),
	"JuliusSansOne": require("../assets/fonts/JuliusSansOne-Regular.ttf"),
}

export const themeSamples = {
	Default: require("../assets/decks/Default/icons/example.png"),
	Year2099: require("../assets/decks/Year2099/icons/example.png"),
}

export const themeHands = {
	Default: require("../assets/decks/Default/icons/hand.png"),
	Year2099: require("../assets/decks/Year2099/icons/hand.png"),
}

export const themeTable = {
	"table-green": {
		image: require("../assets/table/table-green.png"),
		title: "Classic Green"
	},
	"table-great-room": {
		image: require("../assets/table/table-great-room.png"),
		title: "The Great Room"
	},
	"table-2099": {
		image: require("../assets/table/table-2099.png"),
		title: "Year 2099"
	}
}
