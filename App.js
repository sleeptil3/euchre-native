import React from 'react';
import GameContext from './GameContext';
import { StatusBar } from 'expo-status-bar';
import Game from './Screens/Game'
import { Flex } from './CoreElements/containerStyles';
import { colors } from './CoreElements/theme';

export default function App() {
	return (
		// Eventually will be a react-navigotor between Rules and Game, possibly a game win final screen
		<GameContext>
			<Flex color={colors.background}>
				<StatusBar style="light" hidden={true} />
				<Game />
			</Flex>
		</GameContext>
	);
}