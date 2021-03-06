import React, { useContext } from 'react'
import { View, Modal, StyleSheet, Pressable, ScrollView } from 'react-native'
import { DataContext } from '../GameContext'
import { Title, Body, DefaultText, Heading } from '../CoreElements/fontStyles'
import { colors, iconSVGs, styles } from '../CoreElements/theme'
import MatchTricksCount from '../Components/MatchTricksCount'
import TrumpIndicator from '../Components/TrumpIndicator'

export default function HelpModal() {
	const { showHelpModal, setShowHelpModal, setShowPromptModal, showActionPrompt } = useContext(DataContext)

	const handleClose = () => {
		setShowHelpModal(false)
		!showActionPrompt && setShowPromptModal(true)
	}

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={showHelpModal}
		>
			<View style={styles.settingsScreen}>
				<View style={styles.settings}>
					<Pressable onPress={handleClose} style={{ position: "absolute", right: 20, top: -50, opacity: .67 }}>{iconSVGs.close}</Pressable>
					<ScrollView scrollIndicatorInsets={{ right: 4 }} indicatorStyle="white" style={localStyles.modal}>
						<View style={{ margin: 20 }}>
							<View style={{ marginVertical: 10, alignItems: "center" }}>{iconSVGs.helpLarge}</View>
							<View style={{ marginBottom: 0 }} >
								<Heading align="center">Help</Heading>
							</View>
							<View style={{ marginVertical: 30, alignItems: "center" }}>
								<Title override={{ fontSize: 24 }}>Interface Icons</Title>
								<View style={{ marginTop: 10, alignItems: "center" }}>
									<Title override={{ fontSize: 18 }}>Play Choices</Title>
									<View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "center", marginTop: 5 }}>
										<View style={{ alignItems: "center", justifyContent: "center", paddingHorizontal: 10 }}>
											{iconSVGs.upOutlined}
											<Body>Order Up</Body>
										</View>
										<View style={{ alignItems: "center", justifyContent: "center", paddingHorizontal: 10 }}>
											{iconSVGs.passOutlined}
											<Body>Pass</Body>
										</View>
										<View style={{ alignItems: "center", justifyContent: "center", paddingHorizontal: 10 }}>
											{iconSVGs.okOutlined}
											<Body>Continue</Body>
										</View>
									</View>
								</View>
								<View style={{ marginTop: 10, alignItems: "center" }}>
									<Title override={{ fontSize: 18 }}>Match Tricks</Title>
									<View style={{ alignItems: "center", marginVertical: 10 }}>
										<MatchTricksCount />
									</View>
									<Body>Shows how many tricks each team has won so far in the current match</Body>
								</View>
								<View style={{ marginTop: 10, alignItems: "center" }}>
									<Title override={{ fontSize: 18 }}>Trump Indicator</Title>
									<View style={{ alignItems: "center", marginBottom: 10 }}>
										<TrumpIndicator />
									</View>
									<Body>Shows what Trump is for the match as well as an arrow that indicates which player called trump.</Body>
								</View>
							</View>
							<Pressable
								accessibilityLabel={"Close help window"}
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
										marginBottom: 20
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
		backgroundColor: "rgba(0,0,0,.75)",
	},
})