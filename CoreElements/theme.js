import React from "react"
import { StyleSheet } from "react-native"
import Svg, { Path, Circle } from "react-native-svg"

export const colors = {
	primary: "orange",
	primaryDark: "darkorange",
	secondary: "darkmagenta",
	secondaryDark: "#410041",
	white: "#E8E8E8",
	black: "#000000",
	translucent: "rgba(0, 0, 0, 0.5)",
	background: "#0A270E",
	yellow: "#E1C855",
	red: "#9B130E",
	green: "#34C800"
}

export const styles = StyleSheet.create({
	background: {
		width: "100%",
		height: "100%",
		position: "absolute",
	},
	screen: {
		width: "100%",
		height: "100%",
		alignItems: "center",
	},
	settingsScreen: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		shadowRadius: 10,
		shadowColor: colors.black,
		shadowOpacity: 1,
		shadowOffset: { width: 4, height: 4 }
	},
	settings: {
		width: "90%",
		height: "80%",
		alignItems: "center",
		justifyContent: "center",
	}
})

export const themeSamples = {
	Default: require("../assets/decks/Default/icons/example.png"),
	QueenG: require("../assets/decks/QueenG/icons/example.png"),
}

export const themeHands = {
	Default: require("../assets/decks/Default/icons/hand.png"),
	QueenG: require("../assets/decks/QueenG/icons/hand.png"),
}

