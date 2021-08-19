import React, { useContext } from "react"
import { DataContext } from "../GameContext"
import { blankCard } from "../Data/data"
import Card from "./Card"
import { Flex } from "../CoreElements/containerStyles"

export default function PlayField() {
	const { playedCards } = useContext(DataContext)

	return (
		<Flex>
			{playedCards[1] === blankCard ? <Card card={blankCard} /> : <Card card={playedCards[1]} />}
			{playedCards[3] === blankCard ? <Card card={blankCard} /> : <Card card={playedCards[3]} />}
			{playedCards[2] === blankCard ? <Card card={blankCard} /> : <Card card={playedCards[2]} />}
			{playedCards[0] === blankCard ? <Card card={blankCard} /> : <Card card={playedCards[0]} />}
		</Flex>
	)
}
