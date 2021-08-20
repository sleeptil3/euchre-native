import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../GameContext";
import { iconSVGs } from '../CoreElements/theme';
import { View, Image } from "react-native";

export default function DownHand({ position, handLength }) {
	const [image, setImage] = useState(0);
	const { currentPlayer, turnCount, matchStage, goAlone, dealer } = useContext(DataContext)

	const imageURLS = [require("../assets/cards/down0.png"), require("../assets/cards/down1.png"), require("../assets/cards/down2.png"), require("../assets/cards/down3.png"), require("../assets/cards/down4.png"), require("../assets/cards/down5.png")]

	const handStyles = [
		null,
		{
			left: -80,
			transform: [{ rotate: '90deg' }],
			opacity: goAlone !== null && ((goAlone + 2) % 4) === position ? 0 : 1
		},
		{
			top: -25,
			transform: [{ rotate: '180deg' }],
			opacity: goAlone !== null && ((goAlone + 2) % 4) === position ? 0 : 1
		},
		{
			right: -38,
			transform: [{ rotate: '270deg' }],
			opacity: goAlone !== null && ((goAlone + 2) % 4) === position ? 0 : 1
		},
	]

	const scale = 1.4

	useEffect(() => {
		setImage(imageURLS[handLength]);
	}, [handLength]);

	return (
		<View style={handStyles[position]}>
			<Image source={image} style={{ height: 83 / scale, width: 303 / scale }} />
			{position === dealer && (matchStage !== 'PREGAME' && matchStage !== 'RESULT') && <View style={{ position: "absolute", right: position === 3 ? -56 : null, left: position === 3 ? null : -56, bottom: 32 }}>
				{iconSVGs.dealerIcon}
			</View>}
		</View>
	)
}