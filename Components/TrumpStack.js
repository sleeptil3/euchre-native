import React, { useContext, useState, useEffect } from "react"
import { Image } from "react-native"
import { DataContext } from "../GameContext"
import TrumpCard from "./TrumpCard"
import { Flex } from "../CoreElements/containerStyles"
import { cardImages } from "../Data/data"

export default function TrumpStack() {
	const { appPreferences, trump, upTrump, showTrumpStack } = useContext(DataContext)
	const [imageURL, setImageURL] = useState(cardImages[appPreferences.deckTheme].deck)

	useEffect(() => {
		setImageURL(cardImages[appPreferences.deckTheme].deck)
	}, [appPreferences.deckTheme])

	if (!trump.suit) {
		return (
			<Flex align="center" justify="center" override={{ width: "100%", height: "100%" }}>
				{showTrumpStack && <Image source={imageURL} style={{ position: "absolute" }} />}
				{upTrump.faceValue !== undefined && <TrumpCard />}
			</Flex>
		)
	} else {
		return null
	}
}