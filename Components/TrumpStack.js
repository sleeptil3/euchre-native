import { useContext } from "react"
import { DataContext } from "../GameContext"
import TrumpCard from "./TrumpCard"

export default function TrumpStack() {
	const { trump, upTrump, trumpStackOpacity } = useContext(DataContext)

	if (!trump.suit) {
		return (
			<div className={`transition-opacity ${trumpStackOpacity}`}>
				{upTrump.faceValue !== undefined && <TrumpCard />}
				<img className="relative top-2 transform -translate-y-full" src="./cards/deck.png" alt="face down unused trump cards" />
			</div>
		)
	} else {
		return null
	}
}