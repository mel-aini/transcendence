import { Outlet } from "react-router-dom";
import PingPongContextProvider from "../../contexts/pingPongProvider";
import { Suspense, useEffect } from "react";
import { useGlobalContext } from "../../contexts/store";
import LoadingPage from "../../components/LoadingPage";

function GameLayout({isTournament, isAI}: {isTournament: boolean, isAI: boolean}) {
	return (
		<>
			{
				isTournament ?
					<Outlet />
				:
				<PingPongContextProvider isTournament={false} isAI={isAI}>
					<Outlet />
				</PingPongContextProvider>
			}
		</>
	);
}

export default GameLayout;