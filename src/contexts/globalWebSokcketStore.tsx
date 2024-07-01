import { ReactNode, createContext, useContext, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { Actions, useProfileContext } from "./profileStore";

export const GlobalWebSocketContext = createContext<{lastJsonMessage: any, sendJsonMessage: SendJsonMessage}>({
	lastJsonMessage: '',
	sendJsonMessage: () => {
	}
});

const GlobalWebSocketContextProvider = ({children} : {children: ReactNode}) => {
	// const lastMessage = useState('')
	const { state, dispatchProfile } = useProfileContext();
	const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL,
		{
			share: false,
			shouldReconnect: () => true,
		},
	);
	const setActions = (relation: string | undefined) => {
		if (!relation)
			dispatchProfile({type: "FRIEND_ACTION", friendAction: Actions.AddFriend})
		else if (relation == 'none')
			dispatchProfile({type: "FRIEND_ACTION", friendAction: Actions.AddFriend})
		else if (relation == 'friend')
			dispatchProfile({type: "FRIEND_ACTION", friendAction: Actions.Friend})
		else if (relation == 'send_req')
			dispatchProfile({type: "FRIEND_ACTION", friendAction: Actions.SendingInvitation})
		else if (relation == 'rec_req')
			dispatchProfile({type: "FRIEND_ACTION", friendAction: Actions.PendingInvitation})
		else if (relation == 'blocker')
			dispatchProfile({type: "FRIEND_ACTION", friendAction: Actions.Blocked})
	}
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

	useEffect(() => {
		if (state.userData &&  lastJsonMessage && lastJsonMessage.type === "user-action" && lastJsonMessage.code === 200 && lastJsonMessage.identifier === state.userData.username)
		{
			const value = setValue(lastJsonMessage.data.value);

			dispatchProfile({type: "USER_DATA", userData: {...state.userData, relation: value}});
			setActions(value);
		}
		console.log(lastJsonMessage);
	}, [lastJsonMessage])
	
	// useEffect
	return (
		<GlobalWebSocketContext.Provider value={{lastJsonMessage, sendJsonMessage}}>
			{children}
		</GlobalWebSocketContext.Provider>
	)
}

export const WS_URL = "ws://localhost:8000/ws/sys/";
export const useGlobalWebSocketContext = () => useContext(GlobalWebSocketContext);
export default GlobalWebSocketContextProvider;