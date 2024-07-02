import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import useWebSocket from "react-use-websocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { useProfileContext } from "./profileStore";

export interface GlobalData {
	friendActionChanged: boolean
}

const initialState: GlobalData = {
	friendActionChanged: false
};

export const GlobalWebSocketContext = createContext<{GlobalState: GlobalData, dispatchGlobal: Dispatch<any>, lastJsonMessage: any, sendJsonMessage: SendJsonMessage}>({
	lastJsonMessage: '',
	sendJsonMessage: () => {
	},
	dispatchGlobal: () => {},
	GlobalState: initialState
});

const reducer = (state: GlobalData, action: any) => {
	console.log("hnaaa");
	switch (action.type)
	{
		case 'friendActionChanged':
			return { 
				...state, 
				friendActionChanged: action.friendActionChanged
			}
		default:
			return state;
	}
}

const GlobalWebSocketContextProvider = ({children} : {children: ReactNode}) => {
	const { state, dispatchProfile } = useProfileContext();
	const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL,
		{
			share: false,
			shouldReconnect: () => true,
		},
	);
	const [GlobalState, dispatchGlobal] = useReducer(reducer, initialState);

	const setValue = (relation: string) => {
		if (relation == "add")
			return "send_req";
		if (relation == "accept")
			return "friend";
		if (relation == "deny" || relation == "unblock" || relation == "unfriend" || relation == "cancel")
			return "none";
		if (relation == "block")
			return "blocker";
	}

	const isEmptyObject = (obj: any) => {
		if (obj === null)
			return (true);
		return JSON.stringify(obj) === '{}';
	  };

	useEffect(() => {
		if (!isEmptyObject(state.userData) && !isEmptyObject(lastJsonMessage) && lastJsonMessage.type === "user-action" && lastJsonMessage.identifier === state.userData.username)
		{
			if (lastJsonMessage.code === 200) {
				const value = setValue(lastJsonMessage.data.value);
				dispatchProfile({type: "USER_DATA", userData: {...state.userData, relation: value}});
			}
			else
				dispatchProfile({type: "USER_DATA", userData: {...state.userData}});
		}
	}, [lastJsonMessage])
	
	// useEffect
	return (
		<GlobalWebSocketContext.Provider value={{lastJsonMessage, sendJsonMessage, GlobalState, dispatchGlobal}}>
			{children}
		</GlobalWebSocketContext.Provider>
	)
}

export const WS_URL = "ws://localhost:8000/ws/sys/";
export const useGlobalWebSocketContext = () => useContext(GlobalWebSocketContext);
export default GlobalWebSocketContextProvider;