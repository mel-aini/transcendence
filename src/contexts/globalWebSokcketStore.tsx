import { ReactNode, createContext, useContext, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { useProfileContext } from "./profileStore";
import { FriendsData, Relation } from "../types/profile";
import { useGlobalContext } from "./store";
import { useAuthContext } from "./authProvider";
import { useNotificationsContext } from "./notificationsProvider";
import { WS_END_POINT } from "../utils/urls";

export const GlobalWebSocketContext = createContext<{lastJsonMessage: any, sendJsonMessage: SendJsonMessage}>({
	lastJsonMessage: '',
	sendJsonMessage: () => {
	},
});

const GlobalWebSocketContextProvider = ({children} : {children: ReactNode}) => {
	const { dispatch } = useGlobalContext();
	const { state, dispatchProfile } = useProfileContext();
	const { state: token, dispatch: authDispatch }  = useAuthContext();
	const { dispatch: notDispatch } = useNotificationsContext();
	const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_END_POINT + "sys/?token=" + token.accessToken,
		{
			share: false,
			shouldReconnect: () => true,
		},
	);

	const setValue = (relation: string) : Relation => {
		if (relation == "add")
			return "send_req";
		if (relation == "accept")
			return "friend";
		if (relation == "deny" || relation == "unblock" || relation == "unfriend" || relation == "cancel")
			return "none";
		// if (relation == "block")
			return "blocker";
	}

	const isEmptyObject = (obj: any) => {
		if (obj === null)
			return (true);
		return JSON.stringify(obj) === '{}';
	};

	const modifyObjectByName = (array : FriendsData[] | null, username: string, newValue: Relation) => {
		const obj: FriendsData | undefined = (array && array?.length != 0) ? array.find(obj => obj.username === username) : undefined;
		if (obj) {
			obj.relation = newValue;
			return array;
		}
	};

	useEffect(() => {
		if (!isEmptyObject(lastJsonMessage) && lastJsonMessage.code === 200)
		{
			if (lastJsonMessage.type === "user-action") {
				const value = setValue(lastJsonMessage.data.value);
				if (!isEmptyObject(state.userData) && lastJsonMessage.identifier === state.userData?.username) {
					dispatchProfile({type: "USER_DATA", userData: {...state.userData, relation: value}});
				}
				else {
					const updatedArray = modifyObjectByName(state.friendsData, lastJsonMessage.identifier, value);
					if (updatedArray) {
						dispatchProfile({type: "FRIEND_DATA", friendsData: updatedArray});
					}
				}
			}
			else if (lastJsonMessage.type === "update")
			{
				if (lastJsonMessage.identifier === "username") {
					dispatch({type: "USER_DATA", userData: {...state.userData, username: lastJsonMessage.data.value}});
					authDispatch({type: 'USERNAME', username: lastJsonMessage.data.value});
				}
				else if (lastJsonMessage.identifier === "email")
					dispatch({type: "USER_DATA", userData: {...state.userData, email: lastJsonMessage.data.value}});
				else if (lastJsonMessage.identifier === "tfa-status")
					dispatch({type: "USER_DATA", userData: {...state.userData, tfa: {...state.userData?.tfa, status: lastJsonMessage.data.value}}});
				else if (lastJsonMessage.identifier === "tfa-change")
					dispatch({type: "USER_DATA", userData: {...state.userData, tfa: {...state.userData?.tfa, status: lastJsonMessage.data.status, content: lastJsonMessage.data.value}}});
				else if (lastJsonMessage.identifier === "game_settings")
					dispatch({type: "USER_DATA", userData: {...state.userData, game_settings: {...state.userData?.game_settings, paddle: lastJsonMessage.data.paddle, ball: lastJsonMessage.data.ball, background: lastJsonMessage.data.background}}});
				dispatch({type: 'ALERT', message: lastJsonMessage.message, dispatch})
			}
			else if (lastJsonMessage.type === "online")
				dispatchProfile({type: "USER_DATA", userData: {...state.userData, online: lastJsonMessage.data.value}});
			else if (lastJsonMessage.type == 'notification')
				notDispatch({type: 'PUSH_NOTIFICATION', notification: lastJsonMessage.data, dispatch: notDispatch})
		}
	}, [lastJsonMessage])

	return (
		<GlobalWebSocketContext.Provider value={{lastJsonMessage, sendJsonMessage}}>
			{children}
		</GlobalWebSocketContext.Provider>
	)
}

export const useGlobalWebSocketContext = () => useContext(GlobalWebSocketContext);
export default GlobalWebSocketContextProvider;