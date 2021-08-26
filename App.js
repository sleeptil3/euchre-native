import React, { useState, useEffect } from 'react';
import GameContext from './GameContext';
import { StatusBar } from 'expo-status-bar';
import Game from './Screens/Game'
import { Flex } from './CoreElements/containerStyles';
import { colors } from './CoreElements/theme';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function App() {
	const [appPreferences, setAppPreferences] = useState({})

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
		if (appPreferences !== {}) {
			storePreferences(appPreferences)
		}
	}, [appPreferences])

	if (appPreferences === {}) return null

	else return (
		<GameContext appPreferences={appPreferences} setAppPreferences={setAppPreferences}>
			<Flex color={colors.background}>
				<StatusBar style="light" hidden={true} />
				<Game />
			</Flex>
		</GameContext>
	);
}