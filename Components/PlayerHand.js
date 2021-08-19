import React, { useContext } from "react"
import { Flex } from "../CoreElements/containerStyles";
import { DataContext } from "../GameContext"
import Card from "./Card"

export default function PlayerHand() {
	const { playerHand, yourSeat, goAlone } = useContext(DataContext)

	return (
		<Flex
			direction="row"
			justify="center"
			align="flex-end"
			width="95%"
			override={{
				position: "absolute",
				bottom: -92,
				display: (goAlone + 2) % 4 === yourSeat ? "none" : "flex"
			}}>
			{
				playerHand.map(card => {
					return <Card card={card} scale={1} key={card._id} use={"HAND"} />
				})
			}
		</Flex>
	)
}
