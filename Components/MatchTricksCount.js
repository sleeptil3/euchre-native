import { useContext } from "react"
import { DataContext } from "../GameContext"

export default function MatchTricksCount() {
	const { matchTricks, callingPlayer, yourSeat, matchStage } = useContext(DataContext)
	if (matchStage !== "PLAY") return null
	else return (
		<div className="absolute bottom-32 left-80 transform translate-x-7  flex flex-col justify-center items-center py-2 px-2 text-white opacity-60 rounded-lg">
			<h1 className="text-md text-center font-normal">Match Tricks</h1>
			<h2 className="text-sm text font-light">Your Team: <span className="font-normal">{callingPlayer === yourSeat || (callingPlayer + 2) % 4 === yourSeat ? matchTricks.callingTeam : matchTricks.opposingTeam}</span></h2>
			<h2 className="text-sm text font-light">Opposing Team: <span className="font-normal">{callingPlayer === yourSeat || (callingPlayer + 2) % 4 === yourSeat ? matchTricks.opposingTeam : matchTricks.callingTeam}</span></h2>
		</div>
	)
}
