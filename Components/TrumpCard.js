
import React, { useContext, useEffect, useState, useRef } from "react"
import { Animated, View, Image } from "react-native"
import { DataContext } from "../GameContext"
import { cardImages, sleep, sounds } from "../Data/data"
import FlipCard from 'react-native-flip-card'
import { Audio } from 'expo-av';

export default function TrumpCard() {
	const { appPreferences, upTrump, matchStage, showTrumpCard } = useContext(DataContext)
	const [cardCode, setCardCode] = useState("")
	const [flipState, setFlipState] = useState(false)

	async function playFlip() {
		_onPlaybackStatusUpdate = playbackStatus => {
			if (playbackStatus.isPlaying) {
				sleep(250).then(() => setFlipState(!flipState))
			}
		}
		const { sound } = await Audio.Sound.createAsync(
			sounds.flip,
			{ isMuted: !appPreferences.sounds, volume: 0.2 }
		)
		sound.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate)
		await sound.playAsync()
	}

	// Animation Effects
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

	// if trump is ordered up on CALL stage, setShowTrumpCard(false) during call stage
	// if PICK stage is reached, then setShowTrumpCard(false)
	useEffect(() => {
		if (showTrumpCard) {
			sleep(500).then(() => {
				playFlip()
			})
		} else {
			if (matchStage === "CALL") {
				fadeOut()
				sleep(600).then(() => setFlipState(false))
			}
		}
	}, [showTrumpCard])

	useEffect(() => {
		if (matchStage === "PICK") playFlip()
	}, [matchStage])

	useEffect(() => {
		upTrump.faceValue !== undefined && setCardCode("" + upTrump.suit.code + upTrump.faceValue.toLowerCase())
	}, [upTrump])

	return (
		<Animated.View style={ { position: "absolute", opacity: fadeAnim } }>
			<FlipCard
				flip={ flipState }
				flipHorizontal={ true }
				flipVertical={ false }
				friction={ 100 }
			>
				<View>
					<Image
						source={ cardImages[appPreferences.deckTheme].down1 }
						style={ { transform: [{ scale: 1.05 }] } } />
				</View>
				<View>
					<Image style={ { width: 120, height: 166 } } source={ cardImages[appPreferences.deckTheme][cardCode] } />
				</View>
			</FlipCard>
		</Animated.View>
	)
}