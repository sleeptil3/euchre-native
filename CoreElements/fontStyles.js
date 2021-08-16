import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from './theme';

export const Heading = ({ children, align, override, color }) => {
	return (
		<Text style={[font.heading, { textAlign: align || "left", color: color || font.heading.color }, override]}>{children}</Text>
	)
}

export const Title = ({ children, align, override, color }) => {
	return (
		<Text style={[font.title, { textAlign: align || "left", color: color || font.title.color }, override]}>{children}</Text>
	)
}

export const Subtitle = ({ children, align, override, color }) => {
	return (
		<Text style={[font.subtitle, { textAlign: align || "left", color: color || font.subtitle.color }, override]}>{children}</Text>
	)
}

export const Body = ({ children, align, override, color }) => {
	return (
		<Text style={[font.body, { textAlign: align || "left", color: color || font.body.color }, override]}>{children}</Text>
	)
}

export const font = StyleSheet.create({
	primary: {
		fontFamily: "",
	},
	bold: {
		fontWeight: "bold",
	},
	light: {
		fontWeight: "300"
	},
	heading: {
		color: colors.white,
		fontSize: 40,
		fontWeight: "bold",
		marginBottom: 12
	},
	title: {
		color: colors.white,
		fontSize: 36,
		fontWeight: "bold",
		marginBottom: 14
	},
	subtitle: {
		color: colors.white,
		fontSize: 30,
		fontWeight: "normal",
		marginBottom: 6,
	},
	body: {
		color: colors.white,
		fontSize: 16,
		lineHeight: 24,
		fontWeight: "300"
	}
})

export const text = StyleSheet.create({
	centered: { textAlign: "center" }
})