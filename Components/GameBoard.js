import { useContext } from 'react';
import { DataContext } from "../GameContext";
import GameLayer from "./GameLayer";
import PlayButton from './PlayButton';
import GameOver from './GameOver';

export default function GameBoard() {
	const { matchStage } = useContext(DataContext)

	return (
		<div className="bg-game-canvas bg-no-repeat bg-center h-canvas w-canvas relative z-0">
			{matchStage === "GAMEOVER" ? <GameOver />
				: matchStage === "PREGAME" ? <PlayButton /> : <GameLayer />}
		</div>
	)
}