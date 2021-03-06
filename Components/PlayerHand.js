import React, { useContext, useEffect } from "react"
import { Flex } from "../CoreElements/containerStyles";
import { DataContext } from "../GameContext"
import Card from "./Card"
import { Audio } from "expo-av";
import { sounds, sleep } from "../Data/data";

export default function PlayerHand() {
	const { playerHand, yourSeat, goAlone, enableSound, dealer } = useContext(DataContext)

	async function playDeal() {
		const { sound } = await Audio.Sound.createAsync(
			sounds.deal,
			{ isMuted: !enableSound, volume: 0.3 }
		)
		await sound.playAsync()
	}

	useEffect(() => {
		sleep(100).then(() => playDeal())
	}, [dealer])

	return (
		<Flex
			direction="row"
			justify="center"
			align="flex-end"
			width="95%"
			override={ {
				position: "absolute",
				bottom: -92,
				display: (goAlone + 2) % 4 === yourSeat ? "none" : "flex"
			} }>
			{
				playerHand.map((card, idx) => <Card order={ idx } card={ card } scale={ 1 } key={ card._id } use={ "HAND" } />)
			}
		</Flex>
	)
}
