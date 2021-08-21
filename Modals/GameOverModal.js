import React, { useContext } from 'react'
import { View, Modal, StyleSheet, Pressable } from 'react-native'
import { DataContext } from '../GameContext'
import { Flex } from '../CoreElements/containerStyles'
import { Subtitle, Title, Body, DefaultText } from '../CoreElements/fontStyles'
import { colors } from '../CoreElements/theme'

export default function GameOverModal() {
	const { showGameOverModal, teamScore, opponentScore, resetGame } = useContext(DataContext)

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
							accessibilityLabel={"Press to begin the game again"}
							onPress={resetGame}
						>
							<DefaultText align="center">Play Again</DefaultText>
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