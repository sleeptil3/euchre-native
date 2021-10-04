import React, { useContext, useState, useEffect } from 'react';
import { View, Modal, StyleSheet, Pressable } from 'react-native';
import { DataContext } from '../GameContext';
import { Flex } from '../CoreElements/containerStyles';
import { Subtitle, Title, Body, DefaultText } from '../CoreElements/fontStyles';
import { colors } from '../CoreElements/theme';
import ShareButton from '../Components/ShareButton';
import { ButtonURLLink } from '../CoreElements/buttonStyles';
import { Audio } from "expo-av";
import { sounds } from '../Data/data';

export default function GameOverModal() {
	const { showGameOverModal, teamScore, opponentScore, resetGame, enableSound } = useContext(DataContext)

	async function playWin() {
		const { sound } = await Audio.Sound.createAsync(
			sounds.win,
			{ isMuted: !enableSound, volume: 0.4 }
		)
		await sound.playAsync()
	}

	async function playLose() {
		const { sound } = await Audio.Sound.createAsync(
			sounds.lose,
			{ isMuted: !enableSound, volume: 0.4 }
		)
		await sound.playAsync()
	}

	return (
		<Modal
			animationType="slide"
			transparent={ true }
			visible={ showGameOverModal }
			onShow={ teamScore > opponentScore ? playWin : playLose }
		>
			<Flex align="center" justify="center">
				<View style={ styles.modal }>
					<Title align="center">Game Over</Title>
					<View style={ { paddingHorizontal: 2 } }>
						<Subtitle align="center">{ teamScore > opponentScore ? "Your Team Won!" : "The Other Team Won" }</Subtitle>
						<Body align="center">{ `The final score was ${ teamScore } to ${ opponentScore }` }</Body>
						<Subtitle align="center" override={ { fontSize: 20, marginBottom: 14, marginTop: 10 } }>Thank you for playing Euchre!</Subtitle>
						<Body>If you enjoyed the game, please share it with your friends using the 'Share' icon below. A rating and review on the AppStore would also be much appreciated!</Body>
						<Body>If came across any issues while playing the game, please open a support ticket using the link below:</Body>
						<ButtonURLLink url={ 'https://www.sleeptil3software.com/#/euchrenight/support' } align="center" override={ { fontSize: 16, marginTop: -10, opacity: .7, marginBottom: 20, color: colors.white } }>Submit Feedback</ButtonURLLink>
						<Subtitle align="center" override={ { fontSize: 16, lineHeight: 28, marginBottom: 10, marginTop: 0 } }>Let's bring the joy of Euchre to everyone!</Subtitle>
					</View>
					<ShareButton styles={ {
						icon: {
							paddingVertical: 10,
							paddingHorizontal: 10,
							opacity: .7,
						}
					} } />
					<View
						style={ {
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "rgba(0, 0, 0, .75)",
							borderWidth: 1,
							borderColor: colors.white,
							borderRadius: 40,
							paddingHorizontal: 20,
							paddingVertical: 8,
							marginVertical: 20,
						} }
					>
						<Pressable
							hitSlop={ 40 }
							accessibilityLabel={ "Go back to the start screen" }
							onPress={ resetGame }
						>
							<DefaultText align="center" override={ { fontSize: 20, paddingHorizontal: 10 } }>Close</DefaultText>
						</Pressable>
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
		paddingHorizontal: 16,
		borderRadius: 32,
		borderWidth: 2,
		borderColor: "rgba(255,255,255,.5)",
		backgroundColor: "rgba(0,0,0,.5)",
		justifyContent: "space-between",
		alignItems: "center"
	},
})