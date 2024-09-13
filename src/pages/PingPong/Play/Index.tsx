import { useEffect } from "react";
import { Levels, usePingPongContext } from "../../../contexts/pingPongProvider";
import Game from "./Game/Game";
import Result from "./Result/Result";
import { useNavigate } from "react-router-dom";

function Index() {
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
					<Result />
					:
					<Game />
				}
			</div>
	);
}

export default Index;
