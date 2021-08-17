import { useState, useEffect, useContext } from "react";
import { DataContext } from "../GameContext";
import { spinner, dealerIcon } from "../Data/data";

export default function DownHand({ position, handLength }) {
	const [image, setImage] = useState(0);
	const { currentPlayer, turnCount, matchStage, goAlone, dealer } = useContext(DataContext)
	const imageURLS = ["./cards/down0.png", "./cards/down1.png", "./cards/down2.png", "./cards/down3.png", "./cards/down4.png", "./cards/down5.png", "./cards/down5.png"]
	const styles = [
		"hidden",
		"absolute left-28 top-40 transform rotate-90 flex justify-center items-center",
		"absolute top-3 left-1/2 transform -translate-x-1/2 rotate-180 flex justify-center items-center",
		"absolute right-28 top-40 transform -rotate-90 flex justify-center items-center",
		"absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
	];

	useEffect(() => {
		setImage(imageURLS[handLength]);
	}, [handLength]);

	return (
		<div className={styles[position]}>
			{position === dealer && dealerIcon}
			<img className={`${goAlone !== null && (goAlone + 2) % 4 === position ? "opacity-20" : ""}`} src={image} alt={`Face down stack of ${handLength} cards`} />
			{(currentPlayer === position && turnCount !== 4 && (matchStage === "PLAY" || matchStage === "CALL" || matchStage === "PICK")) && <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">{spinner}</div>}
		</div>
	)
}