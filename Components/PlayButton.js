import { useContext, useState } from 'react';
import { DataContext } from "../GameContext";
import { sleep } from '../Data/data';

export default function PlayButton() {
	const { setMatchStage, turnCount, dealer, setCurrentPlayer, setTurnCount } = useContext(DataContext)
	const [opacity, setOpacity] = useState("opacity-100")

	const handleClick = () => {
		setOpacity("opacity-0")
		sleep(1500).then(() => {
			setCurrentPlayer((dealer + 1) % 4)
			setMatchStage("NEWGAME")
			setTurnCount(turnCount - 1)
		});
	};

	return (
		<div className={`absolute top-0 bottom-0 left-0 right-0 z-10 transform transition-all duration-1000 ${opacity} backdrop-filter backdrop-blur-md flex flex-col justify-center items-center`}>
			<h1 className="text-white text-opacity-80 text-xl font-bold">Let's play some Euchre<sup>*</sup></h1>
			<h2 className="text-white text-opacity-80 text-md font-extralight w-3/4 text-center"><sup>*</sup>Game is in beta testing and only supports desktop/laptop screens at the moment. Still fine tuning some AI and you <em>might</em> run into a bug here or there. It should be pretty smooth at this point though!</h2>
			<div className="mt-10 text-white flex space-x-5 text-opacity-80 text-lg font-extralight">
				<h2>
					Check out the code:
				</h2>
				<a className="font-light hover:underline" href="https://github.com/sleeptil3/euchre-api" target="_blank" rel="noopener noreferrer">Back End API</a>
				<a className="font-light hover:underline" href="https://github.com/sleeptil3/euchre-react" target="_blank" rel="noopener noreferrer">Front End React</a>
			</div>
			<div className="text-white flex space-x-5 text-opacity-80 text-lg font-extralight">
				<h2>
					Take a look at my extensive pre-visualization process:
				</h2>
				<a className="font-light hover:underline" href="https://www.figma.com/file/Oe1LIvWV7E8X5QdlW6T5Cv/EuchreGame?node-id=2%3A508" target="_blank" rel="noopener noreferrer">Figma Boards</a>
				<a className="font-light hover:underline" href="https://drive.google.com/open?id=1njK0KpMedu_ym5I-YkUKfG5L5quywbgo" target="_blank" rel="noopener noreferrer">Database Design</a>
			</div>
			<button
				onClick={handleClick}
				className="mt-10 transform transition-transform duration-500 hover:scale-110 active:scale-100 cursor-pointer text-white font-thin text-opacity-90 border-2 bg-white bg-opacity-10 border-white border-opacity-80 h-16 w-28">
				Okay
			</button>
		</div>
	)
}