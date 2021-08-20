import React, { useContext } from "react"
import { DataContext } from "../GameContext"
import DownHand from "./DownHand"
import { View } from "react-native";
import { Flex } from "../CoreElements/containerStyles";
import { colors } from "../CoreElements/theme";

export default function DownHands() {
	const { teammateHand, opponentHand1, opponentHand2 } = useContext(DataContext)

	return (
		<Flex fill={2} height="100%" width="100%" >
			<Flex direction="row" justify="space-between" align="center" height="100%" width="100%" override={{ position: "absolute", top: 0, left: 0 }}>
				<DownHand position={1} handLength={opponentHand1.length} />
				<DownHand position={3} handLength={opponentHand2.length} />
			</Flex>
			<Flex direction="row" justify="center" align="flex-start" height="100%" width="100%" override={{ position: "absolute", top: 0 }}>
				<DownHand position={2} handLength={teammateHand.length} />
			</Flex>
		</Flex>
	)
}