import React, { useContext, useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Body, Subtitle } from '../CoreElements/fontStyles'
import { DataContext } from "../GameContext"
import { iconSVGs, colors, themeSamples } from '../CoreElements/theme'
import { ButtonURLLink } from '../CoreElements/buttonStyles'

export default function DeckThemeChoice({ deck }) {
	const { appPreferences, setAppPreferences } = useContext(DataContext)
	const [chosen, setChosen] = useState(false)

	const handleThemeChange = () => {
		setAppPreferences({ ...appPreferences, deckTheme: deck })
	}
	useEffect(() => {
		if (appPreferences.deckTheme === deck) setChosen(true)
		else setChosen(false)
	}, [appPreferences.deckTheme])

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
			opacity: deck === "Year2099" ? .6 : 1
		},
	})

	return (
		<Pressable onPress={appPreferences.deckTheme !== deck && deck !== 'Year2099' ? handleThemeChange : null}>
			<View style={styles.container}>
				<Subtitle align="left" override={{ fontSize: 18, top: 5, marginBottom: deck === "Year2099" ? 30 : null }}>{deck}</Subtitle>
				<Image source={themeSamples[deck]} />
				<View style={{ opacity: deck !== "Year2099" ? 1 : .4, position: "absolute", top: 10, left: 10 }}>
					{appPreferences.deckTheme === deck ? iconSVGs.toggleOn : iconSVGs.toggleOff}
				</View>
				{deck === "QueenG" && <View>
					<Body override={{ fontSize: 13, lineHeight: 18 }}>QueenG was created by Maayan Segal at 16 years old as the first ever, multi-ethnic deck of cards where men and women are equal. In this deck, the Jack, Queen, and King are represented as Prince/Princess, Duke/Duchess, and Monarch, respectively.</Body>
					<Body override={{ fontSize: 13, lineHeight: 18 }}>This is a beautiful set of cards and I highly recommend you pick up a set. You can learn more about Maayan and pick up a QueenG card deck of your own on her <ButtonURLLink url={"https://www.indiegogo.com/projects/queeng-playing-cards-2nd-edition#/"}>Indiegogo</ButtonURLLink> page.</Body>
				</View>}
				{deck === "Year2099" && <Subtitle override={{ fontSize: 18, paddingVertical: 20, paddingBottom: 8 }}>Coming Soon...</Subtitle>}
			</View>
		</Pressable>
	)
}