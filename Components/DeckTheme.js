import React, { useContext } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Body, DefaultText, Subtitle } from '../CoreElements/fontStyles'
import { DataContext } from "../GameContext"
import { iconSVGs, colors, themeSamples } from '../CoreElements/theme'
import { cardImages } from '../Data/data'
import Svg, { Path } from 'react-native-svg'

export default function DeckTheme({ deck }) {
	const { deckTheme, setDeckTheme } = useContext(DataContext)

	const handleThemeChange = () => {
		setDeckTheme(deck)
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
			width: 250
		},
	})

	return (
		<Pressable onPress={deckTheme !== deck ? handleThemeChange : null}>
			<View style={styles.container}>
				<Subtitle align="left" override={{ fontSize: 18 }}>{deck}</Subtitle>
				<Image source={themeSamples[deck]} />
				<View style={{ position: "absolute", top: 10, left: 10 }}>
					{deckTheme === deck ?
						<Svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
							<Path d="M16.5 32.6562C25.2188 32.6562 32.4375 25.4219 32.4375 16.7188C32.4375 8 25.2031 0.78125 16.4844 0.78125C7.78125 0.78125 0.5625 8 0.5625 16.7188C0.5625 25.4219 7.79688 32.6562 16.5 32.6562ZM16.5 30C9.125 30 3.23438 24.0938 3.23438 16.7188C3.23438 9.34375 9.10938 3.4375 16.4844 3.4375C23.8594 3.4375 29.7656 9.34375 29.7812 16.7188C29.7969 24.0938 23.875 30 16.5 30ZM14.7812 24.1406C15.2969 24.1406 15.7344 23.8906 16.0469 23.4062L23.1875 12.1719C23.3594 11.8594 23.5625 11.5156 23.5625 11.1719C23.5625 10.4688 22.9375 10.0156 22.2812 10.0156C21.8906 10.0156 21.5 10.2656 21.2031 10.7188L14.7188 21.125L11.6406 17.1406C11.2656 16.6406 10.9219 16.5156 10.4844 16.5156C9.8125 16.5156 9.28125 17.0625 9.28125 17.75C9.28125 18.0938 9.42188 18.4219 9.64062 18.7188L13.4531 23.4062C13.8438 23.9219 14.2656 24.1406 14.7812 24.1406Z" fill={colors.green} />
						</Svg>
						: <Svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
							<Path d="M16.5 32.6562C25.2188 32.6562 32.4375 25.4219 32.4375 16.7188C32.4375 8 25.2031 0.78125 16.4844 0.78125C7.78125 0.78125 0.5625 8 0.5625 16.7188C0.5625 25.4219 7.79688 32.6562 16.5 32.6562ZM16.5 30C9.125 30 3.23438 24.0938 3.23438 16.7188C3.23438 9.34375 9.10938 3.4375 16.4844 3.4375C23.8594 3.4375 29.7656 9.34375 29.7812 16.7188C29.7969 24.0938 23.875 30 16.5 30Z" fill={colors.white} />
						</Svg>}
				</View>
			</View>
		</Pressable>
	)
}