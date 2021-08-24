import React, { useContext, useEffect } from 'react'
import { View, Modal, StyleSheet, Pressable, Image } from 'react-native'
import { DataContext } from '../GameContext'
import { Flex } from '../CoreElements/containerStyles'
import { Subtitle, Italic, Body, DefaultText, Heading } from '../CoreElements/fontStyles'
import { colors, themeHands } from '../CoreElements/theme'
import { sleep } from '../Data/data'
import Svg, { Path } from 'react-native-svg'

export default function StartModal() {
	const { deckTheme, setShowRulesModal, setShowSettingsModal, showStartModal, setShowStartModal, setCurrentPlayer, setMatchStage, setTurnCount, dealer, turnCount } = useContext(DataContext)

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

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={showStartModal}
		>
			<Flex align="center" justify="center">
				<View style={styles.modal}>
					<Heading align="center">Euchre</Heading>
					<Italic align="center">Created by Shawn Clary</Italic>
					<View style={{ marginVertical: 10 }}>
						<Image source={themeHands[deckTheme]} />
					</View>
					<Body align="center" override={{ marginBottom: 10 }}>Choose an option:</Body>
					<Pressable
						accessibilityLabel={"Press to begin the game"}
						onPress={handlePlay}
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
								paddingVertical: 16,
								marginVertical: 0,
							}}
						>
							<DefaultText align="center" override={{ fontSize: 24 }}>New Game</DefaultText>
						</View>
					</Pressable>
					<View style={{ width: "85%", alignItems: "center", justifyContent: "center" }}>
						<Pressable
							accessibilityLabel={"View rules"}
							onPress={handleRules}
						>
							<View
								style={{
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "row",
									backgroundColor: "rgba(0, 0, 0, .75)",
									borderWidth: 1,
									borderColor: colors.white,
									borderRadius: 40,
									width: 140,
									paddingVertical: 8,
									marginVertical: 10,
									marginTop: 20,
								}}
							>
								<DefaultText align="center">How to Play</DefaultText>
							</View>
						</Pressable>
						<Pressable
							accessibilityLabel={"Change settings"}
							onPress={handleSettings}
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
									width: 100,
									paddingVertical: 8,
									marginVertical: 10,
									marginTop: 5,
								}}
							>
								<Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<Path d="M9.07104 20H10.929C11.7213 20 12.3497 19.5077 12.5319 18.7511L12.8871 17.2106L13.0874 17.1376L14.4262 17.9581C15.1002 18.3774 15.8925 18.268 16.4481 17.7028L17.7322 16.4266C18.2969 15.8523 18.3971 15.0684 17.9781 14.4029L17.1494 13.072L17.2222 12.8806L18.7523 12.516C19.5082 12.3336 20 11.7046 20 10.9116V9.12489C20 8.34093 19.5082 7.70283 18.7523 7.52051L17.2313 7.14676L17.1585 6.94622L17.9872 5.61531C18.4062 4.95898 18.306 4.17502 17.7322 3.5825L16.4572 2.30629C15.9016 1.75023 15.1093 1.64084 14.4444 2.05105L13.0965 2.87147L12.8871 2.79854L12.5319 1.24886C12.3497 0.492252 11.7213 0 10.929 0H9.07104C8.27869 0 7.65027 0.492252 7.46812 1.24886L7.11293 2.79854L6.89435 2.87147L5.55556 2.05105C4.89071 1.64084 4.09836 1.75023 3.54281 2.30629L2.25865 3.5825C1.69399 4.17502 1.59381 4.95898 2.01275 5.61531L2.84153 6.94622L2.76867 7.14676L1.24772 7.52051C0.482696 7.71194 0 8.34093 0 9.12489V10.9116C0 11.7046 0.491803 12.3336 1.24772 12.516L2.77778 12.8806L2.85064 13.072L2.02186 14.4029C1.60291 15.0684 1.7031 15.8523 2.26776 16.4266L3.55191 17.7028C4.10747 18.268 4.89982 18.3774 5.56466 17.9581L6.91257 17.1376L7.11293 17.2106L7.46812 18.7511C7.65027 19.5077 8.27869 20 9.07104 20ZM9.36248 18.1768C9.20765 18.1768 9.13479 18.1039 9.10747 17.9763L8.57924 15.7429C7.97814 15.6062 7.40437 15.3692 6.92168 15.0501L4.96357 16.2625C4.85428 16.3355 4.74499 16.3263 4.6357 16.2261L3.74317 15.3327C3.64299 15.2325 3.64299 15.1231 3.71585 15.0137L4.92714 13.0538C4.64481 12.5798 4.3898 12.0146 4.2623 11.4221L2.02186 10.8933C1.89435 10.866 1.82149 10.7931 1.82149 10.6381V9.38924C1.82149 9.23428 1.88525 9.17046 2.02186 9.134L4.25319 8.60529C4.3898 7.99453 4.66302 7.40201 4.90893 6.96445L3.70674 5.01367C3.63388 4.88605 3.62477 4.78578 3.73406 4.67639L4.62659 3.80128C4.73588 3.69189 4.83607 3.68277 4.96357 3.7557L6.91257 4.94986C7.34062 4.67639 7.96903 4.41203 8.57924 4.25706L9.10747 2.0237C9.13479 1.89608 9.20765 1.82315 9.36248 1.82315H10.6375C10.7923 1.82315 10.8652 1.89608 10.8925 2.0237L11.4299 4.2753C12.0401 4.41203 12.6047 4.66727 13.0783 4.94986L15.0273 3.76481C15.1548 3.69189 15.255 3.701 15.3643 3.80128L16.2568 4.68551C16.3661 4.78578 16.357 4.89517 16.2842 5.01367L15.0911 6.96445C15.337 7.40201 15.6102 7.99453 15.7377 8.60529L17.9781 9.134C18.1148 9.17046 18.1785 9.23428 18.1785 9.38924V10.6381C18.1785 10.7931 18.1056 10.866 17.9781 10.8933L15.7377 11.4221C15.6011 12.0146 15.3552 12.5889 15.0729 13.0538L16.275 15.0046C16.3479 15.1231 16.3479 15.2233 16.2477 15.3236L15.3552 16.217C15.2459 16.3263 15.1366 16.3263 15.0273 16.2534L13.0783 15.0501C12.5865 15.3692 12.0583 15.5971 11.4299 15.7429L10.8925 17.9763C10.8652 18.113 10.7923 18.1768 10.6375 18.1768H9.36248Z" fill={colors.white} />
									<Path d="M13.0107 7.48151L12.5619 7.29452V10.3097L13.3757 8.35299C13.513 8.01241 13.3556 7.62174 13.0107 7.48151ZM6.48028 8.71695L8.14135 12.7071C8.19026 12.8285 8.27369 12.933 8.38139 13.0077C8.48908 13.0825 8.61633 13.1242 8.7475 13.1278C8.83457 13.1278 8.92499 13.1111 9.01207 13.0744L11.4802 12.056C11.7314 11.9525 11.8854 11.7054 11.8921 11.4583C11.8955 11.3715 11.8787 11.2746 11.8486 11.1878L10.1741 7.19769C10.1268 7.07549 10.0437 6.97032 9.93556 6.89588C9.82745 6.82144 9.69937 6.78117 9.56799 6.78031C9.48091 6.78031 9.39384 6.80034 9.31012 6.8304L6.84531 7.8488C6.68147 7.91569 6.55098 8.04473 6.48253 8.20752C6.41408 8.37032 6.41327 8.55356 6.48028 8.71695ZM11.8888 7.44812C11.8888 7.271 11.8182 7.10114 11.6926 6.97591C11.567 6.85067 11.3966 6.78031 11.219 6.78031H10.7334L11.8888 9.56506" fill={colors.white} />
								</Svg>
							</View>
						</Pressable>
					</View>
				</View>
			</Flex>
		</Modal>
	)
}
// { [styles.icon, { accessibilityLabel: altText }] }
const styles = StyleSheet.create({
	modal: {
		width: "90%",
		paddingVertical: 22,
		borderRadius: 32,
		borderWidth: 2,
		borderColor: "rgba(255,255,255,.5)",
		backgroundColor: "rgba(0,0,0,.5)",
		justifyContent: "space-between",
		alignItems: "center"
	},
})