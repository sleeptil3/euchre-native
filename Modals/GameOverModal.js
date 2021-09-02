import React, { useContext, useState, useEffect } from 'react'
import { View, Modal, StyleSheet, Pressable, Linking } from 'react-native'
import { DataContext } from '../GameContext'
import { Flex } from '../CoreElements/containerStyles'
import { Subtitle, Title, Body, DefaultText } from '../CoreElements/fontStyles'
import { colors } from '../CoreElements/theme'
import ShareButton from '../Components/ShareButton'
import { ButtonURLLink } from '../CoreElements/buttonStyles'

export default function GameOverModal() {
	const { showGameOverModal, teamScore, opponentScore, resetGame } = useContext(DataContext)
	const [linkSupported, setLinkSupported] = useState(false)
	const url = "mailto:sleeptil3software@gmail.com?subject=Euchre iOS App Feedback"

	const checkLink = async () => {
		const supported = await Linking.canOpenURL(url);
		if (supported) {
			setLinkSupported(true)
		} else {
			setLinkSupported(false)
		}
	}

	useEffect(() => {
		checkLink()
	}, [])

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={showGameOverModal}
		>
			<Flex align="center" justify="center">
				<View style={styles.modal}>
					<Title align="center">Game Over</Title>
					<View>
						<Subtitle align="center">{teamScore > opponentScore ? "Your Team Won!" : "The Other Team Won..."}</Subtitle>
						<Body align="center">{`The final score was ${teamScore} to ${opponentScore}`}</Body>
						<Subtitle align="center" override={{ fontSize: 20, marginBottom: 10, marginTop: 10 }}>Thank you for playing Euchre!</Subtitle>
						<Body>If you enjoyed the game, please share it with your friends using the 'Share' button below.</Body>
						<Body>If you have a moment to rate the app and leave a review on the AppStore, I'd really appreciate it. Let's bring the joy of Euchre to everyone!</Body>
					</View>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "rgba(0, 0, 0, .75)",
							borderWidth: 1,
							borderColor: colors.white,
							borderRadius: 40,
							paddingHorizontal: 20,
							paddingVertical: 8,
							marginVertical: 10,
							marginTop: 20
						}}
					>
						<Pressable
							hitSlop={40}
							accessibilityLabel={"Go back to the start screen"}
							onPress={resetGame}
						>
							<DefaultText align="center">Close</DefaultText>
						</Pressable>
					</View>
					<ShareButton styles={{
						icon: {
							paddingVertical: 10,
							paddingHorizontal: 10,
							opacity: .7,
						}
					}} />
					{linkSupported && <ButtonURLLink url={url} override={{ fontSize: 16, marginTop: 10, color: colors.white, opacity: .7 }}>Submit Feedback</ButtonURLLink>}
				</View>
			</Flex>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modal: {
		width: "90%",
		paddingVertical: 22,
		paddingHorizontal: 16,
		borderRadius: 32,
		borderWidth: 2,
		borderColor: "rgba(255,255,255,.5)",
		backgroundColor: "rgba(0,0,0,.5)",
		justifyContent: "space-between",
		alignItems: "center"
	},
})