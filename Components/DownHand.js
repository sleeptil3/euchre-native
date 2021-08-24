import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../GameContext";
import { iconSVGs } from '../CoreElements/theme';
import { View, Image, StyleSheet } from "react-native";
import { cardImages } from "../Data/data";

export default function DownHand({ position, handLength }) {
	const { matchTricks, goAlone, dealer, appPreferences } = useContext(DataContext)
	const [image, setImage] = useState(0);
	const [imageURLS, setImageURLS] = useState([cardImages[appPreferences.deckTheme].down0, cardImages[appPreferences.deckTheme].down1, cardImages[appPreferences.deckTheme].down2, cardImages[appPreferences.deckTheme].down3, cardImages[appPreferences.deckTheme].down4, cardImages[appPreferences.deckTheme].down5])

	useEffect(() => {
		setImageURLS([cardImages[appPreferences.deckTheme].down0, cardImages[appPreferences.deckTheme].down1, cardImages[appPreferences.deckTheme].down2, cardImages[appPreferences.deckTheme].down3, cardImages[appPreferences.deckTheme].down4, cardImages[appPreferences.deckTheme].down5])
	}, [appPreferences.deckTheme])

	useEffect(() => {
		setImage(imageURLS[handLength])
	}, [imageURLS])

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
