import React, { useContext, useState, useEffect } from "react";
import { Image, View, StyleSheet } from "react-native";
import { styles, themeTable } from '../CoreElements/theme'
import GameLayer from "../Components/GameLayer";
import { DataContext } from "../GameContext";

export default function Game() {
	const { appPreferences } = useContext(DataContext)
	const [ tableImage, setTableImage ] = useState(themeTable[ "table-great-room" ].image)

	const localStyles = StyleSheet.create({
		background: {
			width: "100%",
			height: "100%",
			position: "absolute"
		},
		logMode: {
			width: "100%",
			height: "100%",
			position: "absolute",
			backgroundColor: "brown"
		}
	})

	useEffect(() => {
		appPreferences.tableTheme && setTableImage(themeTable[ appPreferences.tableTheme ].image)
	}, [ appPreferences.tableTheme ])

	return (
		<View style={ styles.screen }>
			<Image resizeMode={ "stretch" } style={ localStyles.background } source={ tableImage } />
			<GameLayer />
		</View>
	);
}