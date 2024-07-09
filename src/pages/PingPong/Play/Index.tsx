import GameContextProvider from "../../../contexts/gameStore";
import Game from "./Game/Game";
import Result from "./Result/Result";

function Index() {

	return (
		<GameContextProvider>
			<div className="min-h-[90vh] flex justify-center items-center">
				<div className="flex flex-col h-full max-w-[1105px] w-4/5 justify-between items-center gap-[26px]">
					{/* <Game /> */}
					<Result xp={11}/>
				</div>
			</div>
		</GameContextProvider>
	);
}

export default Index;
