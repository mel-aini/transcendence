import { Outlet } from "react-router-dom";
import PingPongContextProvider from "../../contexts/pingPongProvider";
import { Suspense, useEffect } from "react";
import { useGlobalContext } from "../../contexts/store";
import LoadingPage from "../../components/LoadingPage";

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