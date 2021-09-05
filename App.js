import React, { useState, useEffect } from 'react';
import { useWindowDimensions, View } from 'react-native';
import GameContext from './GameContext';
import { StatusBar } from 'expo-status-bar';
import Game from './Screens/Game'
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function App() {
	const [ appPreferences, setAppPreferences ] = useState({})
	const { height, width } = useWindowDimensions()

	const getStoredPreferences = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('@preferences')
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (e) {
			console.error("getStoredPreferences error: ", e)
		}
	}

	const storePreferences = async (preferenceObject) => {
		try {
			const jsonValue = JSON.stringify(preferenceObject)
			await AsyncStorage.setItem('@preferences', jsonValue)
		} catch (e) {
			console.error("storePreferences error: ", e)
		}
	}

	const handlePreferenceLoad = async () => {
		const storedPreferences = await getStoredPreferences()
		if (!storedPreferences) {
			const newPreferencesObj = {
				deckTheme: "Default",
				sounds: true,
				tableTheme: "table-green"
			}
			setAppPreferences(newPreferencesObj)
			storePreferences(newPreferencesObj)
		} else {
			if (storedPreferences.deckTheme === undefined || storedPreferences.sounds === undefined || storedPreferences.tableTheme === undefined) {
				if (storedPreferences.deckTheme === undefined) storedPreferences.deckTheme = "Default"
				if (storedPreferences.sounds === undefined) storedPreferences.sounds = true
				if (storedPreferences.tableTheme === undefined) storedPreferences.tableTheme = "table-green"
				storePreferences(storedPreferences)
			}
			setAppPreferences(storedPreferences)
		}
	}

	useEffect(() => {
		handlePreferenceLoad()
	}, [])

	useEffect(() => {
		if (appPreferences.deckTheme !== undefined) {
			storePreferences(appPreferences)
		}
	}, [ appPreferences ])

	if (appPreferences.deckTheme === undefined) return null

	else return (
		<GameContext appPreferences={ appPreferences } setAppPreferences={ setAppPreferences }>
			<View style={ { position: "absolute", width: width, height: height, alignItems: "center", justifyContent: "center", backgroundColor: "#000" } }>
				<StatusBar style="light" hidden={ true } />
				<Game />
			</View>
		</GameContext>
	);
}