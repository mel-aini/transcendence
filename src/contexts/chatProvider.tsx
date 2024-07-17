import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { useAuthContext } from "./authProvider";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { CHAT_WS_ENDPOINT } from "../utils/global";
import { SendJsonMessage, WebSocketHook } from "react-use-websocket/dist/lib/types";

interface Message {
	content:  string
	date: string
	id: number
	receiver: string
	sender: string
}

export interface ChatStateProps {
	isFocus: boolean,
	messages: Message[],
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
			console.log(action.message)
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

	  useEffect(() => {
		if (readyState == ReadyState.OPEN) {
			console.log('connection opened')
		}
		if (readyState == ReadyState.CLOSED) {
			console.log('connection closed')
		}
	}, [readyState])
	
	useEffect(() => {
		console.log('new message', lastJsonMessage)
		if (lastJsonMessage) {
			if (lastJsonMessage.online) {
				dispatch({type: 'ONLINE', onlineFriends: lastJsonMessage.online})
			}
			if (lastJsonMessage.conversations) {
				dispatch({type: 'CONVERSATIONS', conversations: lastJsonMessage.conversations})
			}
			if (lastJsonMessage.messages) {
				dispatch({type: 'MESSAGES', messages: [ ...lastJsonMessage.messages, ...state.messages ]})
			}
		}
	}, [lastJsonMessage])

	useEffect(() => {
		console.log('trying to make new call to the web socket...', state.conversation_id)
		if (state.conversation_id) {
			dispatch({type: 'MESSAGES', messages: []})
			sendJsonMessage({
				type: 'messages',
				conversation_id: state.conversation_id,
			})
		}
	}, [state.conversation_id])

	useEffect(() => {
		console.log(state.messages)
	}, [state.messages])

	return (
		<ChatContext.Provider value={{state, dispatch, lastJsonMessage, sendJsonMessage, readyState}}>
			{children}
		</ChatContext.Provider>
	)
}

export const useChatContext = () => useContext(ChatContext);
export default ChatContextProvider;