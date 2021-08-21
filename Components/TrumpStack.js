import React, { useContext } from "react"
import { Image, View } from "react-native"
import { DataContext } from "../GameContext"
import TrumpCard from "./TrumpCard"
import { Flex } from "../CoreElements/containerStyles"
import { cardImages } from "../Data/data"

export default function TrumpStack() {
	const { trump, upTrump, showTrumpStack } = useContext(DataContext)

	if (!trump.suit) {
		return (
			<Flex align="center" justify="center" override={{ width: "100%", height: "100%" }}>
				{showTrumpStack && <Image source={cardImages.deck} style={{ position: "absolute" }} />}
				{upTrump.faceValue !== undefined && <TrumpCard />}
			</Flex>
		)
	} else {
		return null
	}
}
