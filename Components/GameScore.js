import { useContext } from "react"
import { DataContext } from "../GameContext"

export default function GameScore() {
	const { teamScore, opponentScore } = useContext(DataContext)

	return (
		<div className="absolute bottom-32 left-48 flex flex-col justify-center items-center py-2 px-2 border-2 border-white text-white opacity-60 rounded-lg">
			<h1 className="text-md text-center font-normal">Game Score</h1>
			<h2 className="text-sm text font-light">Your Team: <span className="font-normal">{teamScore}</span></h2>
			<h2 className="text-sm text font-light">Opposing Team: <span className="font-normal">{opponentScore}</span></h2>
		</div>
	)
}
