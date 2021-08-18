import React, { useContext, useState, useEffect } from "react"
import { Flex } from "../CoreElements/containerStyles";
import { DataContext } from "../GameContext"
import Card from "./Card"
import { v4 as uuid } from 'uuid';

export default function PlayerHand() {
	const { playerHand, yourSeat, currentPlayer, turnCount, matchStage, goAlone } = useContext(DataContext)
	const [enableSelection, setEnableSelection] = useState("pointer-events-none")

	useEffect(() => {
		currentPlayer === yourSeat && (matchStage === "PLAY" || matchStage === "DISCARD") ? setEnableSelection("pointer-events-auto") : setEnableSelection("pointer-events-none")
	}, [turnCount])

	return (
		<Flex direction="row" justify="center" align="flex-end" width="95%" override={{ position: "absolute", bottom: -92 }}>
			{
				playerHand.map(card => {
					return <Card card={card} key={uuid()} />
				})
			}
		</Flex>
	)
}
