import React, { useContext, useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Body, Subtitle } from '../CoreElements/fontStyles'
import { DataContext } from "../GameContext"
import { themeSamples } from '../Data/data'
import { iconSVGs, colors } from '../CoreElements/theme'

export default function DeckThemeChoice({ deck }) {
	const { appPreferences, setAppPreferences } = useContext(DataContext)

	const handleThemeChange = () => {
		setAppPreferences({ ...appPreferences, deckTheme: deck })
	}

	const styles = StyleSheet.create({
		container: {
			alignItems: "center",
			justifyContent: "center",
			borderWidth: 1,
			borderColor: colors.white,
			borderRadius: 14,
			padding: 10,
			marginVertical: 10,
			width: 250,
		},
	})

	return (
		<Pressable onPress={ appPreferences.deckTheme !== deck ? handleThemeChange : null }>
			<View style={ styles.container }>
				<Subtitle align="left" override={ { fontSize: 18, top: 5, marginBottom: 20 } }>{ deck }</Subtitle>
				<Image source={ themeSamples[deck] } />
				<View style={ { position: "absolute", top: 10, left: 10 } }>
					{ appPreferences.deckTheme === deck ? iconSVGs.toggleOn : iconSVGs.toggleOff }
				</View>
			</View>
		</Pressable>
	)
}