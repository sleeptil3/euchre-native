import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { DefaultText, Subtitle, Title } from '../CoreElements/fontStyles'
import { DataContext } from "../GameContext"
import { colors } from '../CoreElements/theme'

export default function MatchTricksCount() {
	const { matchTricks, callingPlayer, teamScore, opponentScore, matchStage, showHelpModal } = useContext(DataContext)

	const styles = StyleSheet.create({
		container: {
			alignItems: "center",
			justifyContent: "center",
			opacity: showHelpModal ? .6 : teamScore > 0 || opponentScore > 0 || matchStage === "READY" || matchStage === "PLAY" ? .6 : 0,
			borderWidth: 1,
			borderColor: colors.white,
			borderRadius: 10,
			paddingVertical: 4,
			paddingHorizontal: 4,
			height: 72,
			width: 78,
			backgroundColor: colors.black,
			left: -4
		},
		panel: {
			position: "absolute",
			top: -16.5,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		panelItem: {
			borderTopLeftRadius: 6,
			borderTopRightRadius: 6,
			marginRight: 2,
			marginLeft: 2,
			paddingHorizontal: 2,
			borderColor: colors.white,
			backgroundColor: colors.black
		},
		score: {
			alignItems: "center",
			justifyContent: "center",
			padding: 5,
			paddingHorizontal: 10,
			width: 32,
			height: 32,
			borderColor: "rgba(255,255,255,.3)"
		},
		flex: {
			justifyContent: "space-between",
			alignItems: "center",
			paddingHorizontal: 4
		},
		row: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
		}
	})

	return (
		<View style={styles.container}>
			<View style={[styles.panel, { top: null, right: -27, transform: [{ rotate: "90deg" }] }]}>
				<View style={[styles.panelItem, { backgroundColor: "transparent" }]}>
					<Subtitle align="center" override={{ fontSize: 8, marginBottom: 0 }}>Game</Subtitle>
				</View>
				<View style={[styles.panelItem, { marginLeft: 0, backgroundColor: "transparent" }]}>
					<Subtitle align="center" override={{ fontSize: 8, marginBottom: 0, marginLeft: 3 }}>Match</Subtitle>
				</View>
			</View>
			<View style={[styles.row, { marginTop: 0, marginRight: 8, left: 2 }]}>
				<View style={[styles.score, { borderRightWidth: .5, borderBottomWidth: .5 }]}>
					<DefaultText align="center" override={{ fontSize: 16 }}>{teamScore}</DefaultText>
				</View>
				<View style={[styles.score, { borderLeftWidth: .5, borderBottomWidth: .5 }]}>
					<DefaultText align="center" override={{ fontSize: 16 }}>{opponentScore}</DefaultText>
				</View>
			</View>
			<View style={[styles.row, { marginBottom: 0, marginRight: 8, left: 2 }]}>
				<View style={[styles.score, { borderRightWidth: .5, borderTopWidth: .5 }]}>
					<DefaultText align="center" override={{ fontSize: 16 }}>{callingPlayer % 2 === 0 ? matchTricks.callingTeam : matchTricks.opposingTeam}</DefaultText>
				</View>
				<View style={[styles.score, { borderLeftWidth: .5, borderTopWidth: .5 }]}>
					<DefaultText align="center" override={{ fontSize: 16 }}>{callingPlayer % 2 === 0 ? matchTricks.opposingTeam : matchTricks.callingTeam}</DefaultText>
				</View>
			</View>
			<View style={[styles.panel, { right: 8.5 }]}>
				<View style={[styles.panelItem, { borderWidth: .5, borderBottomWidth: 0 }]}>
					<Title align="center" override={{ fontSize: 9, padding: 2, marginBottom: 0 }}>You</Title>
				</View>
				<View style={[styles.panelItem, { borderWidth: .5, borderBottomWidth: 0 }]}>
					<Title align="center" override={{ fontSize: 9, padding: 2, marginBottom: 0 }}>Opp</Title>
				</View>
			</View>
		</View>
	)
}