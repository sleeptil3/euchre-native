import React, { useContext } from "react"
import { Image, View } from "react-native"
import { DataContext } from "../GameContext"
import TrumpCard from "./TrumpCard"
import { Flex } from "../CoreElements/containerStyles"

export default function TrumpStack() {
	const { trump, upTrump, showTrumpStack } = useContext(DataContext)

	if (!trump.suit) {
		return (
			<Flex align="center" justify="center" override={{ width: "100%", height: "100%" }}>
				{showTrumpStack && <Image source={require("../assets/cards/deck.png")} style={{ position: "absolute" }} />}
				{upTrump.faceValue !== undefined && <TrumpCard />}
			</Flex>
		)
	} else {
		return null
	}
}

// <div className={`transition-opacity ${trumpStackOpacity}`}>
// </div>
// <img className="relative top-2 transform -translate-y-full" src="./cards/deck.png" alt="face down unused trump cards" />
