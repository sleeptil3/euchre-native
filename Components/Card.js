import React, { useContext, useRef } from "react"
import { Animated, PanResponder } from "react-native";
import { DataContext } from "../GameContext"
import { cardImages, blankCard, sleep } from "../Data/data"

export default function Card({ card }) {
	const { yourSeat, handlePlayerChoice, handleDiscard, matchStage } = useContext(DataContext)
	const cardCode = card === blankCard ? "blank" : "" + card.suit.code + card.faceValue.toLowerCase()

	const handleCardRelease = (stage) => {
		if (stage === "PLAY") handlePlayerChoice(yourSeat, card)
		else handleDiscard(yourSeat, card)
	}
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
					Animated.spring(moveAnim, { toValue: { x: moveAnim.x, y: -350 }, useNativeDriver: true }).start();
					Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }).start();
					Animated.timing(scaleAnim, { toValue: .75, duration: 500, useNativeDriver: true }).start();
					handleCardRelease(matchStage)
				} else {
					// FAILED THRESHOLD FOR ACTION
					Animated.spring(moveAnim, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
				}
			}
		})
	).current;

	return (
		<Animated.Image source={cardImages[cardCode]}
			style={{ transform: [{ translateX: moveAnim.x }, { translateY: moveAnim.y }, { scale: scaleAnim }], opacity: fadeAnim, borderRadius: 20, marginLeft: -81, marginRight: -81 }}
			{...dragResponder.panHandlers}
		/>
	)
}