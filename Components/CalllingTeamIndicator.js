import { useContext } from "react"
import { DataContext } from "../GameContext"

export default function CallingTeamIndicator() {
	const { callingPlayer, yourSeat, goAlone, matchStage, matchTricks } = useContext(DataContext)

	if (matchStage === "RESULT" && (matchTricks.callingTeam + matchTricks.opposingTeam === 5)) return null
	else return (
		<div className="absolute bottom-32 right-48 flex flex-col justify-center items-center py-2 px-2 border-2 border-white text-white opacity-60 rounded-lg">
			<h1 className="text-md text-center font-light">
				{yourSeat === callingPlayer || ((callingPlayer + 2) % 4 === yourSeat) ?
					`${goAlone !== null ? `${goAlone === yourSeat ? "You Called Trump Alone" : "Your Teammate called Trump Alone"}` : "Your Team Called Trump"}`
					: `${goAlone !== null ? `${goAlone === 1 ? "Player 1 Called Trump Alone" : "Player 3 called Trump Alone"}` : "The Other Team Called Trump"}`
				}
			</h1>
		</div>
	)
}

// (goAlone && goAlone === yourSeat) ? "You Called Trump Alone" ? goAlone && goAlone === ((yourSeat + 2) % 4) ? "Your Teammate called Trump Alone" : "Your Team Called Trump"
// 	: goAlone ? `${goAlone === 1 ? "Player 1 Called Trump Alone" : "Player 3 Trump Alone"}` : "The Other Team Called Trump"