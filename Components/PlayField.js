import { useContext } from "react"
import { DataContext } from "../GameContext"
import { blankCard } from "../Data/data"

import Card from "./Card"

export default function PlayField() {
	const { playedCards } = useContext(DataContext)

	return (
		<div className="w-1/4 h-2/5 bg-opacity-25 relative flex justify-center items-center bottom-16 right-14 pointer-events-none">
			<div className="absolute w-full h-1/2 flex justify-between items-center">
				<div className="transform rotate-6">{playedCards[1] === blankCard ? <Card card={blankCard} /> : <Card card={playedCards[1]} />}</div>
				<div className="transform -rotate-6">{playedCards[3] === blankCard ? <Card card={blankCard} /> : <Card card={playedCards[3]} />}</div>
			</div>
			<div className="absolute h-full w-1/4 flex flex-col justify-between items-center">
				<div className="relative top-8 transform rotate-6">{playedCards[2] === blankCard ? <Card card={blankCard} /> : <Card card={playedCards[2]} />}</div>
				<div className="relative bottom-8 transform -rotate-6">{playedCards[0] === blankCard ? <Card card={blankCard} /> : <Card card={playedCards[0]} />}</div>
			</div>
		</div>
	)
}
