import React, { useContext } from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import { DataContext } from '../GameContext'
import { Flex } from '../CoreElements/containerStyles'
import { Subtitle, Title, Body } from '../CoreElements/fontStyles'
import { colors } from '../CoreElements/theme'
import Icon from '../CoreElements/icons'
import { v4 as uuid } from 'uuid';

// import { BlurView } from 'expo-blur'
// import MaskedView from '@react-native-masked-view/masked-view';

export default function PromptModal() {
	const { showPromptModal, promptText } = useContext(DataContext)

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={showPromptModal}
		>
			<View style={{ justifyContent: "center", alignItems: "center", position: "absolute", marginHorizontal: 24, bottom: 225, left: 0, right: 0 }}>
				<View style={styles.modal} tint="dark" intensity={60}>
					<Flex justify="space-between" align="center">
						<Title align="center">{promptText.title}</Title>
						<View>
							<Subtitle align="center" override={{ fontSize: 22 }}>{promptText.subtitle}</Subtitle>
							<Body align="center">{promptText.body}</Body>
						</View>
						{promptText.choices.length > 0 && <Flex
							direction="row"
							align="center"
							color="rgba(0,0,0,.75)"
							override={{
								borderWidth: 1,
								borderColor: colors.white,
								borderRadius: 40,
								paddingHorizontal: 8,
								paddingVertical: 8,
								marginVertical: 10
							}}
						>
							{promptText.choices.map(choice => {
								return <Icon key={uuid()} choice={choice} />
							})}
						</Flex>
						}
					</Flex>
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
		backgroundColor: "rgba(0,0,0,.5)"
	},
})