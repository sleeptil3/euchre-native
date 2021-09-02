import React, { useState, useContext, useEffect, useRef } from "react"
import { Animated, PanResponder, StyleSheet } from "react-native";
import { DataContext } from "../GameContext"
import { cardImages, blankCard, sleep, sounds } from "../Data/data"
import { Audio } from "expo-av";

export default function Card({ card, scale, use, position, order }) {
	//  use values: "HAND" or other
	const { setPlayerChoice, upTrump, appPreferences, matchStage, enableSound, checkValidCard, playerHand, matchSuit } = useContext(DataContext)
	const [isTrump, setIsTrump] = useState(false)
	const cardCode = card === blankCard ? "blank" : "" + card.suit.code + card.faceValue.toLowerCase()
	const [imageURL, setImageURL] = useState(cardImages[appPreferences.deckTheme][card === blankCard ? "blank" : "" + card.suit.code + card.faceValue.toLowerCase()])
	const [isValid, setIsValid] = useState(true)

	async function playCardSound() {
		const { sound } = await Audio.Sound.createAsync(
			sounds.play,
			{ isMuted: !enableSound, volume: .2 }
		)
		await sound.playAsync()
	}

	const moveAnim = useRef(new Animated.ValueXY()).current
	const fadeAnim = useRef(new Animated.Value(1)).current
	const scaleAnim = useRef(new Animated.Value(1)).current
	const dealAnim = useRef(new Animated.Value(250)).current

	const dragResponder = useRef(
		PanResponder.create({
			onPanResponderMove: Animated.event(
				[
					null,
					{ dx: moveAnim.x, dy: moveAnim.y }
				],
				{ useNativeDriver: false }
			),
			onPanResponderRelease: () => {
				if (moveAnim.y._value < -150.0) {
					// PASSED DRAG THRESHOLD FOR ACTION
					Animated.spring(moveAnim, { toValue: { x: moveAnim.x, y: -350 }, useNativeDriver: true }).start();
					Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }).start();
					Animated.timing(scaleAnim, { toValue: .75, duration: 500, useNativeDriver: true }).start();
					playCardSound()
					setPlayerChoice(card)
				} else {
					// FAILED DRAG THRESHOLD FOR ACTION
					Animated.spring(moveAnim, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
				}
			}
		})
	).current;

	const moveUp = () => {
		Animated.timing(
			dealAnim,
			{
				toValue: 0,
				delay: (1 + order) * 100,
				duration: 250,
				useNativeDriver: true
			}
		).start();
	};


	let transform

	switch (position) {
		case 0: {
			transform = [{ rotate: "-2deg" }, { translateX: -206 }, { translateY: -80 }]
			break
		}
		case 1: {
			transform = [{ rotate: "-8deg" }, { translateX: 34 }, { translateY: -30 }]
			break
		}
		case 2: {
			transform = [{ rotate: "4deg" }, { translateY: -80 }]
			break
		}
		case 3: {
			transform = [{ rotate: "10deg" }, { translateX: -34 }, { translateY: -30 }]
			break
		}
		default: transform = null
	}

	const styles = StyleSheet.create({
		hand: {
			marginLeft: -81,
			marginRight: -81,
		},
		field: {
			transform: transform,
			width: 194 * scale,
			height: 268 * scale,
		}
	})

	const animStyles = {
		hand: {
			transform: [{ rotate: isTrump ? "10deg" : "0deg" }, { translateX: isTrump ? 40 : moveAnim.x }, { translateY: isTrump ? 0 : isValid ? moveAnim.y : 40 }, { scale: isTrump ? .7 : scaleAnim }],
			opacity: fadeAnim,
		},
		field: {

		}
	}

	const selectedStyle = use === "HAND" ? [styles.hand, animStyles.hand] : [styles.field, animStyles.field]

	if (position === 0) {
		selectedStyle.push({ position: "absolute" })
	}

	useEffect(() => {
		if (card === upTrump) setIsTrump(true)
		else setIsTrump(false)
	}, [upTrump])

	useEffect(() => {
		moveUp()
	}, [])

	useEffect(() => {
		setImageURL(cardImages[appPreferences.deckTheme][cardCode])
	}, [appPreferences.deckTheme, cardCode])

	useEffect(() => {
		if (use === "HAND") {
			const result = checkValidCard(playerHand, card)
			setIsValid(result)
		}
	}, [matchSuit, upTrump])

	useEffect(() => {
		moveAnim.resetAnimation()
		dragResponder.panHandlers.onMoveShouldSetResponder = isValid ? () => true : () => false
	}, [isValid])

	return (
		<Animated.View style={{ transform: [{ translateY: matchStage === "DEAL" ? dealAnim : 0 }] }}>
			<Animated.Image
				source={imageURL}
				style={selectedStyle}
				{...dragResponder.panHandlers}

			/>
		</Animated.View>
	)
}