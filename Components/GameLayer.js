import React, { useContext } from 'react';
import { SafeAreaView, View } from 'react-native';
import PlayerHand from './PlayerHand';
import DownHands from './DownHands';
import TrumpStack from './TrumpStack';
import PlayField from './PlayField';
import TrumpIndicator from '../Components/TrumpIndicator';
import CallingTeamIndicator from './CalllingTeamIndicator';
import MatchTricksCount from './MatchTricksCount';
import GameScore from './GameScore';
import PromptModal from '../Modals/PromptModal';
import { styles } from '../CoreElements/theme';
import { DataContext } from "../GameContext";

export default function GameLayer() {
	const { matchStage, trump, teamScore, promptText, opponentScore, showPromptModal } = useContext(DataContext)

	return (
		<SafeAreaView style={[styles.screen, { marginTop: 32, }]}>
			<PromptModal />
			<PlayerHand />
			<DownHands />
			{/* <View>
				{(matchStage !== "PLAY" || matchStage !== "RESULT" || matchStage !== "GAMEOVER") ? <TrumpStack /> : null}
				{matchStage === "PLAY" && <PlayField />}
			</View> */}
			{/* {trump.code !== undefined && <TrumpIndicator />}
			{trump.code !== undefined && <CallingTeamIndicator />}
			{(matchStage === "PLAY" || matchStage === "RESULT") && <MatchTricksCount />}
			{(matchStage === "PLAY" || matchStage === "RESULT" || teamScore > 0 || opponentScore > 0) && <GameScore />} */}
		</SafeAreaView>
	)
}

// className = "relative z-10 h-full w-full text-opacity-80 text-white"