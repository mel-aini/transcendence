import { Outlet } from "react-router-dom";
import PingPongContextProvider from "../contexts/pingPongProvider";

function TournamentLayout() {
	return (
		// <PingPongContextProvider isTournament={true}>
			<Outlet />
		// {/* </PingPongContextProvider> */}
	);
}

export default TournamentLayout;