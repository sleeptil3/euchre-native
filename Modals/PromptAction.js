import React, { useContext, useRef, useEffect } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { DataContext } from '../GameContext'
import { Flex } from '../CoreElements/containerStyles'
import { Subtitle, Title, Body } from '../CoreElements/fontStyles'
import { colors } from '../CoreElements/theme'
import Icon from '../CoreElements/icons'

export default function PromptAction() {
	const { actionText } = useContext(DataContext)
	const blinkAnim = useRef(new Animated.Value(1)).current

	useEffect(() => {
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
		<View style={{ justifyContent: "center", alignItems: "center", position: "absolute", marginHorizontal: 24, bottom: 245, left: 0, right: 0 }}>
			<Animated.View style={[styles.action, { opacity: blinkAnim }]}>
				<Flex justify="center" align="center">
					<Subtitle align="center" override={{ fontSize: 20 }}>{actionText}</Subtitle>
				</Flex>
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