import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import { useAuthContext } from "./authProvider";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { CHAT_WS_ENDPOINT } from "../utils/global";
import { SendJsonMessage, WebSocketHook } from "react-use-websocket/dist/lib/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Modal from "../components/Modal";

type Url = string;
type Username = string;
type State = 'read' | 'unread' | 'sent'

interface Header {
	username: Username
	avatar: Url
	isOnline: boolean
}

export interface Conversation {
	friend: {
		username: Username
		avatar: Url
		online: boolean
	}
	id: string | number
	last_date: string
	last_message: string
	sender: Username
	status: State
}

interface OnlineFriend {
	avatar_link: Url
	conversation_id: string | number
	username: Username
}

interface Message {
	content:  string
	date: string
	id: number
	receiver: string
	sender: string
	state?: 'processing' | 'ok' | 'error'
}

export interface ChatStateProps {
	isFocus: boolean,
	messages: Message[],
	onlineFriends: OnlineFriend[],
	conversations: Conversation[],
	conversation_id: string | number | null;
	conversation_header: Header
	lastMessage: Message | null
}

const initialState: ChatStateProps = {
	isFocus: false,
	messages: [],
	onlineFriends: [],
	conversations: [],
	conversation_id: null,
	conversation_header: {
		username: '',
		avatar: '',
		isOnline: false
	},
	lastMessage: null,
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
		case 'LAST_MESSAGE':
			return { 
				...state,
				lastMessage: action.message
			}
		case 'CONVERSATION':
			return { 
				...state, 
				conversation_id: action.conversation_id
			}
		case 'CONVERSATION_HEADER':
			return { 
				...state, 
				conversation_header: action.conversation_header
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
	const [isReconnect, setIsReconnect] = useState(false);
	
	function setErrorInLastMessage() {
		if (state.lastMessage != null) {
			// remove message after response come
			const content = state.lastMessage.content;
			dispatch({type: 'LAST_MESSAGE', message: null});
			dispatch({type: 'MESSAGE', message: {
				content: content,
				date: "2024-06-27 12:58:51",
				sender: authState.username,
				receiver: state.conversation_header.username,
				id: null,
				state: 'error'
			}});
		}
	}

	const {readyState, lastJsonMessage, sendJsonMessage} = useWebSocket(
		CHAT_WS_ENDPOINT + authState.accessToken,
		{
			onOpen: () => {
				console.log('connection opened')
				setIsReconnect(false);
			},
			onClose: () => {
				console.log('connection closed')
				setErrorInLastMessage();
				setIsReconnect(true);
			},
			onError: () => {
				console.log('error occured in websocket')
				setErrorInLastMessage()
			},
			retryOnError: false,
			shouldReconnect: () => {
				return true;
			},
			reconnectAttempts: 100,
			reconnectInterval: 3000,
			onReconnectStop: () => {
				console.log('failed to reconnect');
				setIsReconnect(false);
			}
		}
	  )
	
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
			if (lastJsonMessage.message && lastJsonMessage.receiver) {
				const message = state.lastMessage;
				dispatch({type: 'LAST_MESSAGE', message: null});
				dispatch({type: 'MESSAGE', message: {
					...message,
					state: 'ok'
				}});
			}
		}
	}, [lastJsonMessage])

	useEffect(() => {
		// console.log('trying to make new call to the web socket...', state.conversation_id)
		if (state.conversation_id) {
			dispatch({type: 'MESSAGES', messages: []})
			sendJsonMessage({
				type: 'messages',
				conversation_id: state.conversation_id,
			})
			sendJsonMessage({
				type: 'updated conversation',
				conversation_id: state.conversation_id,
				status: 'seen'
			})
		}
	}, [state.conversation_id])

	return (
		<ChatContext.Provider value={{state, dispatch, lastJsonMessage, sendJsonMessage, readyState}}>
			<>
				<Modal isOpen={isReconnect} onClose={() => {}} >
					<div className="flex gap-5 items-center bg-secondary px-10 p-5 rounded-md">
						<h1>Reconnecting</h1>
						<AiOutlineLoading3Quarters className='animate-spin' />
					</div>
				</Modal>
				{children}
			</>
		</ChatContext.Provider>
	)
}

export const useChatContext = () => useContext(ChatContext);
export default ChatContextProvider;