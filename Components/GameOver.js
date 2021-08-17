import { useContext } from 'react';
import { DataContext } from "../GameContext";

export default function GameOver() {
	const { teamScore } = useContext(DataContext)

	return (
		<div className={`absolute top-0 bottom-0 left-0 right-0 z-10 transform backdrop-filter backdrop-blur-md flex flex-col justify-center items-center`}>
			<h1 className="text-white text-opacity-80 text-3xl font-bold">Game Over</h1>
			<h2 className="text-white text-opacity-80 text-lg font-extralight">{teamScore >= 10 ? "Your team won!" : "The other team won..."}</h2>
			<div className="mt-10 text-white flex space-x-5 text-opacity-80 text-md font-extralight">
				<h2>
					Check out the code:
				</h2>
				<a className="font-light hover:underline" href="https://github.com/sleeptil3/euchre-react" target="_blank" rel="noopener noreferrer">Front-End</a>
				<a className="font-light hover:underline" href="https://github.com/sleeptil3/euchre-api" target="_blank" rel="noopener noreferrer">Back-End</a>

			</div>
			<button
				className="mt-10 transform transition-transform duration-500 hover:scale-110 active:scale-100 cursor-pointer text-white font-thin text-opacity-90 border-2 bg-white bg-opacity-10 border-white border-opacity-80 h-16 w-28">
				<a className="" href="https://euchre.sleeptil3software.com/">Play Again</a>
			</button>
		</div>
	)
}