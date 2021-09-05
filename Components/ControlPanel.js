import React, { useContext } from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import { iconSVGs } from '../CoreElements/theme'
import { DataContext } from '../GameContext'

export default function ControlPanel() {
	const { setShowHelpModal, setShowSettingsModal, setShowPromptModal } = useContext(DataContext)

	const handleSettings = () => {
		setShowPromptModal(false)
		setShowSettingsModal(true)
	}

	const handleHelp = () => {
		setShowPromptModal(false)
		setShowHelpModal(true)
	}

	return (
		<View style={ localStyles.panel }>
			<Pressable
				onPress={ handleHelp }
			>
				{ iconSVGs.help }
			</Pressable>
			<Pressable
				onPress={ handleSettings }
			>
				{ iconSVGs.settingsMedium }
			</Pressable>
		</View>
	)
}

const localStyles = StyleSheet.create({
	panel: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 14,
		opacity: .67
	}
})