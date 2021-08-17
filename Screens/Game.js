import React, { useContext } from "react";
import { DataContext } from "../GameContext";
import { Flex } from '../CoreElements/containerStyles'
import { Subtitle, Body } from '../CoreElements/fontStyles'
import { colors } from '../CoreElements/theme'
import GameBoard from "../Components/GameBoard";
import PlayerHand from "../Components/PlayerHand";

export default function Game() {
	/////////////////////
	// CONTEXT IMPORTS //
	/////////////////////

	const { playerHand, pile } = useContext(DataContext)

	////////////
	// RENDER //
	////////////


	return (
		<Flex justify="center" align="center" color={"transparent"}>
			<Subtitle>The Game</Subtitle>
			<Body>{JSON.stringify(pile)}</Body>
			<PlayerHand />
		</Flex>
	);
}