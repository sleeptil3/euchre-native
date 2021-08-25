import React, { useContext, useRef, useEffect } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { DataContext } from '../GameContext'
import { Flex } from '../CoreElements/containerStyles'
import { Subtitle, Body } from '../CoreElements/fontStyles'

export default function PromptAction() {
	const { actionText, callingPlayer, setShowPromptModal, matchStage } = useContext(DataContext)
	const blinkAnim = useRef(new Animated.Value(1)).current

	useEffect(() => {
		setShowPromptModal(false)
		Animated.loop(Animated.sequence([
			Animated.timing(blinkAnim, {
				delay: 500,
				toValue: .6,
				duration: 700,
				useNativeDriver: true
			}),
			Animated.timing(blinkAnim, {
				toValue: 1,
				duration: 400,
				useNativeDriver: true
			})
		])).start()
	}, [])

	return (
		<View style={{ justifyContent: "center", alignItems: "center", position: "absolute", bottom: 245, left: 0, right: 0 }}>
			<View style={{
				borderRadius: 32,
				borderWidth: 2,
				borderColor: "rgba(255,255,255,.5)",
				backgroundColor: "rgba(0,0,0,.75)",
				marginBottom: 20
			}}>
				{matchStage !== "PLAY" &&
					<View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
						<Subtitle align="center" override={{ fontSize: 24 }}>Trump is Set</Subtitle>
						<Body align="center" override={{ fontSize: 18, marginTop: 8, marginBottom: 0 }}>{callingPlayer % 2 === 0 ? "Your Team Called It" : "The Other Team Called It"}</Body>
					</View>
				}
			</View>
			<Animated.View style={[styles.action, { opacity: blinkAnim }]}>
				<Subtitle align="center" override={{ fontSize: 20 }}>{actionText}</Subtitle>
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	action: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 32,
		borderWidth: 2,
		borderColor: "rgba(255,255,255,.5)",
		backgroundColor: "rgba(0,0,0,.75)"
	},
})