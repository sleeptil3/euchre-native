import React from 'react'
import { Text, StyleSheet, ActivityIndicator } from 'react-native'
import { colors } from './theme'
import { useFonts } from 'expo-font'

const customFonts = {
	"SFPro-Light": require("../assets/fonts/SF-Pro-Text-Light.otf"),
	"SFPro-Heavy": require("../assets/fonts/SF-Pro-Text-Heavy.otf"),
	"SFPro-Bold": require("../assets/fonts/SF-Pro-Text-Bold.otf"),
}

export const Heading = ({ children, align, override, color }) => {
	const [fontLoaded] = useFonts(customFonts)

	if (fontLoaded) return <Text style={[fontStyles.heading, { textAlign: align || "left", color: color || fontStyles.heading.color }, override]}>{children}</Text>
	return <ActivityIndicator style={{ margin: 20, marginTop: 30 }} animating={true} color={colors.white} size="small" />
}

export const Title = ({ children, align, override, color }) => {
	const [fontLoaded] = useFonts(customFonts)

	if (fontLoaded) return <Text style={[fontStyles.title, { textAlign: align || "left", color: color || fontStyles.title.color }, override]}>{children}</Text>
	return <ActivityIndicator style={{ margin: 20, marginTop: 30 }} animating={true} color={colors.white} size="small" />
}

export const Subtitle = ({ children, align, override, color }) => {
	const [fontLoaded] = useFonts(customFonts)

	if (fontLoaded) return <Text style={[fontStyles.subtitle, { textAlign: align || "left", color: color || fontStyles.subtitle.color }, override]}>{children}</Text>
	return <ActivityIndicator style={{ margin: 20, marginTop: 30 }} animating={true} color={colors.white} size="small" />
}

export const Body = ({ children, align, override, color }) => {
	const [fontLoaded] = useFonts(customFonts)

	if (fontLoaded) return <Text style={[fontStyles.body, { textAlign: align || "left", color: color || fontStyles.body.color }, override]}>{children}</Text>
	else return <ActivityIndicator style={{ margin: 20, marginTop: 30 }} animating={true} color={colors.white} size="small" />
}

export const DefaultText = ({ children, align, override, color }) => {
	const [fontLoaded] = useFonts(customFonts)

	if (fontLoaded) return <Text style={[fontStyles.default, { textAlign: align || "left", color: color || fontStyles.body.color }, override]}>{children}</Text>
	else return <ActivityIndicator style={{ margin: 20, marginTop: 30 }} animating={true} color={colors.white} size="small" />
}


export const fontStyles = StyleSheet.create({
	heading: {
		color: colors.white,
		fontSize: 40,
		marginBottom: 12
	},
	title: {
		fontFamily: "SFPro-Heavy",
		color: colors.white,
		fontSize: 32,
		marginBottom: 14
	},
	subtitle: {
		fontFamily: "SFPro-Bold",
		color: colors.white,
		fontSize: 24,
		marginBottom: 2,
	},
	body: {
		fontFamily: "SFPro-Light",
		color: colors.white,
		fontSize: 18,
		lineHeight: 24,
		marginBottom: 10,
	},
	default: {
		fontFamily: "SFPro-Light",
		color: colors.white,
		fontSize: 18
	}

})

export const text = StyleSheet.create({
	centered: { textAlign: "center" }
})