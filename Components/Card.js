import React, { useState, useContext, useEffect, useRef } from "react"
import { Animated, PanResponder, StyleSheet } from "react-native";
import { DataContext } from "../GameContext"
import { cardImages, blankCard, sleep } from "../Data/data"

export default function Card({ card, scale, use, position }) {
	const { setPlayerChoice, upTrump, appPreferences } = useContext(DataContext)
	const [isTrump, setIsTrump] = useState(false)
	const cardCode = card === blankCard ? "blank" : "" + card.suit.code + card.faceValue.toLowerCase()
	const [imageURL, setImageURL] = useState(cardImages[appPreferences.deckTheme][cardCode])

	useEffect(() => {
		setImageURL(cardImages[appPreferences.deckTheme][cardCode])
	}, [appPreferences.deckTheme, cardCode])

	const moveAnim = useRef(new Animated.ValueXY()).current;
	const fadeAnim = useRef(new Animated.Value(1)).current
	const scaleAnim = useRef(new Animated.Value(1)).current

	const dragResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: Animated.event(
				[
					null,
					{ dx: moveAnim.x, dy: moveAnim.y }
				],
				{ useNativeDriver: false }
			),
			onPanResponderRelease: () => {
				if (moveAnim.y._value < -150.0) {
					// PASSED THRESHOLD FOR ACTION
					if (!isTrump) {
						Animated.spring(moveAnim, { toValue: { x: moveAnim.x, y: -350 }, useNativeDriver: true }).start();
						Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }).start();
						Animated.timing(scaleAnim, { toValue: .75, duration: 500, useNativeDriver: true }).start();
						setPlayerChoice(card)
					}
				} else {
					// FAILED THRESHOLD FOR ACTION
					Animated.spring(moveAnim, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
				}
			}
		})
	).current;

	let transform

	switch (position) {
		case 0: {
			transform = [{ rotate: "-3deg" },]
			break
		}
		case 1: {
			transform = [{ rotate: "-8deg" }, { translateX: 34 }, { translateY: -30 }]
			break
		}
		case 2: {
			transform = [{ rotate: "3deg" }, { translateY: -100 }]
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
			borderRadius: 20,
			marginLeft: -81,
			marginRight: -81
		},
		field: {
			transform: transform,
			borderRadius: 10,
			width: 194 * scale,
			height: 268 * scale,
		}
	})

	const animStyles = {
		hand: {
			transform: [{ rotate: isTrump ? "10deg" : "0deg" }, { translateX: isTrump ? 40 : moveAnim.x }, { translateY: isTrump ? 0 : moveAnim.y }, { scale: isTrump ? .7 : scaleAnim }],
			opacity: fadeAnim
		},
		field: {

		}
	}

	const selectedStyle = use === "HAND" ? [styles.hand, animStyles.hand] : [styles.field, animStyles.field]
	if (position === 0) {
		selectedStyle.push({ position: "absolute", bottom: 50 })
	}

	useEffect(() => {
		if (card === upTrump) setIsTrump(true)
		else setIsTrump(false)
	}, [upTrump])

	return (
		<Animated.Image
			source={imageURL}
			style={selectedStyle}
			{...dragResponder.panHandlers}
		/>
	)
}