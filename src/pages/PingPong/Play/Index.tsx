import GameContextProvider from "../../../contexts/gameStore";
import Header from "./Header";
import Table from "./Table";

function Index() {

	return (
		<GameContextProvider>
			<div className="min-h-[90vh] flex justify-center items-center">
				<div className="flex flex-col h-full max-w-[1105px] w-4/5 justify-between items-center gap-[26px]">
					<Header />
					<Table />
				</div>
			</div>
		</GameContextProvider>
	);
}

export default Index;
