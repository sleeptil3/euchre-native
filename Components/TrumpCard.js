
import React, { useContext, useEffect, useRef, useState } from "react"
import { Animated, Pressable, StyleSheet } from "react-native"
import { DataContext } from "../GameContext"
import { cardImages, sleep } from "../Data/data"

export default function TrumpCard(props) {
	const { showTrumpCard, setShowTrumpCard, suits, matchStage, yourSeat, upTrump, currentPlayer } = useContext(DataContext)
	const [cardCode, setCardCode] = useState("")
	const [enableSelection, setEnableSelection] = useState(false)
	const [scaleValue, setScaleValue] = useState(.6)

	const handlePress = () => {
		setShowTrumpCard(false)
		console.log("short press")
		// console.log(`You ordered up ${upTrump.faceValue} of ${upTrump.suit.name} as trump`)
		// suits[upTrump.suit.code].select()
	}

	const handleLongPress = () => {
		setShowTrumpCard(false)
		console.log("long press")
		// console.log(`You ordered up ${upTrump.faceValue} of ${upTrump.suit.name} as trump`)
		// suits[upTrump.suit.code].select()
	}

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
				delay: 250,
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

	useEffect(() => {
		if (matchStage === "CALL") {
			currentPlayer === yourSeat ? setEnableSelection(true) : setEnableSelection(false)
		} else {
			setEnableSelection(false)
		}
	}, [currentPlayer])

	return (
		<Pressable
			onPress={handlePress}
			onLongPress={handleLongPress}
			onPressIn={() => setScaleValue(.7)}
			onPressOut={() => setScaleValue(.6)}
		>
			<Animated.Image
				source={cardImages[cardCode]}
				style={
					{
						transform: [{ scale: scaleValue }],
						opacity: fadeAnim
					}
				}
			/>
		</Pressable>
	)
}


		// <div onClick={handleClick} className={`${enableSelection} ${trumpCardPosition} transform transition-transform relative z-20 cursor-pointer w-24 delay-75 duration-500 hover:-translate-y-5`}>
		// 	<img className={`transition-opacity ${trumpCardOpacity} duration-1000 filter drop-shadow-2xl shadow-2xl`} src={`./cards/${cardCode}.png`} alt={`${upTrump.faceValue} of ${upTrump.suit.name}`} />
		// </div>