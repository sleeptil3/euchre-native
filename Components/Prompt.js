import { useContext } from "react";
import { DataContext } from "../GameContext";
import { v4 as uuid } from 'uuid';

export default function Prompt() {
	const { promptText } = useContext(DataContext)
	if (promptText === undefined) return null
	else return (
		<div className={`absolute z-50 bottom-56 left-1/2 transform -translate-x-1/2 p-3 rounded-lg text-center text-white font-thin text-opacity-90 bg-black bg-opacity-40`}>
			<h1 className="text-lg font-bold">{promptText.title}</h1>
			<h2 className="text-md">{promptText.question}</h2>
			{promptText.choices.length > 0 &&
				<ul className="py-3">
					{promptText.choices.map(choice => {
						return (
							<li key={uuid()} className={`px-2 ${choice.text === "Pass" && "text-red-400 font-normal"} ${choice.text === "Go Alone" && "text-green-400 font-normal"} inline cursor-pointer hover:underline`} onClick={choice.action}>{choice.text}</li>
						)
					})}
				</ul>
			}
		</div>
	)
}