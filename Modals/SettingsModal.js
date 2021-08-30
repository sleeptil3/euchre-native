import React, { useContext, useState } from 'react'
import { View, Modal, StyleSheet, Pressable, ScrollView, Switch } from 'react-native'
import { DataContext } from '../GameContext'
import { Italic, DefaultText, Heading, Title, Subtitle } from '../CoreElements/fontStyles'
import { colors, iconSVGs, styles, themeTable } from '../CoreElements/theme'
import DeckThemeChoice from '../Components/DeckThemeChoice'
import TableThemeChoice from '../Components/TableThemeChoice'

export default function SettingsModal() {
	const { matchStage, setShowStartModal, setShowSettingsModal, showSettingsModal, setShowPromptModal, appPreferences, setAppPreferences, enableSound, setEnableSound } = useContext(DataContext)

	const handleClose = () => {
		if (matchStage === "PREGAME") setShowStartModal(true)
		else setShowPromptModal(true)
		setShowSettingsModal(false)
	}

	const handleToggle = () => {
		setAppPreferences({ ...appPreferences, sounds: !enableSound })
		setEnableSound(!enableSound)
	}

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={showSettingsModal}
		>
			<View style={styles.settingsScreen}>
				<View style={styles.settings}>
					<Pressable onPress={handleClose} style={{ position: "absolute", right: 20, top: -50, opacity: .67 }}>{iconSVGs.close}</Pressable>
					<ScrollView scrollIndicatorInsets={{ right: 4 }} indicatorStyle="white" style={localStyles.modal}>
						<View style={{ margin: 20 }}>
							<View style={{ marginVertical: 10, alignItems: "center" }}>{iconSVGs.settingsLarge}</View>
							<View style={{ marginBottom: 20 }} >
								<Heading align="center">Settings</Heading>
								<Italic align="center">Configure app settings below</Italic>
							</View>
							<View style={{ justifyContent: "center", alignItems: "center", marginVertical: 20 }}>
								<Title override={{ fontSize: 24 }}>Deck Theme</Title>
								<DeckThemeChoice deck="Default" />
								<DeckThemeChoice deck="Year2099" />
							</View>
							<View style={{ justifyContent: "center", alignItems: "center", marginVertical: 20 }}>
								<Title override={{ fontSize: 24 }}>Table Theme</Title>
								{Object.keys(themeTable).map(theme => {
									return <TableThemeChoice key={theme} id={theme} title={themeTable[theme].title} />
								})}
							</View>
							<View style={{ justifyContent: "center", alignItems: "center", marginVertical: 20 }}>
								<Title override={{ fontSize: 24 }}>Sounds</Title>
								<View style={[localStyles.container, { flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingHorizontal: 20 }]} >
									<Switch
										trackColor={{ false: colors.red, true: colors.green }}
										ios_backgroundColor={colors.red}
										onValueChange={handleToggle}
										value={enableSound}
									/>
									<Subtitle align="left" override={{ fontSize: 18, top: 1, paddingLeft: 18 }}>Enable Sounds</Subtitle>
								</View>
							</View>
							<Pressable
								accessibilityLabel={"Close settings"}
								onPress={handleClose}
							>
								<View
									style={{
										justifyContent: "space-around",
										alignItems: "center",
										flexDirection: "row",
										backgroundColor: colors.red,
										borderWidth: 1,
										borderColor: colors.white,
										borderRadius: 40,
										paddingHorizontal: 50,
										paddingVertical: 12,
										marginVertical: 10,
									}}
								>
									<DefaultText align="center">Close</DefaultText>
								</View>
							</Pressable>
						</View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
}

const localStyles = StyleSheet.create({
	modal: {
		width: "100%",
		borderRadius: 32,
		borderWidth: 2,
		borderColor: "rgba(255,255,255,.5)",
		backgroundColor: "rgba(0,0,0,.7)",
	},
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