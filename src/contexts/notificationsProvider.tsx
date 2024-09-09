import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { INotification } from "./store";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { useGlobalWebSocketContext } from "./globalWebSokcketStore";

export interface GlobalStateProps {
	newNotifications: INotification[],
	isRead: boolean
}

const initialState: GlobalStateProps = {
	newNotifications: [],
	isRead: true
};

export const GlobalContext = createContext<{state: GlobalStateProps, dispatch: Dispatch<any>, lastJsonMessage: any, sendJsonMessage: SendJsonMessage}>({
	state: initialState,
	dispatch: () => {},
	lastJsonMessage: '',
	sendJsonMessage: () => {}
});

const reducer = (state: GlobalStateProps, action: any) => {
	switch (action.type)
	{
		case 'PUSH_NOTIFICATION':
			const updated = [...state.newNotifications, action.notification];
			setTimeout(() => {
                action.dispatch({ type: 'POP_NOTIFICATION' });
            }, 3000);
			return { ...state, newNotifications: updated, bell: true }
		case 'POP_NOTIFICATION':
			const newNotifications = state.newNotifications.slice(1);
			return { ...state, newNotifications };
		case 'MARK_IS_READ':
			return { ...state, isRead: action.payload };
		case 'CLEAR':
			return { ...state, isRead: action.payload };
		default:
			return state;
	}
}

const NotificationsProvider = ({children} : {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { lastJsonMessage, sendJsonMessage } = useGlobalWebSocketContext()
	// const { lastJsonMessage, sendJsonMessage } = useWebSocket(
	// 	NOTI_WS_ENDPOINT
	//   )

	useEffect(() => {
		// console.log('new message from ws');
		// console.log(lastJsonMessage);
		if (lastJsonMessage) {
			if (lastJsonMessage.type == 'notification' && lastJsonMessage.message == 'notification') {
				console.log('lastJsonMessage.data');
				console.log(lastJsonMessage.data);
				dispatch({type: 'PUSH_NOTIFICATION', notification: lastJsonMessage.data, dispatch})
			}

		}
	}, [lastJsonMessage])

	return (
		<GlobalContext.Provider value={{state, dispatch, lastJsonMessage, sendJsonMessage}}>
			{children}
		</GlobalContext.Provider>
	)
}

export const useNotificationsContext = () => useContext(GlobalContext);
export default NotificationsProvider;
