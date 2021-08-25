import React, { useContext, useState, useEffect } from "react"
import { DataContext } from "../GameContext"
import DownHand from "./DownHand"
import { Flex } from "../CoreElements/containerStyles";
import { sleep } from "../Data/data";

export default function DownHands() {
	const { teammateHand, opponentHand1, opponentHand2, matchStage, promptText } = useContext(DataContext)
	const [show1, setShow1] = useState(false)
	const [show2, setShow2] = useState(false)
	const [show3, setShow3] = useState(false)

	useEffect(() => {
		if (matchStage === "DEAL") {
			sleep(500).then(() => setShow1(true))
			sleep(1500).then(() => setShow2(true))
			sleep(2500).then(() => setShow3(true))
		}
		return () => {
			setShow1(false)
			setShow2(false)
			setShow3(false)
		}
	}, [])

	return (
		<Flex fill={2} height="100%" width="100%" >
			<Flex direction="row" justify="space-between" align="center" height="100%" width="100%" override={{ position: "absolute" }}>
				{show1 && <DownHand position={1} handLength={opponentHand1.length} />}
				{show3 && <DownHand position={3} handLength={opponentHand2.length} />}
			</Flex>
			<Flex direction="row" justify="center" align="flex-start" height="100%" width="100%" override={{ position: "absolute", top: 0 }}>
				{show2 && <DownHand position={2} handLength={teammateHand.length} />}
			</Flex>
		</Flex>
	)
}