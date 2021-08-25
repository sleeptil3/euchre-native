import React, { useContext, useState, useEffect, useRef } from "react"
import { Image, Animated } from "react-native"
import { DataContext } from "../GameContext"
import TrumpCard from "./TrumpCard"
import { Flex } from "../CoreElements/containerStyles"
import { cardImages } from "../Data/data"

export default function TrumpStack() {
	const { appPreferences, trump, upTrump, showTrumpStack } = useContext(DataContext)
	const [imageURL, setImageURL] = useState(cardImages[appPreferences.deckTheme].deck)
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const fadeIn = () => {
		// Will change fadeAnim value to 1 in 5 seconds
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
		// Will change fadeAnim value to 0 in 3 seconds
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
	}, [showTrumpStack])

	useEffect(() => {
		setImageURL(cardImages[appPreferences.deckTheme].deck)
	}, [appPreferences.deckTheme])

	if (!trump.suit) {
		return (
			<Animated.View style={{ opacity: fadeAnim, alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
				<Image source={imageURL} style={{ position: "absolute" }} />
				{showTrumpStack && <TrumpCard />}
			</Animated.View>
		)
	} else {
		return null
	}
}

