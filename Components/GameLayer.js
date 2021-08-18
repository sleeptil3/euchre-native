import React, { useContext } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Flex } from '../CoreElements/containerStyles';
import PlayerHand from './PlayerHand';
import DownHands from './DownHands';
import TrumpStack from './TrumpStack';
import PromptModal from '../Modals/PromptModal';
import { styles } from '../CoreElements/theme';
import { DataContext } from "../GameContext";
import StartModal from '../Modals/StartModal';
// import PlayField from './PlayField';
// import TrumpIndicator from '../Components/TrumpIndicator';
// import CallingTeamIndicator from './CalllingTeamIndicator';
// import MatchTricksCount from './MatchTricksCount';
// import GameScore from './GameScore';

export default function GameLayer() {
	const { matchStage, trump, teamScore, promptText, opponentScore, showPromptModal } = useContext(DataContext)

	return (
		<SafeAreaView style={styles.screen}>
			<StartModal />
			<PromptModal />
			{matchStage !== "PREGAME"
				&& <Flex fill={2} align="center" justify="center" height="100%" width="100%">
					<DownHands />
					<Flex align="center" justify="center" height="100%" width="100%" override={{ position: "absolute" }}>
						{(matchStage !== "PLAY" || matchStage !== "RESULT" || matchStage !== "GAMEOVER") ? <TrumpStack /> : null}
						{/* {matchStage === "PLAY" && <PlayField />} */}
					</Flex>
				</Flex>
			}
			{matchStage !== "PREGAME"
				&& <Flex fill={1} align="center" height="100%" width="100%">
					<PlayerHand />
				</Flex>
			}
			{/* {trump.code !== undefined && <TrumpIndicator />}
			{trump.code !== undefined && <CallingTeamIndicator />}
			{(matchStage === "PLAY" || matchStage === "RESULT") && <MatchTricksCount />}
			{(matchStage === "PLAY" || matchStage === "RESULT" || teamScore > 0 || opponentScore > 0) && <GameScore />} */}
		</SafeAreaView>
	)
}

// className = "relative z-10 h-full w-full text-opacity-80 text-white"