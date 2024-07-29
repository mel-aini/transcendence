import { useEffect } from "react";
import { usePingPongContext } from "../../../contexts/pingPongProvider";
import Game from "./Game/Game";
import Result from "./Result/Result";

function Index() {
	const { state } = usePingPongContext();

	useEffect(() => {
	}, [state.result.isEndGame]);

	return (
			<div className="flex justify-center items-center duration-300">
				{
					state.result.isEndGame
					?
					<Result />
					:
					<Game />
				}
			</div>
	);
}

export default Index;
