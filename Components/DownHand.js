import React, { useRef, useEffect, useContext } from "react";
import { Audio } from "expo-av";
import { DataContext } from "../GameContext";
import { iconSVGs } from '../CoreElements/theme';
import { View, Animated, StyleSheet } from "react-native";
import { cardImages, sleep, sounds } from "../Data/data";

export default function DownHand({ position, handLength }) {
	const { matchTricks, goAlone, dealer, enableSound, appPreferences } = useContext(DataContext)
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
			left: 40,
			height: 0,
			width: 0,
			bottom: 110,
			transform: [{ rotate: '90deg' }],
			opacity: goAlone !== null && ((goAlone + 2) % 4) === 1 ? 0 : 1
		},
		{
			top: 30,
			left: 50,
			width: 0,
			height: 0,
			transform: [{ rotate: '180deg' }],
			opacity: goAlone !== null && ((goAlone + 2) % 4) === 2 ? 0 : 1
		},
		{
			right: 40,
			bottom: 42,
			width: 0,
			height: 0,
			transform: [{ rotate: '-90deg' }],
			opacity: goAlone !== null && ((goAlone + 2) % 4) === 3 ? 0 : 1
		},
	]

	const styles = StyleSheet.create({
		icon: {
			position: "absolute",
			alignItems: "center",
			top: position === 2 ? 12 : -22,
			left: position === 1 ? 150 : position === 2 ? 160 : null,
			right: position === 3 ? 77 : null,
			opacity: .6
		},
		arrow: {
			top: -2,
		},
		deck: {
			transform: position === 1 ? [{ rotate: '-90deg' }] : position === 2 ? [{ rotate: '180deg' }] : [{ rotate: '90deg' }]
		}
	})

	async function playDeal() {
		const { sound } = await Audio.Sound.createAsync(
			sounds.deal,
			{ isMuted: !enableSound, volume: .5 }
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
		<View style={[handStyles[position], { flexDirection: "row", justifyContent: "center" }]}>
			<Animated.Image
				style={
					[
						{
							marginRight: -100,
							opacity: handLength === 0 ? 0 : 1
						},
						{
							transform: [{ rotate: '-15deg' }, { translateY: anim1 }]
						}
					]
				}
				source={cardImages[appPreferences.deckTheme].down1}
			/>
			<Animated.Image
				style={
					[
						{
							marginRight: -100,
							opacity: handLength < 2 ? 0 : 1
						},
						{
							transform: [{ rotate: '-5deg' }, { translateY: anim2 }]
						}
					]
				}
				source={cardImages[appPreferences.deckTheme].down1}
			/>
			<Animated.Image
				style={
					[
						{
							marginRight: -100,
							opacity: handLength < 3 ? 0 : 1
						},
						{
							transform: [{ rotate: '-0deg' }, { translateY: anim3 }]
						}
					]
				}
				source={cardImages[appPreferences.deckTheme].down1}
			/>
			<Animated.Image
				style={
					[
						{
							marginRight: -100,
							opacity: handLength < 4 ? 0 : 1
						},
						{
							transform: [{ rotate: '5deg' }, { translateY: anim4 }]
						}
					]
				}
				source={cardImages[appPreferences.deckTheme].down1}
			/>
			<Animated.Image
				style={
					[
						{
							marginRight: -100,
							opacity: handLength < 5 ? 0 : 1
						},
						{
							transform: [{ rotate: '15deg' }, { translateY: anim5 }]
						}
					]
				}
				source={cardImages[appPreferences.deckTheme].down1}
			/>

			{(position === dealer && matchTricks.callingTeam + matchTricks.opposingTeam !== 5) && <View style={styles.icon}>
				<View style={styles.deck}>
					{iconSVGs.dealerIcon}
				</View>
				<View style={styles.arrow}>
					{iconSVGs.downArrow}
				</View>
			</View>
			}
		</View>
	)
}
