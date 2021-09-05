import React, { useContext, useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Subtitle } from '../CoreElements/fontStyles'
import { DataContext } from "../GameContext"
import { iconSVGs, colors } from '../CoreElements/theme'

export default function TableThemeChoice({ id, title }) {
	const { appPreferences, setAppPreferences } = useContext(DataContext)

	const handleThemeChange = () => {
		setAppPreferences({ ...appPreferences, tableTheme: id })
	}

	const styles = StyleSheet.create({
		container: {
			alignItems: "center",
			justifyContent: "center",
			borderWidth: 1,
			borderColor: colors.white,
			borderRadius: 14,
			padding: 10,
			marginVertical: 10,
			width: 250
		},
	})

	return (
		<Pressable onPress={ appPreferences.tableTheme !== id ? handleThemeChange : null }>
			<View style={ [ styles.container, { flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingHorizontal: 20 } ] }>
				{ appPreferences.tableTheme === id ? iconSVGs.toggleOn : iconSVGs.toggleOff }
				<Subtitle align="left" override={ { fontSize: 18, top: 1, paddingLeft: 18 } }>{ title }</Subtitle>
			</View>
		</Pressable>
	)
}