import React, { useContext, useRef } from "react"
import { Animated, PanResponder } from "react-native";
import { DataContext } from "../GameContext"
import { cardImages, blankCard, sleep } from "../Data/data"

export default function Card({ card }) {
	const { yourSeat, upTrump, handlePlayerChoice, handleDiscard, matchStage, setPile, pile } = useContext(DataContext)
	const cardCode = "" + card.suit.code + card.faceValue.toLowerCase()

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
					matchStage === "PLAY" ? () => handlePlayerChoice(yourSeat, card) : () => handleDiscard(yourSeat, card)
					sleep(300).then(() => {
						handleDiscard(yourSeat, card)
						setPile([...pile, card])
					})
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

{/* <div className={`${card === blankCard && "opacity-0"} transform transition-transform relative w-24 delay-75 duration-400 ${card === upTrump && matchStage === "DISCARD" ? "left-28" : "hover:-translate-y-5"}`}>
	<img onClick={handlePress} className={`${card === upTrump && matchStage === "DISCARD" ? "pointer-events-none" : "cursor-pointer "} transition-opacity opacity-100 filter shadow-2xl`} src={`./cards/${cardCode}.png`} alt={`${card.faceValue} of ${card.suit.name}`} />
</div> */}
