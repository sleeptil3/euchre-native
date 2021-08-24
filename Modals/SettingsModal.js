import React, { useContext } from 'react'
import { View, Modal, StyleSheet, Pressable, Image, ScrollView } from 'react-native'
import { DataContext } from '../GameContext'
import { Flex } from '../CoreElements/containerStyles'
import { Subtitle, Italic, Body, DefaultText, Heading, Title } from '../CoreElements/fontStyles'
import { colors, iconSVGs, styles } from '../CoreElements/theme'
import Svg, { Path } from 'react-native-svg'
import DeckTheme from '../Components/DeckTheme'

export default function SettingsModal() {
	const { setShowStartModal, setShowSettingsModal, showSettingsModal, setDeckTheme, deckTheme } = useContext(DataContext)

	const handleClose = () => {
		setShowStartModal(true)
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

							<View style={{ marginVertical: 10, alignItems: "center" }} >
								<Svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
									<Path d="M31.2951 69H37.7049C40.4385 69 42.6066 67.3017 43.235 64.6914L44.4604 59.3765L45.1516 59.1249L49.7705 61.9553C52.0956 63.402 54.8292 63.0246 56.7459 61.0747L61.1762 56.6718C63.1243 54.6905 63.4699 51.9859 62.0246 49.6901L59.1653 45.0984L59.4167 44.438L64.6954 43.18C67.3033 42.551 69 40.381 69 37.6449V31.4809C69 28.7762 67.3033 26.5747 64.6954 25.9458L59.4481 24.6563L59.1967 23.9644L62.056 19.3728C63.5014 17.1085 63.1557 14.4038 61.1762 12.3596L56.7773 7.9567C54.8607 6.03829 52.1271 5.66089 49.8333 7.07612L45.1831 9.90656L44.4604 9.65497L43.235 4.30857C42.6066 1.69827 40.4385 0 37.7049 0H31.2951C28.5615 0 26.3934 1.69827 25.765 4.30857L24.5396 9.65497L23.7855 9.90656L19.1667 7.07612C16.873 5.66089 14.1393 6.03829 12.2227 7.9567L7.79235 12.3596C5.84426 14.4038 5.49863 17.1085 6.94399 19.3728L9.80328 23.9644L9.55191 24.6563L4.30464 25.9458C1.6653 26.6062 0 28.7762 0 31.4809V37.6449C0 40.381 1.69672 42.551 4.30464 43.18L9.58333 44.438L9.8347 45.0984L6.97541 49.6901C5.53005 51.9859 5.87568 54.6905 7.82377 56.6718L12.2541 61.0747C14.1708 63.0246 16.9044 63.402 19.1981 61.9553L23.8484 59.1249L24.5396 59.3765L25.765 64.6914C26.3934 67.3017 28.5615 69 31.2951 69ZM32.3005 62.7101C31.7664 62.7101 31.515 62.4585 31.4208 62.0182L29.5984 54.3131C27.5246 53.8414 25.5451 53.0237 23.8798 51.923L17.1243 56.1057C16.7473 56.3573 16.3702 56.3259 15.9932 55.9799L12.9139 52.8979C12.5683 52.552 12.5683 52.1746 12.8197 51.7972L16.9986 45.0356C16.0246 43.4002 15.1448 41.4503 14.7049 39.4061L6.97541 37.582C6.53552 37.4877 6.28415 37.2361 6.28415 36.7015V32.3929C6.28415 31.8582 6.5041 31.6381 6.97541 31.5123L14.6735 29.6882C15.1448 27.5811 16.0874 25.5369 16.9358 24.0273L12.7883 17.2972C12.5369 16.8569 12.5055 16.5109 12.8825 16.1335L15.9617 13.1144C16.3388 12.737 16.6844 12.7056 17.1243 12.9572L23.8484 17.077C25.3251 16.1335 27.4932 15.2215 29.5984 14.6869L31.4208 6.98177C31.515 6.54148 31.7664 6.28988 32.3005 6.28988H36.6995C37.2336 6.28988 37.485 6.54148 37.5792 6.98177L39.4331 14.7498C41.5383 15.2215 43.4863 16.1021 45.1202 17.077L51.8443 12.9886C52.2842 12.737 52.6298 12.7685 53.0068 13.1144L56.0861 16.165C56.4631 16.5109 56.4317 16.8883 56.1803 17.2972L52.0642 24.0273C52.9126 25.5369 53.8552 27.5811 54.2951 29.6882L62.0246 31.5123C62.4959 31.6381 62.7158 31.8582 62.7158 32.3929V36.7015C62.7158 37.2361 62.4645 37.4877 62.0246 37.582L54.2951 39.4061C53.8238 41.4503 52.9754 43.4316 52.0014 45.0356L56.1489 51.7657C56.4003 52.1746 56.4003 52.5205 56.0546 52.8665L52.9754 55.9485C52.5984 56.3259 52.2213 56.3259 51.8443 56.0743L45.1202 51.923C43.4235 53.0237 41.6011 53.8099 39.4331 54.3131L37.5792 62.0182C37.485 62.49 37.2336 62.7101 36.6995 62.7101H32.3005Z" fill={colors.white} />
									<Path d="M44.8868 25.8112L43.3386 25.1661V35.5683L46.1462 28.8178C46.6199 27.6428 46.0769 26.295 44.8868 25.8112ZM22.357 30.0735L28.0876 43.8394C28.2564 44.2583 28.5442 44.6188 28.9158 44.8767C29.2873 45.1346 29.7264 45.2785 30.1789 45.2909C30.4793 45.2909 30.7912 45.2333 31.0916 45.1066L39.6068 41.5931C40.4733 41.236 41.0048 40.3836 41.0279 39.5311C41.0394 39.2316 40.9817 38.8975 40.8777 38.598L35.1008 24.832C34.9375 24.4104 34.6507 24.0476 34.2777 23.7908C33.9047 23.534 33.4628 23.395 33.0096 23.3921C32.7092 23.3921 32.4088 23.4612 32.1199 23.5649L23.6163 27.0784C23.0511 27.3091 22.6009 27.7543 22.3647 28.316C22.1286 28.8776 22.1258 29.5098 22.357 30.0735ZM41.0163 25.696C41.0163 25.085 40.7729 24.4989 40.3395 24.0669C39.9062 23.6348 39.3184 23.3921 38.7056 23.3921H37.0303L41.0163 32.9995" fill={colors.white} />
								</Svg>
							</View>
							<View style={{ marginBottom: 20 }} >
								<Heading align="center">Settings</Heading>
								<Italic align="center">Configure app settings below</Italic>
							</View>
							<View style={{ justifyContent: "center", alignItems: "center", marginVertical: 20 }}>
								<Title override={{ fontSize: 24 }}>Deck Theme</Title>
								<DeckTheme deck="Default" />
								<DeckTheme deck="QueenG" />
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
		backgroundColor: "rgba(0,0,0,.5)",
	},
})