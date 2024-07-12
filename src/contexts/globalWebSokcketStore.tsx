import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import useWebSocket from "react-use-websocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { useProfileContext } from "./profileStore";
import { FriendsData, Relation } from "../types/profile";

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

	const modifyObjectByName = (array : FriendsData[] | null, username: string, newValue: Relation) => {
		console.log(array);
		const obj: FriendsData | undefined = array ? array.find(obj => obj.username === username) : undefined;
		if (obj) {
			obj.relation = newValue;
			return array;
		}
	};

	useEffect(() => {
		console.log(lastJsonMessage);
		
		if (!isEmptyObject(lastJsonMessage) && lastJsonMessage.code === 200)
		{
			if (lastJsonMessage.type === "user-action") {
				const value = setValue(lastJsonMessage.data.value);
				if (!isEmptyObject(state.userData) && lastJsonMessage.identifier === state.userData.username) {
					dispatchProfile({type: "USER_DATA", userData: {...state.userData, relation: value}});
				}
				else {
					const updatedArray = modifyObjectByName([...state.friendsData], lastJsonMessage.identifier, value);
					if (updatedArray) {
						dispatchProfile({type: "FRIEND_DATA", friendsData: [...updatedArray]});
					}
				}
			}
			else if (lastJsonMessage.type === "update")
			{
				if (lastJsonMessage.identifier === "username")
					dispatchProfile({type: "USER_DATA", userData: {...state.userData, username: lastJsonMessage.data.value}});
				else if (lastJsonMessage.identifier === "email")
					dispatchProfile({type: "USER_DATA", userData: {...state.userData, email: lastJsonMessage.data.value}});
				else if (lastJsonMessage.identifier === "tfa-status")
				{
					dispatchProfile({type: "USER_DATA", userData: {...state.userData, tfa: {...state.userData?.tfa, status: lastJsonMessage.data.value}}});
				}
				else if (lastJsonMessage.identifier === "tfa-change")
				{
					dispatchProfile({type: "USER_DATA", userData: {...state.userData, tfa: {...state.userData?.tfa, status: lastJsonMessage.data.status, content: lastJsonMessage.data.value}}});
				}
			}
		}
		else if (!isEmptyObject(lastJsonMessage)) {
			if (lastJsonMessage.identifier === state.userData?.username)
				dispatchProfile({type: "USER_DATA", userData: {...state.userData}});
			else
				dispatchProfile({type: "FRIEND_DATA", friendsData: {...state.friendsData}});
		}
	}, [lastJsonMessage])

	return (
		<GlobalWebSocketContext.Provider value={{lastJsonMessage, sendJsonMessage, GlobalState, dispatchGlobal}}>
			{children}
		</GlobalWebSocketContext.Provider>
	)
}

export const WS_URL = "ws://localhost:8000/ws/sys/";
export const useGlobalWebSocketContext = () => useContext(GlobalWebSocketContext);
export default GlobalWebSocketContextProvider;