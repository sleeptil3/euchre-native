import React, { useContext } from "react"
import { DataContext } from "../GameContext"
import { blankCard } from "../Data/data"
import Card from "./Card"
import { StyleSheet, View } from "react-native"

export default function PlayField() {
	const { playedCards } = useContext(DataContext)

	const cardScale = .55

	return (
		<View style={styles.field}>
			{playedCards[1] === blankCard ? <Card scale={cardScale} card={blankCard} use={"FIELD"} position={1} /> : <Card scale={cardScale} card={playedCards[1]} use={"FIELD"} position={1} />}
			{playedCards[2] === blankCard ? <Card scale={cardScale} card={blankCard} use={"FIELD"} position={2} /> : <Card scale={cardScale} card={playedCards[2]} use={"FIELD"} position={2} />}
			{playedCards[3] === blankCard ? <Card scale={cardScale} card={blankCard} use={"FIELD"} position={3} /> : <Card scale={cardScale} card={playedCards[3]} use={"FIELD"} position={3} />}
			{playedCards[0] === blankCard ? <Card scale={cardScale} card={blankCard} use={"FIELD"} position={0} /> : <Card scale={cardScale} card={playedCards[0]} use={"FIELD"} position={0} />}
		</View>
	)
}

const styles = StyleSheet.create({
	field: {
		position: "absolute",
		top: 90,
		height: "100%",
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	}
})