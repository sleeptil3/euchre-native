import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Body, DefaultText, Subtitle } from '../CoreElements/fontStyles'
import { DataContext } from "../GameContext"
import { iconSVGs, colors } from '../CoreElements/theme'


export default function TrumpIndicator() {
	const { trump, callingPlayer } = useContext(DataContext)

	const styles = StyleSheet.create({
		container: {
			alignItems: "center",
			justifyContent: "center",
			opacity: .6,
			borderWidth: 1,
			borderColor: colors.white,
			borderRadius: 10,
			paddingVertical: 6,
			paddingHorizontal: 6,
			paddingTop: 2,
			height: 64
		},
		caller: {
			position: "absolute",
			backgroundColor: callingPlayer % 2 === 0 ? colors.green : colors.yellow,
			height: 14,
			top: -15,
			borderTopLeftRadius: 5,
			borderTopRightRadius: 5
		}
	})

	return (
		<View style={styles.container}>
			<View style={styles.caller}>
				<DefaultText override={{ color: colors.black, fontSize: 12, paddingHorizontal: 4 }}>{callingPlayer % 2 === 0 ? "You" : "Them"}</DefaultText>
			</View>
			<DefaultText align="center" override={{ fontSize: 15, marginBottom: 2 }}>Trump</DefaultText>
			{
				trump.code === "h" ? iconSVGs.heartFilled
					: trump.code === "c" ? iconSVGs.clubFilled
						: trump.code === "d" ? iconSVGs.diamondFilled
							: iconSVGs.spadeFilled
			}
		</View>
	)
}