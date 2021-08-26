import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Flex } from '../CoreElements/containerStyles';
import PlayerHand from './PlayerHand';
import DownHands from './DownHands';
import TrumpStack from './TrumpStack';
import PromptModal from '../Modals/PromptModal';
import PromptAction from '../Modals/PromptAction';
import { styles, iconSVGs } from '../CoreElements/theme';
import { DataContext } from "../GameContext";
import StartModal from '../Modals/StartModal';
import PlayField from './PlayField';
import GameOverModal from '../Modals/GameOverModal';
import TrumpIndicator from '../Components/TrumpIndicator';
import MatchTricksCount from './MatchTricksCount';
import SettingsModal from '../Modals/SettingsModal';
import RulesModal from '../Modals/RulesModal';
import HelpModal from '../Modals/HelpModal';
import { sleep } from '../Data/data';

export default function GameLayer() {
	const { matchStage, showDeal, matchTricks, showActionPrompt, yourSeat, dealer } = useContext(DataContext)
	const [showPlayerHand, setShowPlayerHand] = useState(false)
	const localStyles = StyleSheet.create({
		hud: {
			position: "absolute",
			width: "100%",
			top: 80,
			flexDirection: "row",
			justifyContent: "space-between",
			paddingHorizontal: 26,
			opacity: (matchStage === "PLAY" || matchStage === "RESULT") && matchTricks.callingTeam + matchTricks.opposingTeam !== 5 ? 1 : 0
		}
	})

	useEffect(() => {
		matchStage === "DEAL" && sleep(3500).then(() => setShowPlayerHand(true))
	}, [matchStage])

	return (
		<SafeAreaView style={styles.screen}>
			<GameOverModal />
			<StartModal />
			<SettingsModal />
			<RulesModal />
			<HelpModal />
			<PromptModal />
			{showActionPrompt && <PromptAction />}
			<View style={localStyles.hud}>
				<MatchTricksCount />
				<TrumpIndicator />
			</View>
			{matchStage !== "PREGAME" &&
				<Flex fill={2} align="center" justify="center" height="100%" width="100%">
					{showDeal && <DownHands />}
					<Flex align="center" justify="center" height="100%" width="100%" override={{ position: "absolute", bottom: 20 }}>
						{(matchStage !== "PLAY" || matchStage !== "RESULT" || matchStage !== "GAMEOVER") ? <TrumpStack /> : null}
						{matchStage === "PLAY" && <PlayField />}
					</Flex>
				</Flex>
			}
			<Flex fill={1} align="center" height="100%" width="100%">
				{showPlayerHand && <PlayerHand />}
			</Flex>
			{yourSeat === dealer && (matchStage !== 'PREGAME' && matchStage !== 'RESULT') && <View style={{ position: "absolute", left: 14, bottom: 14 }}>
				{iconSVGs.dealerIcon}
			</View>}
		</SafeAreaView>
	)
}