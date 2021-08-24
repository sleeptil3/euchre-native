
import React, { useContext, useEffect, useRef, useState } from "react"
import { Animated, Pressable, StyleSheet } from "react-native"
import { DataContext } from "../GameContext"
import { cardImages, sleep } from "../Data/data"

export default function TrumpCard(props) {
	const { appPreferences, showTrumpCard, upTrump } = useContext(DataContext)
	const [cardCode, setCardCode] = useState("")
	const [scaleValue, setScaleValue] = useState(.6)

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
		showTrumpCard === true ? fadeIn() : fadeOut()
	}, [showTrumpCard])

	useEffect(() => {
		setCardCode("" + upTrump.suit.code + upTrump.faceValue.toLowerCase())
	}, [upTrump])

	return (
		<Animated.Image
			source={cardImages[appPreferences.deckTheme][cardCode]}
			style={
				{
					transform: [{ scale: scaleValue }],
					opacity: fadeAnim
				}
			}
		/>
	)
}


// Older code for clicking upTrump card

// const handlePress = () => {
// 	setShowTrumpCard(false)
// 	debugMode && console.log(`You ordered up ${upTrump.faceValue} of ${upTrump.suit.name} as trump`)
// 	// suits[upTrump.suit.code].select()
// }

// const handleLongPress = () => {
// 	setShowTrumpCard(false)
// 	debugMode && console.log(`You ordered up ${upTrump.faceValue} of ${upTrump.suit.name} as trump`)
// 	// suits[upTrump.suit.code].select()
// }

// const [enableSelection, setEnableSelection] = useState(false)
// <Pressable
// 	onPress = { handlePress }
// 	onLongPress = { handleLongPress }
// 	onPressIn = {() => setScaleValue(.7)}
// 	onPressOut = {() => setScaleValue(.6)}>