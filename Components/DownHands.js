import { useContext } from "react"
import { DataContext } from "../GameContext"
import DownHand from "./DownHand"

export default function DownHands() {
	const { teammateHand, opponentHand1, opponentHand2 } = useContext(DataContext)

	return (
		<div className="">
			<DownHand position={1} handLength={opponentHand1.length} />
			<DownHand position={2} handLength={teammateHand.length} />
			<DownHand position={3} handLength={opponentHand2.length} />
		</div>
	)
}