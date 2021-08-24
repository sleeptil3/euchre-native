import React from 'react';
import { Pressable, Button, Text, Linking } from 'react-native';
import { Subtitle } from './fontStyles';
import { colors } from './theme';

export const ButtonToggle = ({ size, setState, state, text, color, pressColor, altText, fontSize = 18, fontColor = colors.white }) => {
	if (size === "large") {
		return (
			<Pressable
				onPress={() => setState(!state)}
				style={({ pressed }) => {
					return (
						{
							accessibilityLabel: altText,
							backgroundColor: pressed ? pressColor : color,
							paddingVertical: 10,
							paddingHorizontal: 20,
							borderRadius: 30,
							margin: 10
						}
					)
				}}
			>
				<Subtitle override={{ marginBottom: 0, fontSize: fontSize, color: fontColor }}>{text}</Subtitle>
			</Pressable>
		)
	} else {
		return (
			<Button
				accessibilityLabel={altText}
				title={text}
				color={color}
				onPress={() => setState(!state)}
			/>
		)
	}
}

export const ButtonSetValue = ({ overwrite = false, size, text, setState, state, value, color, pressColor, fontSize = 18, fontColor = colors.white, altText, override }) => {
	let newValue
	if (overwrite) newValue = value
	else if (Array.isArray(state) && Array.isArray(value)) newValue = [...state, ...value]
	else if (Array.isArray(state)) newValue = [...state, value]
	else if (typeof state === "object") newValue = { ...state, ...value }
	else newValue = value

	if (size === "large") {
		return (
			<Pressable
				onPress={() => setState(newValue)}
				style={({ pressed }) => {
					return (
						[{
							accessibilityLabel: altText,
							backgroundColor: pressed ? pressColor : color,
							paddingVertical: 10,
							paddingHorizontal: 20,
							borderRadius: 30,
							margin: 10
						},
						{ ...override }
						]
					)
				}}
			>
				<Subtitle override={{ marginBottom: 0, fontSize: fontSize, color: fontColor }}>{text}</Subtitle>
			</Pressable>
		)
	} else {
		return (
			<Button
				accessibilityLabel={altText}
				title={text}
				color={color}
				onPress={() => setState(newValue)}
			/>
		)
	}
}

export const ButtonURLLink = ({ url, children, override, align }) => {
	return <Text style={[{ textDecorationLine: "underline", textAlign: align || "left" }, override]} onPress={() => Linking.openURL(url)}>{children}</Text>;
};
