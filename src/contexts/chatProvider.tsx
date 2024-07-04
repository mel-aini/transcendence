import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { useAuthContext } from "./authProvider";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { CHAT_WS_ENDPOINT } from "../utils/global";
import { SendJsonMessage, WebSocketHook } from "react-use-websocket/dist/lib/types";

export interface ChatStateProps {
	isFocus: boolean,
	messages: any[],
	onlineFriends: any[],
	conversations: any[],
	conversation_id: string | number | null;
}

const initialState: ChatStateProps = {
	isFocus: false,
	messages: [],
	onlineFriends: [],
	conversations: [],
	conversation_id: null
};

export const ChatContext = createContext<{state: ChatStateProps, dispatch: Dispatch<any>, lastJsonMessage: any, sendJsonMessage: SendJsonMessage, readyState: ReadyState}>({
	state: initialState,
	dispatch: () => {},
	lastJsonMessage: '',
	sendJsonMessage: () => {},
	readyState: ReadyState.CLOSED
});

const reducer = (state: ChatStateProps, action: any) => {
	switch (action.type)
	{
		case 'SOCKET':
			return { 
				...state, 
				ws: action.socket
			}
		case 'FOCUS':
			if (action.state == true)
				return {
			 		...state, 
					isFocus: true
				}
			return { 
				...state, 
				isFocus: false
			}
		case 'MESSAGE':
			return { 
				...state, 
				messages: [...state.messages, action.message] 
			}
		case 'CONVERSATION':
			return { 
				...state, 
				conversation_id: action.conversation_id
			}
		case 'MESSAGES':
			return { 
				...state, 
				messages: action.messages
			}
		case 'ONLINE':
			return { 
				...state, 
				onlineFriends: action.onlineFriends
			}
		case 'CONVERSATIONS':
			return { 
				...state, 
				conversations: action.conversations
			}
		default:
			return state;
	}
}

const ChatContextProvider = ({children} : {children: ReactNode}) => {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const { state: authState } = useAuthContext();

	const {readyState, lastJsonMessage, sendJsonMessage} = useWebSocket(
		CHAT_WS_ENDPOINT + authState.accessToken
	  )

	return (
		<ChatContext.Provider value={{state, dispatch, lastJsonMessage, sendJsonMessage, readyState}}>
			{children}
		</ChatContext.Provider>
	)
}

export const useChatContext = () => useContext(ChatContext);
export default ChatContextProvider;