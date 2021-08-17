import { useContext } from 'react';
import DownHands from './DownHands';
import PlayerHand from './PlayerHand';
import Prompt from './Prompt';
import TrumpStack from './TrumpStack';
import PlayField from './PlayField';
import TrumpIndicator from '../Components/TrumpIndicator';
import CallingTeamIndicator from './CalllingTeamIndicator';
import MatchTricksCount from './MatchTricksCount';
import GameScore from './GameScore';
import { DataContext } from "../GameContext";

export default function GameLayer() {
	const { matchStage, trump, teamScore, opponentScore } = useContext(DataContext)

	return (
		<div className="relative z-10 h-full w-full text-opacity-80 text-white">
			<Prompt />
			<PlayerHand />
			<DownHands />
			<div className="h-full w-full flex justify-center items-center">
				{(matchStage !== "PLAY" || matchStage !== "RESULT" || matchStage !== "GAMEOVER") ? <TrumpStack /> : null}
				{matchStage === "PLAY" && <PlayField />}
			</div>
			{trump.code !== undefined && <TrumpIndicator />}
			{trump.code !== undefined && <CallingTeamIndicator />}
			{(matchStage === "PLAY" || matchStage === "RESULT") && <MatchTricksCount />}
			{(matchStage === "PLAY" || matchStage === "RESULT" || teamScore > 0 || opponentScore > 0) && <GameScore />}
		</div>
	)
}