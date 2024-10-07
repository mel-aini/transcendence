import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import { useAuthContext } from "./authProvider";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { dateMeta, getDate } from "../utils/global";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Modal from "../components/Modal";
import { useNotificationsContext } from "./notificationsProvider";
import { useNavigate } from "react-router-dom";
import { WS_END_POINT } from "../utils/urls";
import api from "../api/axios";

type Url = string;
type Username = string;

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
	status: boolean
}

interface OnlineFriend {
	id?: string | number
	avatar_link: Url
	conversation_id: string | number
	username: Username
	isOnline?: boolean
}

interface Message {
	content:  string
	date: string
	id: number
	receiver: string
	sender: string
	state?: 'processing' | 'ok' | 'error'
}

interface ConversationState {
	id: string | number | null,
	state: null | 'loading' | 'ok'
	limitReached?: boolean
};

export interface ChatStateProps {
	isFocus: boolean,
	messages: Message[],
	onlineFriends: OnlineFriend[],
	conversations: Conversation[],
	searchConversations: Conversation[],
	conversation: ConversationState
	conversation_header: Header
	lastMessage: Message | null
}

const initialState: ChatStateProps = {
	isFocus: false,
	messages: [],
	onlineFriends: [],
	conversations: [],
	conversation: {
		id: null,
		state: null
	},
	searchConversations: [],
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
				conversation: action.conversation
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
		case 'SEARCH_CONVERSATIONS':
			return { 
				...state, 
				searchConversations: action.conversations
			}
		default:
			return state;
	}
}

type updatedConv = {
	last_date: string
	last_message: string
	sender: string
	status: string
}

