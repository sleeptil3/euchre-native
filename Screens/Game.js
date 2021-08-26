import React, { useContext, useState, useEffect } from "react";
import { Image, View } from "react-native";
import { styles, themeTable } from '../CoreElements/theme'
import GameLayer from "../Components/GameLayer";
import { DataContext } from "../GameContext";

export default function Game() {
	const { appPreferences } = useContext(DataContext)
	const [tableImage, setTableImage] = useState(themeTable["table-great-room"].image)

	useEffect(() => {
		appPreferences.tableTheme && setTableImage(themeTable[appPreferences.tableTheme].image)
	}, [appPreferences.tableTheme])

	return (
		<View style={styles.screen}>
			<Image style={styles.background} source={tableImage} />
			<GameLayer />
		</View>
	);
}

