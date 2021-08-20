import { v4 as uuid } from 'uuid'

// Scoring Modes
// const minAloneScore = 100
// const minCallScore = 70
export const minAloneScore = 500
export const minCallScore = 500

// Pace Settings
export const decidePace = 1000
// export const decidePace = 400

// Log/Debug Mode Settings
export const logMode = true
export const debugMode = true


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
	c9: require("../assets/cards/c9.png"),
	c10: require("../assets/cards/c10.png"),
	ca: require("../assets/cards/ca.png"),
	cj: require("../assets/cards/cj.png"),
	ck: require("../assets/cards/ck.png"),
	cq: require("../assets/cards/cq.png"),
	d9: require("../assets/cards/d9.png"),
	d10: require("../assets/cards/d10.png"),
	da: require("../assets/cards/da.png"),
	deck: require("../assets/cards/deck.png"),
	dj: require("../assets/cards/dj.png"),
	dk: require("../assets/cards/dk.png"),
	down0: require("../assets/cards/down0.png"),
	down1: require("../assets/cards/down1.png"),
	down2: require("../assets/cards/down2.png"),
	down3: require("../assets/cards/down3.png"),
	down4: require("../assets/cards/down4.png"),
	down5: require("../assets/cards/down5.png"),
	dq: require("../assets/cards/dq.png"),
	h9: require("../assets/cards/h9.png"),
	h10: require("../assets/cards/h10.png"),
	ha: require("../assets/cards/ha.png"),
	hj: require("../assets/cards/hj.png"),
	hk: require("../assets/cards/hk.png"),
	hq: require("../assets/cards/hq.png"),
	s9: require("../assets/cards/s9.png"),
	s10: require("../assets/cards/s10.png"),
	sa: require("../assets/cards/sa.png"),
	sj: require("../assets/cards/sj.png"),
	sk: require("../assets/cards/sk.png"),
	sq: require("../assets/cards/sq.png"),
	blank: require("../assets/cards/blank.png")
}

// export const dealerIcon = <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
// 	<circle cx="24" cy="24" r="23.5" stroke="white" />
// 	<path opacity="0.65" d="M37.4158 13.1625L35.5175 12.3692V25.1617L38.96 16.86C39.5408 15.415 38.875 13.7575 37.4158 13.1625V13.1625ZM9.79083 18.4042L16.8175 35.3333C17.0244 35.8484 17.3773 36.2918 17.8329 36.6089C18.2885 36.926 18.8268 37.1031 19.3817 37.1183C19.75 37.1183 20.1325 37.0475 20.5008 36.8917L30.9417 32.5708C32.0042 32.1317 32.6558 31.0833 32.6842 30.035C32.6983 29.6667 32.6275 29.2558 32.5 28.8875L25.4167 11.9583C25.2164 11.4399 24.8648 10.9937 24.4074 10.6778C23.9501 10.362 23.4083 10.1911 22.8525 10.1875C22.4842 10.1875 22.1158 10.2725 21.7617 10.4L11.335 14.7208C10.6419 15.0047 10.0899 15.5521 9.80034 16.2428C9.51078 16.9335 9.50736 17.7109 9.79083 18.4042V18.4042ZM32.67 13.0208C32.67 12.2694 32.3715 11.5487 31.8401 11.0174C31.3088 10.486 30.5881 10.1875 29.8367 10.1875H27.7825L32.67 22.0025" fill="white" />
// </svg>