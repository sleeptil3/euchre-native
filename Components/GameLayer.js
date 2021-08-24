import React, { useContext } from 'react';
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
// import CallingTeamIndicator from './CalllingTeamIndicator';
// import GameScore from './GameScore';

export default function GameLayer() {
	const { trump, matchStage, teamScore, matchTricks, showActionPrompt, yourSeat, dealer } = useContext(DataContext)

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

	return (
		<SafeAreaView style={styles.screen}>
			<StartModal />
			<SettingsModal />
			<RulesModal />
			<GameOverModal />
			<PromptModal />
			{showActionPrompt && <PromptAction />}
			<View style={localStyles.hud}>
				<MatchTricksCount />
				<TrumpIndicator />
			</View>
			{matchStage !== "PREGAME" &&
				<Flex fill={2} align="center" justify="center" height="100%" width="100%">
					<DownHands />
					<Flex align="center" justify="center" height="100%" width="100%" override={{ position: "absolute" }}>
						{(matchStage !== "PLAY" || matchStage !== "RESULT" || matchStage !== "GAMEOVER") ? <TrumpStack /> : null}
						{matchStage === "PLAY" && <PlayField />}
					</Flex>
				</Flex>
			}
			{matchStage !== "PREGAME" &&
				<Flex fill={1} align="center" height="100%" width="100%">
					<PlayerHand />
				</Flex>
			}
			{yourSeat === dealer && (matchStage !== 'PREGAME' && matchStage !== 'RESULT') && <View style={{ position: "absolute", left: 14, bottom: 14 }}>
				{iconSVGs.dealerIcon}
			</View>}
			{/* {trump.code !== undefined && <CallingTeamIndicator />}
			{(matchStage === "PLAY" || matchStage === "RESULT" || teamScore > 0 || opponentScore > 0) && <GameScore />} */}
		</SafeAreaView>
	)
}