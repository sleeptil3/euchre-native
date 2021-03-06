import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { DefaultText } from '../CoreElements/fontStyles'
import { DataContext } from "../GameContext"
import { iconSVGs, colors } from '../CoreElements/theme'


export default function TrumpIndicator() {
	const { trump, callingPlayer, showHelpModal } = useContext(DataContext)

	const styles = StyleSheet.create({
		container: {
			alignItems: "center",
			justifyContent: "center",
			opacity: showHelpModal ? .6 : trump.code === undefined ? 0 : .6,
			borderWidth: 1,
			borderColor: colors.white,
			borderRadius: 10,
			paddingVertical: 6,
			paddingHorizontal: 6,
			paddingTop: 2,
			height: 64,
			left: 12,
			backgroundColor: colors.black
		},
		indicator: {
			position: "absolute",
			top: callingPlayer === 2 ? -19 : null,
			bottom: callingPlayer === 0 ? -19 : null,
			left: showHelpModal ? -19 : callingPlayer === 1 ? -19 : null,
			right: callingPlayer === 3 ? -19 : null,
			transform: [ { rotate: showHelpModal ? "-90deg" : callingPlayer === 1 ? "-90deg" : callingPlayer === 3 ? "90deg" : callingPlayer === 0 ? "180deg" : 0 } ]
		}
	})

	return (
		<View style={ styles.container }>
			<View style={ styles.indicator }>
				{ iconSVGs.indicator }
			</View>
			<DefaultText align="center" override={ { fontSize: 15, marginBottom: 2 } }>Trump</DefaultText>
			{
				trump.code === "h" ? iconSVGs.heartFilled
					: trump.code === "c" ? iconSVGs.clubFilled
						: trump.code === "d" ? iconSVGs.diamondFilled
							: iconSVGs.spadeFilled
			}
		</View>
	)
}