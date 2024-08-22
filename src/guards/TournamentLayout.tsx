import TournamentContextProvider from "../contexts/TournamentProvider";
import { Outlet } from "react-router-dom";

function TournamentLayout() {
	return (
		<TournamentContextProvider>
			<Outlet />
		</TournamentContextProvider>
	);
}

export default TournamentLayout;