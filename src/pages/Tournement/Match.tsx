import { useEffect, useRef, useState } from "react";
import { Player } from "../../contexts/TournementProvider";
import Merge from "./Merge";
import PlayerBar from "./PlayerBar";

function Match({player1, player2, gap, isRightSide}: {player1: Player | string, player2: Player | string, gap: number, isRightSide?: boolean}) {
	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const [height, setHeight] = useState<number>(0);

	const getHeight = () => {
		const middle1: any = ref1.current;
		const middle2: any = ref2.current;
		if (middle1 && middle2)
		{
			isRightSide ?
			setHeight(middle1.getBoundingClientRect().top - middle2.getBoundingClientRect().top)
			:
			setHeight(middle2.getBoundingClientRect().top - middle1.getBoundingClientRect().top);
		}
	}

	useEffect(() => {
		getHeight();
	}, []);

	return (
		<div className="flex items-center">
			<div className="flex flex-col items-center justify-center" style={(gap == 0) ? {gap: "32px"} : {gap: `${gap}px`}}>
				<PlayerBar ref={ref1} player={player1} isRightSide={isRightSide}/>
				<PlayerBar ref={ref2} player={player2} isRightSide={isRightSide}/>
			</div>
			<Merge height={height}/>
		</div>
	);
}

export default Match;