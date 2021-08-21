import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../GameContext";
import { iconSVGs } from '../CoreElements/theme';
import { View, Image, StyleSheet } from "react-native";
import { cardImages } from "../Data/data";

export default function DownHand({ position, handLength }) {
	const [image, setImage] = useState(0);
	const { currentPlayer, turnCount, matchStage, matchTricks, goAlone, dealer } = useContext(DataContext)

	const imageURLS = [cardImages.down0, cardImages.down1, cardImages.down2, cardImages.down3, cardImages.down4, cardImages.down5]

	const handStyles = [
		null,
		{
			left: 50,
			height: 200,
			bottom: 40,
			transform: [{ rotate: '90deg' }, { translateY: "200%" }],
			opacity: goAlone !== null && ((goAlone + 2) % 4) === position ? 0 : 1
		},
		{
			top: 50,
			transform: [{ rotate: '180deg' }, { translateY: "200%" }],
			opacity: goAlone !== null && ((goAlone + 2) % 4) === position ? 0 : 1
		},
		{
			height: 220,
			left: -50,
			bottom: 40,
			transform: [{ rotate: '-90deg' }, { translateY: "200%" }],
			opacity: goAlone !== null && ((goAlone + 2) % 4) === position ? 0 : 1
		},
	]

	const styles = StyleSheet.create({
		icon: {
			position: "absolute",
			alignItems: "center",
			left: position === 3 ? -44 : null,
			right: position === 1 ? -40 : position === 2 ? -56 : null,
			top: position === 2 ? 22 : -16,
			opacity: .6
		},
		arrow: {
			top: -2,
		},
		deck: {
			transform: position === 1 ? [{ rotate: '-90deg' }] : position === 2 ? [{ rotate: '180deg' }] : [{ rotate: '90deg' }]
		}
	})


	useEffect(() => {
		setImage(imageURLS[handLength]);
	}, [handLength]);

	return (
		<View style={handStyles[position]}>
			<Image source={image} />
			{(position === dealer && matchTricks.callingTeam + matchTricks.opposingTeam !== 5) && <View style={styles.icon}>
				<View style={styles.deck}>
					{iconSVGs.dealerIcon}
				</View>
				<View style={styles.arrow}>
					{iconSVGs.downArrow}
				</View>
			</View>
			}
		</View>
	)
}
