import React, { useContext } from 'react'
import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native'
import { DataContext } from '../GameContext'
import { Flex } from '../CoreElements/containerStyles'
import { Subtitle, Title, Body } from '../CoreElements/fontStyles'
import { colors } from '../CoreElements/theme'
import Icon from '../CoreElements/icons'
import ControlPanel from '../Components/ControlPanel'
import { blankCard, sleep } from '../Data/data'

// import { BlurView } from 'expo-blur'
// import MaskedView from '@react-native-masked-view/masked-view';

export default function PromptModal() {
	const { showPromptModal, promptText, currentPlayer, yourSeat, playedCards, matchStage } = useContext(DataContext)

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={showPromptModal}
			presentationStyle={"overFullScreen"}
		>
			<View style={{ width: "100%", height: "100%" }}>
				<View style={{ justifyContent: "center", alignItems: "center", position: "absolute", marginHorizontal: 24, bottom: 225, left: 0, right: 0 }}>
					<View style={styles.modal}>
						<Flex justify="space-between" align="center">
							<Title align="center" override={{ marginTop: 5 }}>{promptText.title}</Title>
							<View>
								<Subtitle align="center" override={{ fontSize: 20 }}>{promptText.subtitle}</Subtitle>
								<Body align="center" override={{ fontSize: 15, marginBottom: 10 }}>{promptText.body}</Body>
							</View>
							{promptText.choices.length > 0 && <Flex
								direction="row"
								align="center"
								color="rgba(0,0,0,.75)"
								override={{
									borderWidth: 1,
									borderColor: colors.white,
									borderRadius: 40,
									paddingHorizontal: 2,
									paddingVertical: 4,
									marginBottom: 5
								}}
							>
								{promptText.choices.map(choice => {
									return <Icon key={choice.text} choice={choice} />
								})}
							</Flex>
							}
							{(currentPlayer !== yourSeat && Object.values(playedCards).includes(blankCard) && matchStage !== "RESULT" && matchStage !== "GAMEOVER" && matchStage !== "READY") && <ActivityIndicator style={{ margin: 20, marginTop: 30 }} animating={true} color={colors.white} size="small" />}
							{(currentPlayer === yourSeat || matchStage === "READY" || !Object.values(playedCards).includes(blankCard)) && <ControlPanel />}
						</Flex>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modal: {
		width: "100%",
		paddingVertical: 10,
		borderRadius: 32,
		borderWidth: 2,
		borderColor: "rgba(255,255,255,.5)",
		backgroundColor: "rgba(0,0,0,.75)"
	},
})