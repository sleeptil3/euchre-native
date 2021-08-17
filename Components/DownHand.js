import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../GameContext";
import { colors, iconSVGs, styles } from '../CoreElements/theme';
import { View, Image, StyleSheet } from "react-native";
import { Flex } from "../CoreElements/containerStyles";

export default function DownHand({ position, handLength }) {
	const [image, setImage] = useState(0);
	const { currentPlayer, turnCount, matchStage, goAlone, dealer } = useContext(DataContext)

	const imageURLS = [require("../assets/cards/down0.png"), require("../assets/cards/down1.png"), require("../assets/cards/down2.png"), require("../assets/cards/down3.png"), require("../assets/cards/down4.png"), require("../assets/cards/down5.png")]

	useEffect(() => {
		setImage(imageURLS[handLength]);
	}, [handLength]);

	const scale = 1.3

	return (
		<View style={handStyles[position]} >
			{position === dealer && iconSVGs.dealerIcon}
			<Image source={image} style={{ height: 83 / scale, width: 303 / scale }} />
		</View>
	)
}

// <img className={`${goAlone !== null && (goAlone + 2) % 4 === position ? "opacity-20" : ""}`} src={image} alt={`Face down stack of ${handLength} cards`} />
// (currentPlayer === position && turnCount !== 4 && (matchStage === "PLAY" || matchStage === "CALL" || matchStage === "PICK")) && <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">{spinner}</div>

// const styles = [
// 	"hidden",
// 	"absolute left-28 top-40 transform rotate-90 flex justify-center items-center",
// 	"absolute top-3 left-1/2 transform -translate-x-1/2 rotate-180 flex justify-center items-center",
// 	"absolute right-28 top-40 transform -rotate-90 flex justify-center items-center",
// 	"absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
// ];

const handStyles = [
	null,
	{
		position: "absolute",
		left: -85,
		top: 200,
		transform: [{ rotate: '90deg' }],
	},
	{
		position: "absolute",
		top: -20,
		right: 80,
		transform: [{ rotate: '180deg' }],
	},
	{
		position: "absolute",
		right: -85,
		top: 200,
		transform: [{ rotate: '270deg' }],
	},
]