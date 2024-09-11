import { Outlet } from "react-router-dom";
import PingPongContextProvider from "../../contexts/pingPongProvider";
import PingPongSocketProvider from "../../contexts/PingPongSocketProvider";

function GameLayout({isTournament}: {isTournament: boolean}) {
	return (
		<>
			{
				isTournament ?
					<Outlet />
				:
					<PingPongSocketProvider isTournament={false}>
						<PingPongContextProvider isTournament={false}>
							<Outlet />
						</PingPongContextProvider>
					</PingPongSocketProvider>
			}
		</>
	);
}

export default GameLayout;