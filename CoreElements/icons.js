import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { iconSVGs } from './theme';
import { DataContext } from '../GameContext';

const styles = StyleSheet.create({
	icon: { marginHorizontal: 12, justifyContent: "center", alignItems: "center" }
})

export default function Icon({ choice }) {
	const { type, shortAction, longAction, altText } = choice
	const { setShowPromptModal } = useContext(DataContext)
	const [isPressed, setIsPressed] = useState(false)
	let outlineType, filledType
	switch (type) {
		case "s": {
			outlineType = iconSVGs.spadeOutlined
			filledType = iconSVGs.spadeFilled
			break
		}
		case "h": {
			outlineType = iconSVGs.heartOutlined
			filledType = iconSVGs.heartOutlined
			break
		}
		case "d": {
			outlineType = iconSVGs.diamondOutlined
			filledType = iconSVGs.diamondOutlined
			break
		}
		case "c": {
			outlineType = iconSVGs.clubOutlined
			filledType = iconSVGs.clubOutlined
			break
		}
		case "p": {
			outlineType = iconSVGs.passOutlined
			filledType = iconSVGs.passOutlined
			break
		}
		default: console.log("no valid icon type given")
	}

	const handlePress = (suitCode) => {
		console.log("short press")
		console.log(suitCode)
		// shortAction()
		setShowPromptModal(false)
	}

	const handleLongPress = (suitCode) => {
		console.log("long press")
		console.log(suitCode)
		// longAction()
		setShowPromptModal(false)
	}

	return (
		<Pressable
			delayLongPress={750}
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
			onPress={() => handlePress(type)}
			onLongPress={() => handleLongPress(type)}
			style={[styles.icon, { accessibilityLabel: altText }]}
		>
			{isPressed ? filledType : outlineType}
		</Pressable>
	)
}