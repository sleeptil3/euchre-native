
import React, { useContext, useEffect, useState, useRef } from "react"
import { Animated, View, Image } from "react-native"
import { DataContext } from "../GameContext"
import { cardImages, sleep } from "../Data/data"
import FlipCard from 'react-native-flip-card'
import { Audio } from 'expo-av';

export default function TrumpCard() {
	const { appPreferences, upTrump, matchStage, showTrumpStack } = useContext(DataContext)
	const [cardCode, setCardCode] = useState("")
	const [flipState, setFlipState] = useState(false)
	const [sound, setSound] = React.useState();

	async function playSound() {
		const { sound } = await Audio.Sound.createAsync(
			require("../assets/sounds/flipSound.wav")
		);
		setSound(sound);
		await sound.playAsync();
	}

	useEffect(() => {
		return sound
			? () => {
				sound.unloadAsync();
			}
			: undefined;
	}, [sound]);

	const fadeAnim = useRef(new Animated.Value(1)).current

	const fadeOut = () => {
		Animated.timing(
			fadeAnim,
			{
				toValue: 0,
				duration: 500,
				useNativeDriver: true
			}
		).start();
	};


	useEffect(() => {
		showTrumpStack && flipState === false && matchStage === "CALL" && sleep(1250).then(() => {
			playSound()
			sleep(400).then(() => setFlipState(true))
		})
		matchStage === "PICK" && flipState === true && sleep(50).then(() => {
			playSound()
			sleep(400).then(() => setFlipState(false))
		})
		matchStage === "DISCARD" && fadeOut()
	}, [matchStage])

	useEffect(() => {
		setCardCode("" + upTrump.suit.code + upTrump.faceValue.toLowerCase())
	}, [upTrump])

	return (
		<Animated.View style={{ position: "absolute", opacity: fadeAnim }}>

			<FlipCard
				flip={flipState}
				flipHorizontal={true}
				flipVertical={false}
				friction={15}
			>
				<View>
					<Image
						source={cardImages[appPreferences.deckTheme].down1}
						style={{ transform: [{ scale: 1.05 }] }} />
				</View>
				<View>
					<Image style={{ width: 120, height: 166 }} source={cardImages[appPreferences.deckTheme][cardCode]} />
				</View>
			</FlipCard>
		</Animated.View>
	)
}