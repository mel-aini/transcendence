import GameContextProvider from "../../../contexts/gameStore";
import Game from "./Game/Game";
import Result from "./Result/Result";

function Index() {

	return (
		<GameContextProvider>
			<div className="min-h-[90vh] flex justify-center items-center">
				<Game />
				{/* <Result xp={0}/> */}
			</div>
		</GameContextProvider>
	);
}

export default Index;