const ChatContextProvider = ({children} : {children: ReactNode}) => {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const { state: authState } = useAuthContext();
	const [isReconnect, setIsReconnect] = useState(false);
	const { dispatch: notDispatch } = useNotificationsContext();

	function setErrorInLastMessage() {
		if (state.lastMessage != null) {
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

	const updateConversations = async (id: string | number, data: updatedConv) => {
		let OldConv: Conversation | any = {};
		const newArr = state.conversations.filter((conv: Conversation) => {
			const condition = conv.id != id;
			if (!condition) {
				console.log(conv);
				OldConv = {...conv};
			}
			return condition;
		})

		OldConv.last_date = data.last_date
		OldConv.last_message = data.last_message
		OldConv.sender = data.sender
		OldConv.status = data.status
		console.log(newArr.length, state.conversations.length)
		if (newArr.length == state.conversations.length) {
			console.log('equal')
			console.log(data.sender, authState.username)
			// new conversation
			if (data.sender != authState.username) {
				console.log('conv not found')
				const userData = await api.get('users/' + data.sender);
				OldConv.id = id;
				OldConv.friend = {
					avatar: userData.data.profile_image,
					online: userData.data.online,
					username: userData.data.username
				}
			}
		}
		
		console.log('new conv');
		console.table(OldConv)
		newArr.unshift(OldConv);
		// console.log(OldConv.username != state.conversation_header.username)
		if (OldConv.username != state.conversation_header.username && OldConv.sender != authState.username) {
			notDispatch({type: 'PUSH_NOTIFICATION', notification: {
				notification_id: undefined,
				type: "message",
				content: `new message from ${OldConv.sender}`,
				read: false, 
				id: OldConv.id,
				sender: OldConv.sender
			}, dispatch: notDispatch})
		}
		dispatch({type: 'CONVERSATIONS', conversations: [...newArr]})
	}

	const {readyState, lastJsonMessage, sendJsonMessage} = useWebSocket(
		WS_END_POINT + "chat/?token=" + authState.accessToken,
		{
			onOpen: () => {
				console.log('connection opened')
				setIsReconnect(false);
			},
			onClose: () => {
				console.log('connection closed')
				setErrorInLastMessage();
				// setIsReconnect(true);
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
		console.log('new message')
		console.log(lastJsonMessage);

		if (lastJsonMessage) {
			if (lastJsonMessage.online) {
				dispatch({type: 'ONLINE', onlineFriends: lastJsonMessage.online})
			}
			if (lastJsonMessage.conversations) {
				console.table(lastJsonMessage);
				dispatch({type: 'CONVERSATIONS', conversations: lastJsonMessage.conversations})
			}
			if (lastJsonMessage.messages) {
				dispatch({type: 'MESSAGES', messages: [ ...lastJsonMessage.messages, ...state.messages ]})
				dispatch({type: 'CONVERSATION', conversation: {
					id: state.conversation.id,
					state: 'ok',
					limitReached: lastJsonMessage.messages.length != 10
				}})
			}
			// if (lastJsonMessage.search_conversation) {
			// 	dispatch({type: 'SEARCH_CONVERSATIONS', conversations: lastJsonMessage.search_conversation});
			// }
			if (lastJsonMessage.type == 'message') {
				if (lastJsonMessage.receiver == authState.username) {
					// I'm the receiver
					dispatch({type: 'MESSAGE', message: {
						content: lastJsonMessage.message,
						date: dateMeta.getDate(),
						sender: state.conversation_header.username,
						receiver: authState.username,
						state: 'ok'
					}});
					// updateConversations(state.conversation.id, {
					// 	last_date: dateMeta.getDate(),
					// 	last_message: lastJsonMessage.message,
					// 	sender: state.conversation_header.username,
					// 	status: 'True'
					// });
					
				} else {
					// I'm the sender
					dispatch({type: 'LAST_MESSAGE', message: null});
					dispatch({type: 'MESSAGE', message: {
						content: lastJsonMessage.message,
						date: dateMeta.getDate(),
						sender: authState.username,
						receiver: state.conversation_header.username,
						state: 'ok'
					}});
					// updateConversations(state.conversation.id, {
					// 	last_date: dateMeta.getDate(),
					// 	last_message: lastJsonMessage.message,
					// 	sender: authState.username || '',
					// 	status: 'False'
					// });
				}
			}
			if (lastJsonMessage.type == 'conversation_update') {
				// const newArr = state.conversations.filter
				updateConversations(lastJsonMessage.data.id, {
					last_date: lastJsonMessage.data.last_date,
					last_message: lastJsonMessage.data.last_message,
					sender: lastJsonMessage.data.sender,
					status: lastJsonMessage.data.status
				});
			}
			if (lastJsonMessage.type == 'update_data') {
				// for update online users status
				let newList: OnlineFriend[] = [];
				type responseData = {
					id:	number | string
					username: string
					avatar_link: string
					is_online:	boolean
					conversation_id: number | string
				}
				const data: responseData = lastJsonMessage.data
				const isFound = state.onlineFriends.find((friend: OnlineFriend) => friend.username == data.username);
				if (!isFound) {
					console.log('user offline');
					newList = [...state.onlineFriends, data]
				}
				else {
					console.log('user online');
					newList = state.onlineFriends.filter((friend: OnlineFriend) => {
						if (friend.username == data.username) {
							return data.is_online
						}
						return true
					})
				}
				dispatch({type: 'ONLINE', onlineFriends: newList})
			}
			if (lastJsonMessage.type == 'getConversation') {
				console.log('trying to open chat with this friend');
				dispatch({type: 'FOCUS', state: true})
				dispatch({type: 'CONVERSATION', conversation: {
					id: lastJsonMessage.id,
					state: 'loading'
				}});
				sendJsonMessage({
					type: 'messages',
					conversation_id: lastJsonMessage.id,
					user_id: authState.user_id
				})
			}
		}
	}, [lastJsonMessage])

	useEffect(() => {
		// console.log('trying to make new call to the web socket...', state.conversation_id)
		if (state.conversation.state == 'loading') {
			dispatch({type: 'MESSAGES', messages: []})
			console.log(authState)
			sendJsonMessage({
				type: 'messages',
				conversation_id: state.conversation.id,
				user_id: authState.user_id
			})
		}
	}, [state.conversation])

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