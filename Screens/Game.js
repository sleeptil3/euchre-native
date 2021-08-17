import React, { useContext } from "react";
import { Image, View } from "react-native";
import { DataContext } from "../GameContext";
import { Subtitle, Body } from '../CoreElements/fontStyles'
import { colors, styles } from '../CoreElements/theme'
import GameLayer from "../Components/GameLayer";

export default function Game() {
	/////////////////////
	// CONTEXT IMPORTS //
	/////////////////////

	const { playerHand } = useContext(DataContext)

	////////////
	// RENDER //
	////////////


	return (
		<View style={styles.screen}>
			<Image style={styles.background} source={require('../assets/bg-table-12p.png')} />
			<GameLayer />
		</View>
	);
}

