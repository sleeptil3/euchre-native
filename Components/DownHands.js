import React, { useContext } from "react"
import { DataContext } from "../GameContext"
import DownHand from "./DownHand"
import { View } from "react-native";
import { Flex } from "../CoreElements/containerStyles";
import { colors } from "../CoreElements/theme";

export default function DownHands() {
	const { teammateHand, opponentHand1, opponentHand2 } = useContext(DataContext)

	return (
		<Flex height="60%" width="100%" override={{ position: "absolute", top: 0 }}>
			<DownHand position={1} handLength={opponentHand1.length} />
			<DownHand position={2} handLength={teammateHand.length} />
			<DownHand position={3} handLength={opponentHand2.length} />
		</Flex>
	)
}