export const iconSVGs = {
	spadeOutlined: <Svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M0.828125 18.6406C0.828125 22.6094 3.48438 25.2656 7.46875 25.2656C9.1875 25.2656 10.8125 24.6719 11.9375 23.7656C11.2969 25.4531 10.1406 26.7344 9.46875 27.5156C8.5 28.7188 8.96875 30.3125 10.6562 30.3125H20.3281C22.0156 30.3125 22.4844 28.7188 21.5 27.5156C20.8438 26.7344 19.6719 25.4531 19.0469 23.7656C20.1719 24.6719 21.7969 25.2656 23.5156 25.2656C27.5 25.2656 30.1562 22.6094 30.1562 18.6406C30.1562 12.0469 20.8125 8.8125 17.0156 1.46875C16.6875 0.828125 16.3281 0.328125 15.4844 0.328125C14.6406 0.328125 14.2969 0.828125 13.9688 1.46875C10.1719 8.8125 0.828125 12.0469 0.828125 18.6406ZM3.125 18.6094C3.125 13.3438 11.8125 10.7656 15.4844 2.875C19.1562 10.7656 27.8594 13.3438 27.8594 18.6094C27.8594 21.3125 26.0625 23.0938 23.3594 23.0938C21.4688 23.0938 19.9375 22.2812 18.9219 21.3438C17.9688 20.5156 16.625 20.9062 16.6875 22.3281C16.8438 23.9375 17.9375 26.3438 19.0312 27.6719C19.2656 27.9375 19.125 28.1562 18.8906 28.1562H12.0938C11.8594 28.1562 11.7188 27.9375 11.9531 27.6719C13.0469 26.3438 14.125 23.9375 14.2969 22.3281C14.3594 20.9062 13.0156 20.5156 12.0625 21.3438C11.0312 22.2812 9.51562 23.0938 7.625 23.0938C4.92188 23.0938 3.125 21.3125 3.125 18.6094Z" fill={colors.white} /></Svg>,
	spadeFilled: <Svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M0.828125 18.6562C0.828125 22.375 3.71875 25.2656 7.4375 25.2656C9.51562 25.2656 11.6562 24.5781 12.5625 22.75H12.7188C12.7344 24.8281 10.4531 26.5469 9.51562 27.5156C8.39062 28.6875 9.07812 30.3125 10.5312 30.3125H20.4531C21.9062 30.3125 22.5781 28.6875 21.4688 27.5156C20.5312 26.5469 18.25 24.8281 18.2656 22.75H18.4219C19.3281 24.5781 21.4688 25.2656 23.5312 25.2656C27.2656 25.2656 30.1562 22.375 30.1562 18.6562C30.1562 11.6562 20.8438 8.70312 17.1094 1.17188C16.7969 0.53125 16.3125 0.046875 15.4844 0.046875C14.6562 0.046875 14.1875 0.53125 13.875 1.17188C10.1406 8.70312 0.828125 11.6562 0.828125 18.6562Z" fill={colors.white} /></Svg>,
	diamondOutlined: <Svg width="25" height="33" viewBox="0 0 25 33" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M12.4844 32.7188C13.3438 32.7188 13.7656 32.1406 14.6562 30.9531L23.9844 18.5C24.4062 17.9219 24.6562 17.3438 24.6562 16.7188C24.6562 16.0781 24.4062 15.5156 23.9844 14.9375L14.6562 2.46875C13.7656 1.29688 13.3438 0.71875 12.4844 0.71875C11.625 0.71875 11.2031 1.29688 10.3281 2.46875L1 14.9375C0.5625 15.5156 0.328125 16.0781 0.328125 16.7188C0.328125 17.3438 0.5625 17.9219 1 18.5L10.3281 30.9531C11.2031 32.1406 11.625 32.7188 12.4844 32.7188ZM12.4844 29.4219C12.4062 29.4219 12.375 29.375 12.3281 29.2969L3.29688 17.1406C3.15625 16.9688 3.14062 16.8438 3.14062 16.7188C3.14062 16.5938 3.15625 16.4688 3.29688 16.2969L12.3281 4.125C12.375 4.0625 12.4062 4.01562 12.4844 4.01562C12.5625 4.01562 12.5938 4.0625 12.6406 4.125L21.6875 16.2969C21.8125 16.4688 21.8438 16.5938 21.8438 16.7188C21.8438 16.8438 21.8125 16.9688 21.6875 17.1406L12.6406 29.2969C12.5938 29.375 12.5625 29.4219 12.4844 29.4219Z" fill={colors.red} /></Svg>,
	diamondFilled: <Svg width="25" height="33" viewBox="0 0 25 33" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M12.4844 32.7188C13.3438 32.7188 13.7656 32.1406 14.6562 30.9531L23.9844 18.5C24.4062 17.9219 24.6562 17.3438 24.6562 16.7188C24.6562 16.0781 24.4062 15.5156 23.9844 14.9375L14.6562 2.46875C13.7656 1.29688 13.3438 0.71875 12.4844 0.71875C11.625 0.71875 11.2031 1.29688 10.3281 2.46875L1 14.9375C0.5625 15.5156 0.328125 16.0781 0.328125 16.7188C0.328125 17.3438 0.5625 17.9219 1 18.5L10.3281 30.9531C11.2031 32.1406 11.625 32.7188 12.4844 32.7188Z" fill={colors.red} /></Svg>,
	clubOutlined: <Svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M0.59375 18.5C0.59375 22.5469 3.29688 25.25 7.34375 25.25C9.07812 25.25 10.8125 24.6719 11.9375 23.75C11.2969 25.4531 10.1406 26.7188 9.46875 27.5156C8.5 28.7188 8.96875 30.3125 10.6562 30.3125H20.3281C22.0156 30.3125 22.4844 28.7188 21.5 27.5156C20.8281 26.7188 19.6719 25.4531 19.0469 23.75C20.1719 24.6719 21.9062 25.25 23.6406 25.25C27.6875 25.25 30.3906 22.5469 30.3906 18.5C30.3906 14.7656 27.3594 11.7344 23.6562 11.7344C22.5156 11.7344 21.3594 12.0312 20.3125 12.5469C21.6719 11.0938 22.2344 9.29688 22.2344 7.71875C22.2344 3.98438 19.2031 0.953125 15.4844 0.953125C11.7812 0.953125 8.75 3.98438 8.75 7.71875C8.75 9.3125 9.3125 11.0781 10.6719 12.5469C9.625 12.0312 8.46875 11.7344 7.32812 11.7344C3.625 11.7344 0.59375 14.7656 0.59375 18.5ZM2.8125 18.5469C2.8125 16.0312 4.84375 14.0156 7.32812 14.0156C9.25 14.0156 10.5781 14.6406 11.6406 15.0625C12.125 15.2188 12.5156 15.3438 12.9062 15.3438C13.4688 15.3438 14.0156 14.9688 14.0156 14.25C14.0156 13.8438 13.8594 13.4375 13.5781 13.1094C12.1875 11.4844 10.9688 10.2031 10.9688 7.76562C10.9688 5.25 12.9844 3.23438 15.4844 3.23438C18 3.23438 20.0156 5.25 20.0156 7.76562C20.0156 10.2031 18.7969 11.4844 17.4062 13.1094C17.125 13.4375 16.9688 13.8438 16.9688 14.25C16.9688 14.9688 17.5156 15.3438 18.0781 15.3438C18.4688 15.3438 18.8438 15.2188 19.3281 15.0625C20.3906 14.6562 21.7188 14.0156 23.6562 14.0156C26.1406 14.0156 28.1719 16.0312 28.1719 18.5469C28.1719 21.25 26.3594 23.0312 23.6406 23.0312C21.75 23.0312 19.9375 22.2812 18.9062 21.3438C17.9688 20.5156 16.625 20.9062 16.6875 22.3281C16.8438 23.9375 17.9375 26.3438 19.0312 27.6719C19.2656 27.9375 19.125 28.1562 18.8906 28.1562H12.0938C11.8594 28.1562 11.7188 27.9375 11.9531 27.6719C13.0469 26.3438 14.125 23.9375 14.2969 22.3281C14.3594 20.9062 13.0156 20.5156 12.0625 21.3438C11.0312 22.2812 9.23438 23.0312 7.34375 23.0312C4.625 23.0312 2.8125 21.25 2.8125 18.5469Z" fill={colors.white} /></Svg>,
	clubFilled: <Svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M0.765625 17.6406C0.765625 21.375 3.71875 24.2656 7.4375 24.2656C9.51562 24.2656 11.6562 23.5781 12.5625 21.75H12.7188C12.7344 23.8281 10.4531 25.5469 9.51562 26.5156C8.39062 27.6875 9.07812 29.3125 10.5312 29.3125H20.4531C21.9062 29.3125 22.5781 27.6875 21.4688 26.5156C20.5312 25.5469 18.25 23.8281 18.2656 21.75H18.4219C19.3281 23.5781 21.4688 24.2656 23.5312 24.2656C27.2656 24.2656 30.2188 21.375 30.2188 17.6406C30.2188 13.8906 27.3906 10.7188 23.6562 10.7188C22.2188 10.7188 20.75 11.2031 19.6094 12.1094C21.5469 10.5312 22.2188 8.54688 22.2188 6.76562C22.2188 3.03125 19.2031 0.03125 15.4844 0.03125C11.7812 0.03125 8.76562 3.03125 8.76562 6.76562C8.76562 8.54688 9.4375 10.5312 11.375 12.1094C10.2344 11.2031 8.76562 10.7188 7.32812 10.7188C3.59375 10.7188 0.765625 13.8906 0.765625 17.6406Z" fill={colors.white} /></Svg>,
	heartOutlined: <Svg width="33" height="30" viewBox="0 0 33 30" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M0.984375 10.2969C0.984375 16.9531 6.5625 23.5 15.375 29.125C15.7031 29.3281 16.1719 29.5469 16.5 29.5469C16.8281 29.5469 17.2969 29.3281 17.6406 29.125C26.4375 23.5 32.0156 16.9531 32.0156 10.2969C32.0156 4.76562 28.2188 0.859375 23.1562 0.859375C20.2656 0.859375 17.9219 2.23438 16.5 4.34375C15.1094 2.25 12.7344 0.859375 9.84375 0.859375C4.78125 0.859375 0.984375 4.76562 0.984375 10.2969ZM3.5 10.2969C3.5 6.14062 6.1875 3.375 9.8125 3.375C12.75 3.375 14.4375 5.20312 15.4375 6.76562C15.8594 7.39062 16.125 7.5625 16.5 7.5625C16.875 7.5625 17.1094 7.375 17.5625 6.76562C18.6406 5.23438 20.2656 3.375 23.1875 3.375C26.8125 3.375 29.5 6.14062 29.5 10.2969C29.5 16.1094 23.3594 22.375 16.8281 26.7188C16.6719 26.8281 16.5625 26.9062 16.5 26.9062C16.4375 26.9062 16.3281 26.8281 16.1875 26.7188C9.64062 22.375 3.5 16.1094 3.5 10.2969Z" fill={colors.red} /></Svg>,
	heartFilled: <Svg width="33" height="30" viewBox="0 0 33 30" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M16.5 29.5469C16.8281 29.5469 17.2969 29.3281 17.6406 29.125C26.4375 23.5 32.0156 16.9531 32.0156 10.2969C32.0156 4.76562 28.2188 0.859375 23.3125 0.859375C20.2656 0.859375 17.9219 2.54688 16.5 5.125C15.1094 2.5625 12.7344 0.859375 9.6875 0.859375C4.78125 0.859375 0.984375 4.76562 0.984375 10.2969C0.984375 16.9531 6.5625 23.5 15.375 29.125C15.7031 29.3281 16.1719 29.5469 16.5 29.5469Z" fill={colors.red} /></Svg>,
	passOutlined: <Svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M16.5 32.6562C25.2188 32.6562 32.4375 25.4219 32.4375 16.7188C32.4375 8 25.2031 0.78125 16.4844 0.78125C7.78125 0.78125 0.5625 8 0.5625 16.7188C0.5625 25.4219 7.79688 32.6562 16.5 32.6562ZM16.5 30C9.125 30 3.23438 24.0938 3.23438 16.7188C3.23438 9.34375 9.10938 3.4375 16.4844 3.4375C23.8594 3.4375 29.7656 9.34375 29.7812 16.7188C29.7969 24.0938 23.875 30 16.5 30ZM9.70312 21.6406C9.70312 22.5312 10.1562 23.0625 10.9531 23.0469C11.75 23.0312 12.2031 22.5312 12.2031 21.6406V17.2969C12.2031 15.875 12.8906 15.2188 14.2344 15.2188H18.3125V17.6719C18.3125 18.6875 19.4531 19.1562 20.3125 18.4219L24.0312 15.1875C24.9688 14.375 24.9688 13.5469 24.0312 12.7344L20.3125 9.51562C19.4531 8.76562 18.3125 9.25 18.3125 10.25V12.7031H14.1875C11.1562 12.7031 9.70312 14.1562 9.70312 17.1719V21.6406Z" fill={colors.yellow} /></Svg>,
	passFilled: <Svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M16.5 32.6562C25.2188 32.6562 32.4375 25.4219 32.4375 16.7188C32.4375 8 25.2031 0.78125 16.4844 0.78125C7.78125 0.78125 0.5625 8 0.5625 16.7188C0.5625 25.4219 7.79688 32.6562 16.5 32.6562ZM9.5 21.2969V17.1875C9.5 14.0625 11 12.5625 14.125 12.5625H18.5625V10.5C18.5625 9.45312 19.6562 9 20.4688 9.64062L24.2812 12.5938C25.2812 13.3906 25.2812 14.3438 24.2812 15.1406L20.4688 18.1094C19.6562 18.75 18.5625 18.2969 18.5625 17.25V15.1719H14.1719C12.7969 15.1719 12.0938 15.8594 12.0938 17.3125V21.2969C12.0938 22.2188 11.6094 22.7344 10.7969 22.75C9.96875 22.7656 9.5 22.2188 9.5 21.2969Z" fill={colors.yellow} /></Svg>,
	dealerIcon: <Svg opacity="1" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><Circle cx="24" cy="24" r="23.5" stroke={colors.white} fill={colors.translucent} /><Path d="M37.4158 13.1625L35.5175 12.3692V25.1617L38.96 16.86C39.5408 15.415 38.875 13.7575 37.4158 13.1625V13.1625ZM9.79083 18.4042L16.8175 35.3333C17.0244 35.8484 17.3773 36.2918 17.8329 36.6089C18.2885 36.926 18.8268 37.1031 19.3817 37.1183C19.75 37.1183 20.1325 37.0475 20.5008 36.8917L30.9417 32.5708C32.0042 32.1317 32.6558 31.0833 32.6842 30.035C32.6983 29.6667 32.6275 29.2558 32.5 28.8875L25.4167 11.9583C25.2164 11.4399 24.8648 10.9937 24.4074 10.6778C23.9501 10.362 23.4083 10.1911 22.8525 10.1875C22.4842 10.1875 22.1158 10.2725 21.7617 10.4L11.335 14.7208C10.6419 15.0047 10.0899 15.5521 9.80034 16.2428C9.51078 16.9335 9.50736 17.7109 9.79083 18.4042V18.4042ZM32.67 13.0208C32.67 12.2694 32.3715 11.5487 31.8401 11.0174C31.3088 10.486 30.5881 10.1875 29.8367 10.1875H27.7825L32.67 22.0025" fill={colors.green} /></Svg>,
	upOutlined: <Svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M5.01562 29.125H23.9688C27.25 29.125 28.875 27.5 28.875 24.2812V5.20312C28.875 1.98438 27.25 0.359375 23.9688 0.359375H5.01562C1.75 0.359375 0.109375 1.96875 0.109375 5.20312V24.2812C0.109375 27.5156 1.75 29.125 5.01562 29.125ZM5.04688 26.6094C3.48438 26.6094 2.625 25.7812 2.625 24.1562V5.32812C2.625 3.70312 3.48438 2.875 5.04688 2.875H23.9375C25.4844 2.875 26.3594 3.70312 26.3594 5.32812V24.1562C26.3594 25.7812 25.4844 26.6094 23.9375 26.6094H5.04688ZM14.5156 22.5312C15.2031 22.5312 15.6875 22.0469 15.6875 21.3594V13.5469L15.5625 10.2344L17.1562 12.125L19 14C19.2031 14.2188 19.4844 14.3438 19.8281 14.3438C20.4688 14.3438 20.9688 13.8438 20.9688 13.2188C20.9688 12.8906 20.8594 12.6094 20.6406 12.4062L15.4375 7.20312C15.1406 6.90625 14.875 6.76562 14.5156 6.76562C14.1875 6.76562 13.9219 6.89062 13.6094 7.20312L8.39062 12.4062C8.1875 12.6094 8.09375 12.8906 8.09375 13.2188C8.09375 13.8438 8.57812 14.3438 9.21875 14.3438C9.5625 14.3438 9.84375 14.2031 10.0469 14L11.9062 12.125L13.4688 10.25L13.3438 13.5469V21.3594C13.3438 22.0469 13.8438 22.5312 14.5156 22.5312Z" fill={colors.green} /></Svg>,
	upFilled: <Svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M5.01562 29.125H23.9688C27.25 29.125 28.875 27.5 28.875 24.2812V5.20312C28.875 1.98438 27.25 0.359375 23.9688 0.359375H5.01562C1.75 0.359375 0.109375 1.96875 0.109375 5.20312V24.2812C0.109375 27.5156 1.75 29.125 5.01562 29.125ZM14.5156 22.7812C13.8125 22.7812 13.2969 22.2812 13.2969 21.5625V13.5469L13.4375 10.125L11.8281 12.0625L9.92188 13.9844C9.70312 14.2031 9.40625 14.3438 9.0625 14.3438C8.39062 14.3438 7.89062 13.8281 7.89062 13.1719C7.89062 12.8281 7.98438 12.5469 8.20312 12.3281L13.5781 6.96875C13.9062 6.64062 14.1719 6.51562 14.5156 6.51562C14.8906 6.51562 15.1562 6.65625 15.4688 6.96875L20.8281 12.3281C21.0625 12.5469 21.1719 12.8281 21.1719 13.1719C21.1719 13.8281 20.6562 14.3438 19.9844 14.3438C19.6406 14.3438 19.3438 14.2188 19.125 13.9844L17.2344 12.0625L15.5938 10.1094L15.7344 13.5469V21.5625C15.7344 22.2812 15.2344 22.7812 14.5156 22.7812Z" fill={colors.green} /></Svg>,
	okOutlined: <Svg width="33" height="36" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M0 24.4844C0 29.7344 3.40625 34.125 7.54688 34.125H12.7188C14.7656 35.2031 17.2656 35.8594 20.0625 35.8594H22.2188C24.1719 35.8594 25.8594 35.7344 26.9688 35.4688C29.1406 34.9375 30.4844 33.4375 30.4844 31.5156C30.4844 31.125 30.4219 30.75 30.2969 30.3906C31.375 29.5938 31.9844 28.4062 31.9844 27.1094C31.9844 26.4688 31.875 25.8438 31.625 25.3281C32.3594 24.5938 32.7812 23.5156 32.7812 22.375C32.7812 21.6406 32.5938 20.8594 32.2656 20.2969C32.7188 19.6562 32.9844 18.7969 32.9844 17.8438C32.9844 15.5156 31.1562 13.6719 28.8438 13.6719H22.9219C22.5469 13.6719 22.2969 13.5 22.2969 13.1875C22.2969 11.4844 24.9688 7.53125 24.9688 4.35938C24.9688 2.20312 23.4531 0.640625 21.375 0.640625C19.8438 0.640625 18.8281 1.4375 17.8125 3.375C15.9062 7.01562 13.6406 10.2656 9.9375 14.7969H6.95312C3.10938 14.7969 0 19.1562 0 24.4844ZM9.07812 24.4062C9.07812 21.0312 9.84375 18.875 11.9688 16.0312C14.3125 12.8906 17.5625 9.125 19.9219 4.45312C20.5 3.26562 20.9062 3 21.4688 3C22.1406 3 22.6094 3.48438 22.6094 4.35938C22.6094 6.89062 19.9375 10.7344 19.9375 13.1875C19.9375 14.9531 21.4062 16.0312 23.2656 16.0312H28.8438C29.8594 16.0312 30.625 16.8125 30.625 17.8438C30.625 18.5938 30.3906 19.0781 29.7656 19.6719C29.4844 19.9375 29.4531 20.25 29.6875 20.5469C30.2031 21.2969 30.4219 21.7656 30.4219 22.375C30.4219 23.125 30.0781 23.75 29.3594 24.2969C28.9688 24.5781 28.8125 24.9844 29.0469 25.4688C29.4375 26.2031 29.625 26.5469 29.625 27.1094C29.625 27.9531 29.0938 28.5938 27.9688 29.1719C27.6094 29.375 27.5312 29.6719 27.6719 30.0156C28.0625 30.9688 28.125 31.125 28.125 31.5156C28.125 32.2812 27.5625 32.8906 26.4062 33.1719C25.4844 33.4062 24.0156 33.5156 22.2344 33.5L20.0781 33.4688C13.5312 33.4062 9.07812 29.7188 9.07812 24.4062ZM2.35938 24.4844C2.35938 20.4531 4.54688 17.1562 6.95312 17.1562H8.40625C7.23438 19.3438 6.71875 21.625 6.71875 24.3594C6.71875 27.2969 7.78125 29.8281 9.67188 31.7656H7.54688C4.78125 31.7656 2.35938 28.4375 2.35938 24.4844Z" fill={colors.green} /></Svg>,
	okFilled: <Svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M8.42188 23.3594C8.32812 29.2656 13.125 33.75 20.6406 33.8125L22.8594 33.8281C24.9531 33.8438 26.5 33.6875 27.375 33.4531C28.6406 33.125 29.875 32.3594 29.875 30.8281C29.875 30.2031 29.7188 29.7656 29.5 29.4062C29.375 29.2031 29.3906 29.0312 29.5938 28.9531C30.5938 28.5469 31.4375 27.6094 31.4375 26.3125C31.4375 25.5938 31.2188 24.9375 30.875 24.4844C30.6875 24.25 30.7188 24.0469 31 23.8594C31.7344 23.4375 32.2344 22.5312 32.2344 21.4688C32.2344 20.7344 32 19.9219 31.5625 19.5312C31.3125 19.2969 31.3594 19.1406 31.625 18.9062C32.1406 18.4844 32.4531 17.7344 32.4531 16.8281C32.4531 15.2656 31.2344 14 29.6406 14H23.9375C22.4844 14 21.5312 13.25 21.5312 12.0625C21.5312 9.875 24.2344 5.90625 24.2344 3.04688C24.2344 1.54688 23.2656 0.65625 22 0.65625C20.8438 0.65625 20.2656 1.45312 19.6406 2.67188C17.25 7.35938 14.0312 11.1562 11.5781 14.4062C9.5 17.1719 8.48438 19.5312 8.42188 23.3594ZM0.546875 23.4688C0.546875 28.2656 3.54688 32.2812 7.54688 32.2812H10.4062C7.5 30.1719 6.1875 26.9688 6.25 23.3125C6.3125 19.25 7.875 16.3594 9.29688 14.5938H6.95312C3.32812 14.5938 0.546875 18.5 0.546875 23.4688Z" fill={colors.green} /></Svg>,
	downArrow: <Svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M10.9346 1.32031C10.9346 0.814453 10.5449 0.5 9.9502 0.5L1.03613 0.493164C0.441406 0.493164 0.0585938 0.807617 0.0585938 1.31348C0.0585938 1.58691 0.181641 1.8125 0.318359 2.09961L4.58398 10.8838C4.87109 11.4648 5.13086 11.6494 5.49316 11.6494C5.85547 11.6494 6.12207 11.4648 6.40918 10.8838L10.668 2.09961C10.8115 1.81934 10.9346 1.59375 10.9346 1.32031Z" fill={colors.white} /></Svg>,
	toggleOn: <Svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M16.5 32.6562C25.2188 32.6562 32.4375 25.4219 32.4375 16.7188C32.4375 8 25.2031 0.78125 16.4844 0.78125C7.78125 0.78125 0.5625 8 0.5625 16.7188C0.5625 25.4219 7.79688 32.6562 16.5 32.6562ZM16.5 30C9.125 30 3.23438 24.0938 3.23438 16.7188C3.23438 9.34375 9.10938 3.4375 16.4844 3.4375C23.8594 3.4375 29.7656 9.34375 29.7812 16.7188C29.7969 24.0938 23.875 30 16.5 30ZM14.7812 24.1406C15.2969 24.1406 15.7344 23.8906 16.0469 23.4062L23.1875 12.1719C23.3594 11.8594 23.5625 11.5156 23.5625 11.1719C23.5625 10.4688 22.9375 10.0156 22.2812 10.0156C21.8906 10.0156 21.5 10.2656 21.2031 10.7188L14.7188 21.125L11.6406 17.1406C11.2656 16.6406 10.9219 16.5156 10.4844 16.5156C9.8125 16.5156 9.28125 17.0625 9.28125 17.75C9.28125 18.0938 9.42188 18.4219 9.64062 18.7188L13.4531 23.4062C13.8438 23.9219 14.2656 24.1406 14.7812 24.1406Z" fill={colors.green} /></Svg>,
	toggleOff: <Svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M16.5 32.6562C25.2188 32.6562 32.4375 25.4219 32.4375 16.7188C32.4375 8 25.2031 0.78125 16.4844 0.78125C7.78125 0.78125 0.5625 8 0.5625 16.7188C0.5625 25.4219 7.79688 32.6562 16.5 32.6562ZM16.5 30C9.125 30 3.23438 24.0938 3.23438 16.7188C3.23438 9.34375 9.10938 3.4375 16.4844 3.4375C23.8594 3.4375 29.7656 9.34375 29.7812 16.7188C29.7969 24.0938 23.875 30 16.5 30Z" fill={colors.white} /></Svg>,
	settingsLarge: <Svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M31.2951 69H37.7049C40.4385 69 42.6066 67.3017 43.235 64.6914L44.4604 59.3765L45.1516 59.1249L49.7705 61.9553C52.0956 63.402 54.8292 63.0246 56.7459 61.0747L61.1762 56.6718C63.1243 54.6905 63.4699 51.9859 62.0246 49.6901L59.1653 45.0984L59.4167 44.438L64.6954 43.18C67.3033 42.551 69 40.381 69 37.6449V31.4809C69 28.7762 67.3033 26.5747 64.6954 25.9458L59.4481 24.6563L59.1967 23.9644L62.056 19.3728C63.5014 17.1085 63.1557 14.4038 61.1762 12.3596L56.7773 7.9567C54.8607 6.03829 52.1271 5.66089 49.8333 7.07612L45.1831 9.90656L44.4604 9.65497L43.235 4.30857C42.6066 1.69827 40.4385 0 37.7049 0H31.2951C28.5615 0 26.3934 1.69827 25.765 4.30857L24.5396 9.65497L23.7855 9.90656L19.1667 7.07612C16.873 5.66089 14.1393 6.03829 12.2227 7.9567L7.79235 12.3596C5.84426 14.4038 5.49863 17.1085 6.94399 19.3728L9.80328 23.9644L9.55191 24.6563L4.30464 25.9458C1.6653 26.6062 0 28.7762 0 31.4809V37.6449C0 40.381 1.69672 42.551 4.30464 43.18L9.58333 44.438L9.8347 45.0984L6.97541 49.6901C5.53005 51.9859 5.87568 54.6905 7.82377 56.6718L12.2541 61.0747C14.1708 63.0246 16.9044 63.402 19.1981 61.9553L23.8484 59.1249L24.5396 59.3765L25.765 64.6914C26.3934 67.3017 28.5615 69 31.2951 69ZM32.3005 62.7101C31.7664 62.7101 31.515 62.4585 31.4208 62.0182L29.5984 54.3131C27.5246 53.8414 25.5451 53.0237 23.8798 51.923L17.1243 56.1057C16.7473 56.3573 16.3702 56.3259 15.9932 55.9799L12.9139 52.8979C12.5683 52.552 12.5683 52.1746 12.8197 51.7972L16.9986 45.0356C16.0246 43.4002 15.1448 41.4503 14.7049 39.4061L6.97541 37.582C6.53552 37.4877 6.28415 37.2361 6.28415 36.7015V32.3929C6.28415 31.8582 6.5041 31.6381 6.97541 31.5123L14.6735 29.6882C15.1448 27.5811 16.0874 25.5369 16.9358 24.0273L12.7883 17.2972C12.5369 16.8569 12.5055 16.5109 12.8825 16.1335L15.9617 13.1144C16.3388 12.737 16.6844 12.7056 17.1243 12.9572L23.8484 17.077C25.3251 16.1335 27.4932 15.2215 29.5984 14.6869L31.4208 6.98177C31.515 6.54148 31.7664 6.28988 32.3005 6.28988H36.6995C37.2336 6.28988 37.485 6.54148 37.5792 6.98177L39.4331 14.7498C41.5383 15.2215 43.4863 16.1021 45.1202 17.077L51.8443 12.9886C52.2842 12.737 52.6298 12.7685 53.0068 13.1144L56.0861 16.165C56.4631 16.5109 56.4317 16.8883 56.1803 17.2972L52.0642 24.0273C52.9126 25.5369 53.8552 27.5811 54.2951 29.6882L62.0246 31.5123C62.4959 31.6381 62.7158 31.8582 62.7158 32.3929V36.7015C62.7158 37.2361 62.4645 37.4877 62.0246 37.582L54.2951 39.4061C53.8238 41.4503 52.9754 43.4316 52.0014 45.0356L56.1489 51.7657C56.4003 52.1746 56.4003 52.5205 56.0546 52.8665L52.9754 55.9485C52.5984 56.3259 52.2213 56.3259 51.8443 56.0743L45.1202 51.923C43.4235 53.0237 41.6011 53.8099 39.4331 54.3131L37.5792 62.0182C37.485 62.49 37.2336 62.7101 36.6995 62.7101H32.3005Z" fill={colors.white} /><Path d="M44.8868 25.8112L43.3386 25.1661V35.5683L46.1462 28.8178C46.6199 27.6428 46.0769 26.295 44.8868 25.8112ZM22.357 30.0735L28.0876 43.8394C28.2564 44.2583 28.5442 44.6188 28.9158 44.8767C29.2873 45.1346 29.7264 45.2785 30.1789 45.2909C30.4793 45.2909 30.7912 45.2333 31.0916 45.1066L39.6068 41.5931C40.4733 41.236 41.0048 40.3836 41.0279 39.5311C41.0394 39.2316 40.9817 38.8975 40.8777 38.598L35.1008 24.832C34.9375 24.4104 34.6507 24.0476 34.2777 23.7908C33.9047 23.534 33.4628 23.395 33.0096 23.3921C32.7092 23.3921 32.4088 23.4612 32.1199 23.5649L23.6163 27.0784C23.0511 27.3091 22.6009 27.7543 22.3647 28.316C22.1286 28.8776 22.1258 29.5098 22.357 30.0735ZM41.0163 25.696C41.0163 25.085 40.7729 24.4989 40.3395 24.0669C39.9062 23.6348 39.3184 23.3921 38.7056 23.3921H37.0303L41.0163 32.9995" fill={colors.white} /></Svg>,
	settingsMedium: <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M14.5137 32H17.4863C18.7541 32 19.7596 31.2124 20.051 30.0018L20.6193 27.5369L20.9399 27.4202L23.082 28.7329C24.1603 29.4038 25.4281 29.2288 26.3169 28.3245L28.3716 26.2826C29.275 25.3637 29.4353 24.1094 28.765 23.0447L27.439 20.9152L27.5556 20.6089L30.0036 20.0255C31.2131 19.7338 32 18.7274 32 17.4585V14.5998C32 13.3455 31.2131 12.3245 30.0036 12.0328L27.5701 11.4348L27.4536 11.1139L28.7796 8.9845C29.4499 7.93437 29.2896 6.68004 28.3716 5.732L26.3315 3.69006C25.4426 2.80036 24.1749 2.62534 23.1111 3.28168L20.9545 4.59435L20.6193 4.47767L20.051 1.99818C19.7596 0.787603 18.7541 0 17.4863 0H14.5137C13.2459 0 12.2404 0.787603 11.949 1.99818L11.3807 4.47767L11.031 4.59435L8.88889 3.28168C7.82514 2.62534 6.55738 2.80036 5.66849 3.69006L3.61384 5.732C2.71038 6.68004 2.55009 7.93437 3.2204 8.9845L4.54645 11.1139L4.42987 11.4348L1.99636 12.0328C0.772313 12.3391 0 13.3455 0 14.5998V17.4585C0 18.7274 0.786885 19.7338 1.99636 20.0255L4.44444 20.6089L4.56102 20.9152L3.23497 23.0447C2.56466 24.1094 2.72495 25.3637 3.62842 26.2826L5.68306 28.3245C6.57195 29.2288 7.83971 29.4038 8.90346 28.7329L11.0601 27.4202L11.3807 27.5369L11.949 30.0018C12.2404 31.2124 13.2459 32 14.5137 32ZM14.98 29.083C14.7322 29.083 14.6157 28.9663 14.5719 28.7621L13.7268 25.1887C12.765 24.9699 11.847 24.5907 11.0747 24.0802L7.94171 26.0201C7.76685 26.1367 7.59199 26.1222 7.41712 25.9617L5.98907 24.5324C5.82878 24.3719 5.82878 24.1969 5.94536 24.0219L7.88342 20.8861C7.43169 20.1276 7.02368 19.2233 6.81967 18.2753L3.23497 17.4294C3.03097 17.3856 2.91439 17.2689 2.91439 17.021V15.0228C2.91439 14.7748 3.01639 14.6727 3.23497 14.6144L6.8051 13.7685C7.02368 12.7912 7.46084 11.8432 7.85428 11.1431L5.93078 8.02188C5.81421 7.81768 5.79964 7.65725 5.9745 7.48222L7.40255 6.08204C7.57741 5.90702 7.7377 5.89243 7.94171 6.00912L11.0601 7.91978C11.745 7.48222 12.7505 7.05925 13.7268 6.8113L14.5719 3.23792C14.6157 3.03373 14.7322 2.91705 14.98 2.91705H17.02C17.2678 2.91705 17.3843 3.03373 17.4281 3.23792L18.2878 6.84047C19.2641 7.05925 20.1676 7.46764 20.9253 7.91978L24.0437 6.0237C24.2477 5.90702 24.408 5.9216 24.5829 6.08204L26.0109 7.49681C26.1858 7.65725 26.1712 7.83227 26.0546 8.02188L24.1457 11.1431C24.5392 11.8432 24.9763 12.7912 25.1803 13.7685L28.765 14.6144C28.9836 14.6727 29.0856 14.7748 29.0856 15.0228V17.021C29.0856 17.2689 28.969 17.3856 28.765 17.4294L25.1803 18.2753C24.9617 19.2233 24.5683 20.1422 24.1166 20.8861L26.0401 24.0073C26.1566 24.1969 26.1566 24.3573 25.9964 24.5178L24.5683 25.9471C24.3934 26.1222 24.2186 26.1222 24.0437 26.0055L20.9253 24.0802C20.1384 24.5907 19.2933 24.9553 18.2878 25.1887L17.4281 28.7621C17.3843 28.9809 17.2678 29.083 17.02 29.083H14.98Z" fill={colors.white} /><Path d="M20.8171 11.9704L20.0991 11.6712V16.4955L21.4011 13.3648C21.6208 12.8199 21.369 12.1948 20.8171 11.9704ZM10.3685 13.9471L13.0262 20.3313C13.1044 20.5256 13.2379 20.6928 13.4102 20.8124C13.5825 20.932 13.7861 20.9987 13.996 21.0045C14.1353 21.0045 14.28 20.9778 14.4193 20.919L18.3684 19.2896C18.7702 19.1239 19.0167 18.7286 19.0274 18.3333C19.0328 18.1944 19.006 18.0394 18.9578 17.9005L16.2786 11.5163C16.2029 11.3208 16.0699 11.1525 15.8969 11.0334C15.7239 10.9143 15.519 10.8499 15.3088 10.8485C15.1695 10.8485 15.0301 10.8806 14.8962 10.9286L10.9525 12.5581C10.6904 12.6651 10.4816 12.8716 10.372 13.132C10.2625 13.3925 10.2612 13.6857 10.3685 13.9471ZM19.0221 11.917C19.0221 11.6336 18.9092 11.3618 18.7082 11.1614C18.5072 10.9611 18.2346 10.8485 17.9504 10.8485H17.1735L19.0221 15.3041" fill={colors.white} /></Svg>,
	settingsSmall: <Svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M10.4317 23H12.5683C13.4795 23 14.2022 22.4339 14.4117 21.5638L14.8201 19.7922L15.0505 19.7083L16.5902 20.6518C17.3652 21.134 18.2764 21.0082 18.9153 20.3582L20.3921 18.8906C21.0414 18.2302 21.1566 17.3286 20.6749 16.5634L19.7218 15.0328L19.8056 14.8127L21.5651 14.3933C22.4344 14.1837 23 13.4603 23 12.5483V10.4936C23 9.59207 22.4344 8.85825 21.5651 8.64859L19.816 8.21878L19.7322 7.98815L20.6853 6.45761C21.1671 5.70283 21.0519 4.80128 20.3921 4.11987L18.9258 2.65223C18.2869 2.01276 17.3757 1.88696 16.6111 2.35871L15.061 3.30219L14.8201 3.21832L14.4117 1.43619C14.2022 0.566089 13.4795 0 12.5683 0H10.4317C9.52049 0 8.79781 0.566089 8.58834 1.43619L8.17987 3.21832L7.92851 3.30219L6.38889 2.35871C5.62432 1.88696 4.71311 2.01276 4.07423 2.65223L2.59745 4.11987C1.94809 4.80128 1.83288 5.70283 2.31466 6.45761L3.26776 7.98815L3.18397 8.21878L1.43488 8.64859C0.5551 8.86873 0 9.59207 0 10.4936V12.5483C0 13.4603 0.565574 14.1837 1.43488 14.3933L3.19444 14.8127L3.27823 15.0328L2.32514 16.5634C1.84335 17.3286 1.95856 18.2302 2.60792 18.8906L4.0847 20.3582C4.72359 21.0082 5.63479 21.134 6.39936 20.6518L7.94945 19.7083L8.17987 19.7922L8.58834 21.5638C8.79781 22.4339 9.52049 23 10.4317 23ZM10.7668 20.9034C10.5888 20.9034 10.505 20.8195 10.4736 20.6727L9.86612 18.1044C9.17486 17.9471 8.51503 17.6746 7.95993 17.3077L5.70811 18.7019C5.58242 18.7858 5.45674 18.7753 5.33106 18.66L4.30464 17.6326C4.18944 17.5173 4.18944 17.3915 4.27322 17.2657L5.66621 15.0119C5.34153 14.4667 5.04827 13.8168 4.90164 13.1354L2.32514 12.5273C2.17851 12.4959 2.09472 12.412 2.09472 12.2338V10.7976C2.09472 10.6194 2.16803 10.546 2.32514 10.5041L4.89117 9.89608C5.04827 9.19371 5.36248 8.51231 5.64526 8.00912L4.26275 5.76572C4.17896 5.61896 4.16849 5.50365 4.29417 5.37785L5.32058 4.37147C5.44627 4.24567 5.56148 4.23519 5.70811 4.31905L7.94945 5.69234C8.44171 5.37785 9.16439 5.07384 9.86612 4.89562L10.4736 2.32726C10.505 2.18049 10.5888 2.09663 10.7668 2.09663H12.2332C12.4112 2.09663 12.495 2.18049 12.5264 2.32726L13.1444 4.91659C13.8461 5.07384 14.4954 5.36737 15.0401 5.69234L17.2814 4.32954C17.4281 4.24567 17.5433 4.25615 17.6689 4.37147L18.6954 5.38833C18.821 5.50365 18.8106 5.62944 18.7268 5.76572L17.3547 8.00912C17.6375 8.51231 17.9517 9.19371 18.0984 9.89608L20.6749 10.5041C20.832 10.546 20.9053 10.6194 20.9053 10.7976V12.2338C20.9053 12.412 20.8215 12.4959 20.6749 12.5273L18.0984 13.1354C17.9413 13.8168 17.6585 14.4772 17.3338 15.0119L18.7163 17.2552C18.8001 17.3915 18.8001 17.5068 18.6849 17.6222L17.6585 18.6495C17.5328 18.7753 17.4071 18.7753 17.2814 18.6914L15.0401 17.3077C14.4745 17.6746 13.867 17.9366 13.1444 18.1044L12.5264 20.6727C12.495 20.83 12.4112 20.9034 12.2332 20.9034H10.7668Z" fill={colors.white} /><Path d="M14.9623 8.60373L14.4462 8.3887V11.8561L15.3821 9.60594C15.54 9.21427 15.359 8.76501 14.9623 8.60373ZM7.45232 10.0245L9.36255 14.6131C9.4188 14.7528 9.51475 14.8729 9.63859 14.9589C9.76244 15.0449 9.90878 15.0928 10.0596 15.097C10.1598 15.097 10.2637 15.0778 10.3639 15.0355L13.2023 13.8644C13.4911 13.7453 13.6683 13.4612 13.676 13.177C13.6798 13.0772 13.6606 12.9658 13.6259 12.866L11.7003 8.27734C11.6458 8.13681 11.5502 8.01587 11.4259 7.93026C11.3016 7.84465 11.1543 7.79834 11.0032 7.79736C10.9031 7.79736 10.8029 7.8204 10.7066 7.85495L7.87211 9.02612C7.68369 9.10305 7.53363 9.25143 7.45491 9.43865C7.37619 9.62587 7.37526 9.83659 7.45232 10.0245ZM13.6721 8.56533C13.6721 8.36165 13.591 8.16632 13.4465 8.02229C13.3021 7.87827 13.1061 7.79736 12.9019 7.79736H12.3434L13.6721 10.9998" fill={colors.white} /></Svg>,
	info: <Svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M34.5 69C53.3735 69 69 53.3397 69 34.5C69 15.6265 53.3397 0 34.4662 0C15.6265 0 0 15.6265 0 34.5C0 53.3397 15.6603 69 34.5 69ZM34.5 63.25C18.5353 63.25 5.78382 50.4647 5.78382 34.5C5.78382 18.5353 18.5015 5.75 34.4662 5.75C50.4309 5.75 63.2162 18.5353 63.25 34.5C63.2838 50.4647 50.4647 63.25 34.5 63.25ZM34.1956 22.4588C36.6647 22.4588 38.5926 20.4971 38.5926 18.0279C38.5926 15.5588 36.6647 13.5971 34.1956 13.5971C31.7603 13.5971 29.7985 15.5588 29.7985 18.0279C29.7985 20.4971 31.7603 22.4588 34.1956 22.4588ZM28.5809 53.1029H42.3471C43.7338 53.1029 44.8162 52.0882 44.8162 50.7015C44.8162 49.3824 43.7338 48.3338 42.3471 48.3338H38.1529V31.1176C38.1529 29.2912 37.2397 28.0735 35.5147 28.0735H29.1559C27.7691 28.0735 26.6868 29.1221 26.6868 30.4412C26.6868 31.8279 27.7691 32.8426 29.1559 32.8426H32.775V48.3338H28.5809C27.1941 48.3338 26.1118 49.3824 26.1118 50.7015C26.1118 52.0882 27.1941 53.1029 28.5809 53.1029Z" fill={colors.white} /></Svg>,
	help: <Svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M16 32.6562C24.7188 32.6562 31.9375 25.4219 31.9375 16.7188C31.9375 8 24.7031 0.78125 15.9844 0.78125C7.28125 0.78125 0.0625 8 0.0625 16.7188C0.0625 25.4219 7.29688 32.6562 16 32.6562ZM16 30C8.625 30 2.73438 24.0938 2.73438 16.7188C2.73438 9.34375 8.60938 3.4375 15.9844 3.4375C23.3594 3.4375 29.2656 9.34375 29.2812 16.7188C29.2969 24.0938 23.375 30 16 30ZM15.6719 19.9531C16.4531 19.9531 16.9375 19.4531 16.9375 18.8438V18.6562C16.9375 17.7812 17.4375 17.2188 18.5312 16.5C20.0469 15.5 21.125 14.5938 21.125 12.7188C21.125 10.125 18.8125 8.71875 16.1562 8.71875C13.4688 8.71875 11.7031 10 11.2812 11.4375C11.2031 11.6875 11.1562 11.9375 11.1562 12.2031C11.1562 12.9062 11.7031 13.2812 12.2188 13.2812C12.75 13.2812 13.0938 13.0312 13.375 12.6562L13.6562 12.2812C14.2031 11.375 15.0156 10.8438 16.0625 10.8438C17.4844 10.8438 18.4062 11.6562 18.4062 12.8438C18.4062 13.9062 17.75 14.4219 16.3906 15.375C15.2656 16.1562 14.4219 16.9844 14.4219 18.5156V18.7188C14.4219 19.5312 14.875 19.9531 15.6719 19.9531ZM15.6406 24.6094C16.5469 24.6094 17.3281 23.8906 17.3281 22.9844C17.3281 22.0781 16.5625 21.3594 15.6406 21.3594C14.7188 21.3594 13.9531 22.0938 13.9531 22.9844C13.9531 23.875 14.7344 24.6094 15.6406 24.6094Z" fill={colors.white} /></Svg>,
	helpLarge: <Svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M34.5 69C53.3735 69 69 53.3397 69 34.5C69 15.6265 53.3397 0 34.4662 0C15.6265 0 0 15.6265 0 34.5C0 53.3397 15.6603 69 34.5 69ZM34.5 63.25C18.5353 63.25 5.78382 50.4647 5.78382 34.5C5.78382 18.5353 18.5015 5.75 34.4662 5.75C50.4309 5.75 63.2162 18.5353 63.25 34.5C63.2838 50.4647 50.4647 63.25 34.5 63.25ZM33.7897 41.5015C35.4809 41.5015 36.5294 40.4191 36.5294 39.1V38.6941C36.5294 36.8 37.6118 35.5824 39.9794 34.0265C43.2603 31.8618 45.5941 29.9 45.5941 25.8412C45.5941 20.2265 40.5882 17.1824 34.8382 17.1824C29.0206 17.1824 25.1985 19.9559 24.2853 23.0676C24.1162 23.6088 24.0147 24.15 24.0147 24.725C24.0147 26.2471 25.1985 27.0588 26.3147 27.0588C27.4647 27.0588 28.2088 26.5176 28.8176 25.7059L29.4265 24.8941C30.6103 22.9324 32.3691 21.7824 34.6353 21.7824C37.7132 21.7824 39.7088 23.5412 39.7088 26.1118C39.7088 28.4118 38.2882 29.5279 35.3456 31.5912C32.9103 33.2824 31.0838 35.075 31.0838 38.3897V38.8294C31.0838 40.5882 32.0647 41.5015 33.7897 41.5015ZM33.7221 51.5809C35.6838 51.5809 37.375 50.025 37.375 48.0632C37.375 46.1015 35.7176 44.5456 33.7221 44.5456C31.7265 44.5456 30.0691 46.1353 30.0691 48.0632C30.0691 49.9912 31.7603 51.5809 33.7221 51.5809Z" fill={colors.white} /></Svg>,
	share: <Svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M13.4924 20.8985C14.1465 20.8985 14.7093 20.3881 14.7093 19.7926V5.23172L14.618 3.10501L15.6372 4.11165L17.9493 6.40851C18.1623 6.63536 18.4665 6.74878 18.7707 6.74878C19.3944 6.74878 19.8811 6.32344 19.8811 5.74214C19.8811 5.4444 19.7442 5.21755 19.5161 5.00487L14.3746 0.382809C14.0704 0.0992468 13.8118 0 13.4924 0C13.1882 0 12.9296 0.0992468 12.6101 0.382809L7.46873 5.00487C7.24056 5.21755 7.11887 5.4444 7.11887 5.74214C7.11887 6.32344 7.57521 6.74878 8.21408 6.74878C8.5031 6.74878 8.83775 6.63536 9.0507 6.40851L11.3476 4.11165L12.382 3.10501L12.2907 5.23172V19.7926C12.2907 20.3881 12.8383 20.8985 13.4924 20.8985ZM4.77634 32H22.2237C25.4028 32 27 30.5255 27 27.6048V13.455C27 10.5343 25.4028 9.05981 22.2237 9.05981H17.9797V11.3425H22.178C23.6839 11.3425 24.551 12.1081 24.551 13.5826V27.4772C24.551 28.9517 23.6839 29.7173 22.178 29.7173H4.80676C3.28563 29.7173 2.44901 28.9517 2.44901 27.4772V13.5826C2.44901 12.1081 3.28563 11.3425 4.80676 11.3425H9.02028V9.05981H4.77634C1.59718 9.05981 0 10.5343 0 13.455V27.6048C0 30.5255 1.59718 32 4.77634 32Z" fill={colors.white} /></Svg>
}