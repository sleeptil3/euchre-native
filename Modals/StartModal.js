import React, { useContext, useEffect } from 'react'
import { View, Modal, StyleSheet, Pressable, Image } from 'react-native'
import { DataContext } from '../GameContext'
import { Flex } from '../CoreElements/containerStyles'
import { Italic, Body, DefaultText, MainTitle } from '../CoreElements/fontStyles'
import { colors, iconSVGs, themeHands } from '../CoreElements/theme'
import ShareButton from '../Components/ShareButton'
import * as StoreReview from 'expo-store-review';

export default function StartModal() {
	const { gameplayCount, appPreferences, setShowRulesModal, setShowSettingsModal, showStartModal, setShowStartModal, setCurrentPlayer, setMatchStage, setTurnCount, dealer, turnCount } = useContext(DataContext)

	const handlePlay = () => {
		setShowStartModal(false)
		setCurrentPlayer((dealer + 1) % 4)
		setMatchStage("NEWGAME")
		setTurnCount(turnCount - 1)
	}

	const handleRules = () => {
		setShowStartModal(false)
		setShowRulesModal(true)
	}

	const handleSettings = () => {
		setShowSettingsModal(true)
		setShowStartModal(false)
	}

	const handleStoreReview = async () => {
		await StoreReview.hasAction() && StoreReview.requestReview()
	}

	useEffect(() => {
		gameplayCount > 0 && handleStoreReview()
	}, [ gameplayCount ])

	return (
		<Modal
			animationType="slide"
			transparent={ true }
			visible={ showStartModal }
		>
			<Flex align="center" justify="center" override={ {
				shadowRadius: 10,
				shadowColor: colors.black,
				shadowOpacity: 1,
				shadowOffset: { width: 4, height: 4 }
			} }>
				<View style={ styles.modal }>
					<MainTitle>Euchre Night</MainTitle>
					<Italic align="center">Created by Shawn Clary</Italic>
					<View style={ { marginVertical: 10 } }>
						<Image source={ appPreferences.deckTheme ? themeHands[ appPreferences.deckTheme ] : themeHands.Default } />
					</View>
					<Body align="center" override={ { marginBottom: 10 } }>Choose an option:</Body>
					<Pressable
						accessibilityLabel={ "Begin a new game" }
						onPress={ handlePlay }
					>
						<View
							style={ {
								justifyContent: "space-around",
								alignItems: "center",
								flexDirection: "row",
								backgroundColor: colors.red,
								borderWidth: 1,
								borderColor: colors.white,
								borderRadius: 40,
								paddingHorizontal: 50,
								paddingVertical: 16,
								marginVertical: 0,
							} }
						>
							<DefaultText align="center" override={ { fontSize: 24, fontFamily: "SFPro-Bold" } }>New Game</DefaultText>
						</View>
					</Pressable>
					<View style={ { width: "85%", alignItems: "center", justifyContent: "center" } }>
						<Pressable
							accessibilityLabel={ "View the rules" }
							onPress={ handleRules }
							style={ { marginVertical: 10, marginTop: 20, } }
						>
							<View
								style={ {
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "row",
									borderWidth: 1,
									borderColor: colors.white,
									borderRadius: 40,
									width: 140,
									paddingVertical: 8,
								} }
							>
								<DefaultText align="center">How to Play</DefaultText>
							</View>
						</Pressable>
						<View
							style={ {
								justifyContent: "space-between",
								alignItems: "flex-end",
								flexDirection: "row",
								marginVertical: 10,
								width: "35%"
							} }
						>
							<ShareButton styles={ styles } />
							<Pressable
								accessibilityLabel={ "Change settings" }
								onPress={ handleSettings }
								style={ styles.icon }
							>
								{ iconSVGs.settingsMedium }
							</Pressable>
						</View>
					</View>
				</View>
			</Flex>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modal: {
		width: "90%",
		paddingVertical: 22,
		paddingTop: 32,
		borderRadius: 32,
		borderWidth: 2,
		borderColor: "rgba(255,255,255,.5)",
		backgroundColor: "rgba(0,0,0,.5)",
		justifyContent: "space-between",
		alignItems: "center"
	},
	icon: {
		paddingVertical: 10,
		paddingHorizontal: 12,
		opacity: .7
	}
})