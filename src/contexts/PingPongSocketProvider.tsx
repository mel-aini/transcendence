import { ReactNode, createContext, useContext } from "react";
import useWebSocket from "react-use-websocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "./authProvider";

export const PingPongSocket = createContext<{lastJsonMessage: any, sendJsonMessage: SendJsonMessage}>({
	lastJsonMessage: '',
	sendJsonMessage: () => {
	}
});

const PingPongSocketProvider = ({isTournament, children} : {isTournament: boolean, children: ReactNode}) => {
	const { state: token }  = useAuthContext();
	const { state: routeState } = useLocation();
	console.log("routeState", routeState);

	const fullWsUrl: string = (routeState && routeState.gameId) ? GAME_WS_URL + routeState.gameId + "/?token=" : GAME_WS_URL + "random/?token=";
	const { lastJsonMessage, sendJsonMessage } = useWebSocket(fullWsUrl + token.accessToken,
			{
				share: false,
				shouldReconnect: () => false,
			},
			!isTournament
		);
	
	return (
		<PingPongSocket.Provider value={{lastJsonMessage, sendJsonMessage}}>
			{children}
		</PingPongSocket.Provider>
	)
}

const GAME_WS_URL = "ws://127.0.0.1:8000/ws/game/";
export const usePingPongSocket = () => useContext(PingPongSocket);
export default PingPongSocketProvider;