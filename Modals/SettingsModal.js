import React, { useContext } from 'react'
import { View, Modal, StyleSheet, Pressable, ScrollView } from 'react-native'
import { DataContext } from '../GameContext'
import { Italic, DefaultText, Heading, Title } from '../CoreElements/fontStyles'
import { colors, iconSVGs, styles } from '../CoreElements/theme'
import DeckThemeChoice from '../Components/DeckThemeChoice'

export default function SettingsModal() {
	const { showActionPrompt, setShowActionPrompt, matchStage, setShowStartModal, setShowSettingsModal, showSettingsModal, setShowPromptModal } = useContext(DataContext)

	const handleClose = () => {
		if (matchStage === "PREGAME") setShowStartModal(true)
		else setShowPromptModal(true)
		setShowSettingsModal(false)
	}

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={showSettingsModal}
		>
			<View style={styles.settingsScreen}>
				<View style={styles.settings}>
					<ScrollView style={localStyles.modal}>
						<View style={{ margin: 20 }}>
							<View style={{ marginVertical: 10, alignItems: "center" }}>{iconSVGs.settingsLarge}</View>
							<View style={{ marginBottom: 20 }} >
								<Heading align="center">Settings</Heading>
								<Italic align="center">Configure app settings below</Italic>
							</View>
							<View style={{ justifyContent: "center", alignItems: "center", marginVertical: 20 }}>
								<Title override={{ fontSize: 24 }}>Deck Theme</Title>
								<DeckThemeChoice deck="Default" />
								<DeckThemeChoice deck="QueenG" />
							</View>
							<Pressable
								accessibilityLabel={"Press to begin the game"}
								onPress={handleClose}
							>
								<View
									style={{
										justifyContent: "space-around",
										alignItems: "center",
										flexDirection: "row",
										backgroundColor: "rgba(0, 0, 0, .75)",
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
})