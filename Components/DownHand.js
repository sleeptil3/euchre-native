import React, { useRef, useEffect, useContext } from "react";
import { Audio } from "expo-av";
import { DataContext } from "../GameContext";
import { iconSVGs } from '../CoreElements/theme';
import { View, Animated, StyleSheet } from "react-native";
import { cardImages, sounds } from "../Data/data";

export default function DownHand({ position, handLength }) {
	const { matchTricks, goAlone, dealer, enableSound, appPreferences, hasNotch } = useContext(DataContext)
	const anim1 = useRef(new Animated.Value(100)).current
	const anim2 = useRef(new Animated.Value(100)).current
	const anim3 = useRef(new Animated.Value(100)).current
	const anim4 = useRef(new Animated.Value(100)).current
	const anim5 = useRef(new Animated.Value(100)).current

	const move1 = () => {
		Animated.timing(
			anim1,
			{
				toValue: 0,
				duration: 250,
				useNativeDriver: true
			}
		).start()
	};
	const move2 = () => {
		Animated.timing(
			anim2,
			{
				delay: 100,
				toValue: 0,
				duration: 250,
				useNativeDriver: true
			}
		).start()
	};

	const move3 = () => {
		Animated.timing(
			anim3,
			{
				delay: 200,
				toValue: 0,
				duration: 250,
				useNativeDriver: true
			}
		).start()
	};

	const move4 = () => {
		Animated.timing(
			anim4,
			{
				delay: 300,
				toValue: 0,
				duration: 250,
				useNativeDriver: true
			}
		).start()
	};

	const move5 = () => {
		Animated.timing(
			anim5,
			{
				delay: 400,
				toValue: 10,
				duration: 250,
				useNativeDriver: true
			}
		).start()
	};

	const handStyles = [
		null,
		{
			height: 100,
			width: 100,
			bottom: 150,
			left: -60,
			position: "absolute",
			transform: [{ rotate: '90deg' }],
			opacity: goAlone !== null && ((goAlone + 2) % 4) === 1 ? 0 : 1
		},
		{
			top: hasNotch ? -74 : -60,
			left: 40,
			width: 100,
			height: 100,
			transform: [{ rotate: '180deg' }],
			opacity: goAlone !== null && ((goAlone + 2) % 4) === 2 ? 0 : 1
		},
		{
			right: -60,
			width: 100,
			height: 100,
			top: -150,
			position: "absolute",
			transform: [{ rotate: '-90deg' }],
			opacity: goAlone !== null && ((goAlone + 2) % 4) === 3 ? 0 : 1
		},
	]

	const styles = StyleSheet.create({
		icon: {
			position: "absolute",
			alignItems: "center",
			bottom: 100,
			transform: [{ rotate: position === 1 ? '-90deg' : position === 2 ? '180deg' : '90deg' }]
		},
		arrow: {
			top: -2,
		},
		deck: {
			transform: [{ rotate: position === 1 ? '-90deg' : position === 2 ? '180deg' : '90deg' }]
		}
	})

	async function playDeal() {
		const { sound } = await Audio.Sound.createAsync(
			sounds.deal,
			{ isMuted: !enableSound, volume: 0.5 }
		)
		await sound.playAsync()
	}

	useEffect(() => {
		playDeal()
		move1()
		move2()
		move3()
		move4()
		move5()
	}, [])

	return (
		<View style={ [handStyles[position], { flexDirection: "row", justifyContent: "center" }] }>
			<Animated.Image
				style={
					[
						{
							marginRight: -100,
							opacity: position !== 3 ? handLength === 0 ? 0 : 1 : handLength < 5 ? 0 : 1
						},
						{
							transform: [{ rotate: '-15deg' }, { translateY: anim1 }]
						}
					]
				}
				source={ cardImages[appPreferences.deckTheme].down1 }
			/>
			<Animated.Image
				style={
					[
						{
							marginRight: -100,
							opacity: position !== 3 ? handLength < 2 ? 0 : 1 : handLength < 4 ? 0 : 1
						},
						{
							transform: [{ rotate: '-5deg' }, { translateY: anim2 }]
						}
					]
				}
				source={ cardImages[appPreferences.deckTheme].down1 }
			/>
			<Animated.Image
				style={
					[
						{
							marginRight: -100,
							opacity: position !== 3 ? handLength < 3 ? 0 : 1 : handLength < 3 ? 0 : 1
						},
						{
							transform: [{ rotate: '-0deg' }, { translateY: anim3 }]
						}
					]
				}
				source={ cardImages[appPreferences.deckTheme].down1 }
			/>
			<Animated.Image
				style={
					[
						{
							marginRight: -100,
							opacity: position !== 3 ? handLength < 4 ? 0 : 1 : handLength < 2 ? 0 : 1
						},
						{
							transform: [{ rotate: '5deg' }, { translateY: anim4 }]
						}
					]
				}
				source={ cardImages[appPreferences.deckTheme].down1 }
			/>
			<Animated.Image
				style={
					[
						{
							marginRight: -100,
							opacity: position !== 3 ? handLength < 5 ? 0 : 1 : handLength === 0 ? 0 : 1
						},
						{
							transform: [{ rotate: '15deg' }, { translateY: anim5 }]
						}
					]
				}
				source={ cardImages[appPreferences.deckTheme].down1 }
			/>

			{ (position === dealer && matchTricks.callingTeam + matchTricks.opposingTeam !== 5) && <View style={ { position: "absolute", top: 22, left: 62 } }>
				{ iconSVGs.dealerIndicator }
			</View>
			}
		</View>
	)
}