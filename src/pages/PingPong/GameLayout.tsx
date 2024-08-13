import { Outlet } from "react-router-dom";
import PingPongContextProvider from "../../contexts/pingPongProvider";

function GameLayout({isTournament}: {isTournament: boolean}) {
	return ( 
		<PingPongContextProvider isTournament={isTournament}>
			<Outlet />
		</PingPongContextProvider>
	 );
}

export default GameLayout;