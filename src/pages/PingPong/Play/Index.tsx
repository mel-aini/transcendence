import { useEffect } from "react";
import { Levels, usePingPongContext } from "../../../contexts/pingPongProvider";
import Game from "./Game/Game";
import Result from "./Result/Result";
import { useNavigate } from "react-router-dom";

function Index({isTournament, isAI}: {isTournament: boolean, isAI: boolean}) {
	const { state } = usePingPongContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (state.level != Levels.OpponentFound)
			navigate('/dashboard');
	}, []);

	return (
			<div className="flex justify-center items-center duration-300">
			{
				state.result.isEndGame
				?
				<Result isTournament={isTournament} isAI={isAI} />
				:
				<Game isTournament={isTournament} isAI={isAI} />
			}
			</div>
	);
}

export default Index;
