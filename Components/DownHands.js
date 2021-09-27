import React, { useContext, useState, useEffect } from "react"
import { DataContext } from "../GameContext"
import DownHand from "./DownHand"
import { sleep } from "../Data/data";
import { StyleSheet, View } from "react-native";

export default function DownHands() {
	const { teammateHand, opponentHand1, opponentHand2, matchStage } = useContext(DataContext)
	const [show1, setShow1] = useState(false)
	const [show2, setShow2] = useState(false)
	const [show3, setShow3] = useState(false)

	useEffect(() => {
		// console.log('DOWNHANDS USEEFFECT RAN')
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

	const localStyles = StyleSheet.create({
		downHands: {
			height: "100%",
			width: "100%",
		},
		horizontal: {
			width: "100%",
			position: "absolute",
			bottom: 0
		},
		vertical: {
			width: "100%",
			height: "100%",
			position: "absolute",
			top: 0,
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "flex-start",
		}
	})

	return (
		<View style={ localStyles.downHands }>
			<View style={ localStyles.horizontal }>
				{ show1 && <DownHand position={ 1 } handLength={ opponentHand1.length } /> }
				{ show3 && <DownHand position={ 3 } handLength={ opponentHand2.length } /> }
			</View>
			<View style={ localStyles.vertical }>
				{ show2 && <DownHand position={ 2 } handLength={ teammateHand.length } /> }
			</View>
		</View>
	)
}