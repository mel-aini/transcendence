import { Outlet } from "react-router-dom";
import PingPongContextProvider from "../../contexts/pingPongProvider";

function GameLayout({isTournament}: {isTournament: boolean}) {
	return (
		<>
			{
				isTournament ?
					<Outlet />
				:
					<PingPongContextProvider isTournament={false}>
						<Outlet />
					</PingPongContextProvider>
			}
		</>
	);
}

export default GameLayout;