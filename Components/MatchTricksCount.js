import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Body, DefaultText, Subtitle } from '../CoreElements/fontStyles'
import { DataContext } from "../GameContext"
import { colors } from '../CoreElements/theme'

export default function MatchTricksCount() {
	const { matchTricks, callingPlayer } = useContext(DataContext)
	return (
		<View style={styles.container}>
			<DefaultText align="center" override={{ fontSize: 15, marginBottom: 2 }}>Tricks</DefaultText>
			<View style={styles.row}>
				<View style={styles.flex}>
					<DefaultText align="center" override={{ fontSize: 12 }}>You</DefaultText>
					<DefaultText align="center" override={{ fontSize: 12 }}>{callingPlayer % 2 === 0 ? matchTricks.callingTeam : matchTricks.opposingTeam}</DefaultText>
				</View>
				<View style={styles.flex}>
					<DefaultText align="center" override={{ fontSize: 12 }}>Them</DefaultText>
					<DefaultText align="center" override={{ fontSize: 12 }}>{callingPlayer % 2 === 0 ? matchTricks.opposingTeam : matchTricks.callingTeam}</DefaultText>
				</View>

			</View>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		opacity: .8,
		borderWidth: 1,
		borderColor: colors.white,
		borderRadius: 10,
		paddingVertical: 6,
		paddingTop: 2,
		height: 64,
		flex: 0
	},
	flex: {
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 4
	},
	row: {
		flexDirection: "row",
		alignItems: "center"

	}
})