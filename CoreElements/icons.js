import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { iconSVGs } from './theme';
import { DataContext } from '../GameContext';
import { logMode, debugMode } from '../Data/data';

export default function Icon({ choice }) {
	const { setShowPromptModal } = useContext(DataContext)
	const [isPressed, setIsPressed] = useState(false)
	const styles = StyleSheet.create({
		icon: {
			marginHorizontal: 12,
			justifyContent: "center",
			alignItems: "center"
		}
	})
	let outlineType, filledType

	switch (choice.text) {
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
			filledType = iconSVGs.passFilled
			break
		}
		case "u": {
			outlineType = iconSVGs.upOutlined
			filledType = iconSVGs.upFilled
			break
		}
		case "ok": {
			outlineType = iconSVGs.okOutlined
			filledType = iconSVGs.okFilled
			break
		}
		default: null
	}

	const handlePress = (code) => {
		logMode && console.log("SHORT PRESS")
		choice.shortAction ? choice.shortAction(code) : null
		setShowPromptModal(false)
	}

	const handleLongPress = (code) => {
		logMode && console.log("LONG PRESS")
		choice.longAction ? choice.longAction(code) : choice.shortAction ? choice.shortAction(code) : null
		setShowPromptModal(false)
	}

	return (
		<Pressable
			delayLongPress={750}
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
			onPress={() => handlePress(choice.text)}
			onLongPress={() => handleLongPress(choice.text)}
			style={styles.icon}
			accessibilityLabel={choice.altText}
		>
			{isPressed === true ? filledType : outlineType}
		</Pressable>
	)
}