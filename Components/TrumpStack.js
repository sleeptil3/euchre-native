import React, { useContext, useState, useEffect, useRef } from "react"
import { Image, Animated } from "react-native"
import { DataContext } from "../GameContext"
import TrumpCard from "./TrumpCard"
import { cardImages } from "../Data/data"

export default function TrumpStack() {
	const { appPreferences, matchStage, showTrumpStack } = useContext(DataContext)
	const [ imageURL, setImageURL ] = useState(cardImages[ appPreferences.deckTheme ].deck)
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const fadeIn = () => {
		Animated.timing(
			fadeAnim,
			{
				toValue: 1,
				delay: 500,
				duration: 750,
				useNativeDriver: true
			}
		).start();
	};

	const fadeOut = () => {
		Animated.timing(
			fadeAnim,
			{
				toValue: 0,
				duration: 750,
				useNativeDriver: true
			}
		).start();
	};

	useEffect(() => {
		showTrumpStack === false ? fadeOut() : fadeIn()
	}, [ showTrumpStack ])

	useEffect(() => {
		setImageURL(cardImages[ appPreferences.deckTheme ].deck)
	}, [ appPreferences.deckTheme ])

	return (
		<Animated.View style={ { opacity: fadeAnim, alignItems: "center", justifyContent: "center", width: "100%", height: "100%" } }>
			<Image source={ imageURL } style={ { position: "absolute" } } />
			{ matchStage !== "PLAY" && <TrumpCard /> }
		</Animated.View>
	)
}

