import { StyleSheet } from 'react-native'

export const colors = {
	primary: "blue",
	secondary: "darkmagenta",
	white: "#f8f8ff",
	black: "#000000",
	background: "#111",
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
		marginBottom: 10
	},
	subtitle: {
		color: colors.white,
		fontSize: 30,
		fontWeight: "normal",
		marginBottom: 6,
	},
	body: {
		color: colors.white,
		fontSize: 18,
		fontWeight: "300"
	}
})

export const container = StyleSheet.create({
	flexCenter: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.background
	},
	flexStart: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	}
})

export const text = StyleSheet.create({
	centered: { textAlign: "center" }
})