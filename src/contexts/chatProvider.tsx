import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import { useAuthContext } from "./authProvider";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { dateMeta } from "../utils/global";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Modal from "../components/Modal";
import { useNotificationsContext } from "./notificationsProvider";
import { WS_END_POINT } from "../utils/urls";
import api from "../api/axios";
import { useLocation } from "react-router-dom";

type Url = string;
type Username = string;

interface Header {
	username: Username
	avatar: Url
	isOnline: boolean
	id: string | number
}

export interface Conversation {
	friend: {
		id: string | number
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
	id: string | number
	avatar_link: Url
	conversation_id: string | number
	username: Username
	is_online?: boolean
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
	newMessageTriggered: boolean
	unreadConv: boolean
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
		isOnline: false,
		id: ''
	},
	lastMessage: null,
	newMessageTriggered: false,
	unreadConv: false
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
				messages: [...state.messages, action.message],
				newMessageTriggered: !state.newMessageTriggered
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
		case 'UNREAD_CONVERSATION':
			return { 
				...state, 
				unreadConv: action.status
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
	friend: {
		avatar_link: string
		id: string | number
		is_online: boolean
		username: string
	}
}

const ChatContextProvider = ({children} : {children: ReactNode}) => {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const { state: authState } = useAuthContext();
	const [isReconnect, setIsReconnect] = useState(false);
	const { dispatch: notDispatch } = useNotificationsContext();
	const location = useLocation();

	function setErrorInLastMessage() {
		if (state.lastMessage != null) {
			const content = state.lastMessage.content;
			dispatch({type: 'LAST_MESSAGE', message: null});
			dispatch({type: 'MESSAGE', message: {
				content: content,
				date: dateMeta.getDate(),
				sender: authState.username,
				receiver: state.conversation_header.username,
				id: null,
				state: 'error'
			}});
		}
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

	  const updateConversations = async (id: string | number | null, data: updatedConv | null, type?: 'read') => {
	
		if (type == 'read') {
			console.log('read event occured')
			for (let i = 0; i < state.conversations.length; i++) {
				const conv: Conversation = state.conversations[i];
				if (conv.id == state.conversation.id) {
					console.log('in conv', conv)
					conv.status = true;
					break;
				}
				
			}
			dispatch({type: 'CONVERSATIONS', conversations: [...state.conversations]})
		}
		else {
			if (!data) return;
			const newArr = state.conversations.filter((conv: Conversation) => {
				return conv.id != id;
			})
			
			newArr.unshift(data);
			if (data.friend.username != state.conversation_header.username && data.sender != authState.username) {
				// in case of new message comes
				notDispatch({type: 'PUSH_NOTIFICATION', notification: {
					notification_id: undefined,
					type: "message",
					content: `new message from ${data.sender}`,
					read: false, 
					id: null,
					sender: data.sender
				}, dispatch: notDispatch})

				if (location.pathname != '/chat') {
					dispatch({type: 'UNREAD_CONVERSATION', status: true})
				}
			}
			dispatch({type: 'CONVERSATIONS', conversations: [...newArr]})
		}
	}

	useEffect(() => {
		console.log('new message')
		console.log(lastJsonMessage);

		if (lastJsonMessage) {
			if (lastJsonMessage.online) {
				dispatch({type: 'ONLINE', onlineFriends: lastJsonMessage.online})
			}
			if (lastJsonMessage.conversations) {
				const conv = lastJsonMessage.conversations.find((conv: Conversation) => conv.status == false && conv.sender != authState.username);
				// console.log('lastJsonMessage.conversations', lastJsonMessage.conversations)
				// console.log('conv', conv)
				dispatch({type: 'CONVERSATIONS', conversations: lastJsonMessage.conversations})
				dispatch({type: 'UNREAD_CONVERSATION', status: conv ? true : false})
			}
			if (lastJsonMessage.messages) {
				dispatch({type: 'MESSAGES', messages: [ ...lastJsonMessage.messages, ...state.messages ]})
				dispatch({type: 'CONVERSATION', conversation: {
					id: state.conversation.id,
					state: 'ok',
					limitReached: lastJsonMessage.messages.length != 10
				}})
				if (!lastJsonMessage.conversations) {
					// so it's not first time
					updateConversations(null, null, 'read')
				}
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
					updateConversations(null, null, 'read')
					
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
				}
			}
			if (lastJsonMessage.type == 'conversation_update') {
				// const newArr = state.conversations.filter
				updateConversations(lastJsonMessage.data.id, lastJsonMessage.data);
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
				const isFound = state.onlineFriends.find((friend: OnlineFriend) => friend.id == data.id);
				if (!isFound) {
					console.log('user was offline');
					newList = [...state.onlineFriends]
					if (data.is_online) {
						newList.push(data);
					}
				}
				else {
					// User already online
					// update online users
					newList = state.onlineFriends.filter((friend: OnlineFriend) => {
						if (friend.id == data.id) {
							friend = data;
							return data.is_online
						}
						return true
					})
					// update conversations
					const conversations_update = state.conversations.map((conv: Conversation) => {
						if (conv.friend.id == data.id) {
							return { 
								...conv, 
								friend: {
									avatar_link: data.avatar_link,
									is_online: data.is_online,
									username: data.username
								}
							};
						}
						return conv;
					});
					dispatch({type: 'CONVERSATIONS', conversations: conversations_update});
					// update conversation header
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
			if (lastJsonMessage.type == 'update_after_accept_request') {
				// add to online friends
				const friend: OnlineFriend = {
					username: lastJsonMessage.online.username,
					avatar_link: lastJsonMessage.online.avatar_link,
					id: lastJsonMessage.online.id,
					is_online: lastJsonMessage.online.is_online,
					conversation_id: lastJsonMessage.conversation.id
				}
				const newList = [...state.onlineFriends, friend]
				dispatch({type: 'ONLINE', onlineFriends: newList})
				// add to conversation list
			}
			if (lastJsonMessage.type == 'delete_data') {
				const newConvs = state.conversations.filter((conv: Conversation) => {
					return conv.id != lastJsonMessage.conversation
				})
				dispatch({type: 'CONVERSATIONS', conversations: [...newConvs]})
				// filter online friends based on lastJsonMessage.user.id
				const newFriends = state.onlineFriends.filter((friend: OnlineFriend) => {
					return friend.username != lastJsonMessage.user.username
				})
				dispatch({type: 'ONLINE', onlineFriends: newFriends})
			}
			if (lastJsonMessage.error) {
				// trying to send message after unfriend
				dispatch({type: 'MESSAGE', message: {
					content: state.lastMessage.content,
					date: dateMeta.getDate(),
					sender: authState.username,
					receiver: state.conversation_header.username,
					id: null,
					state: 'error'
				}});
				dispatch({type: 'LAST_MESSAGE', message: null});
			}
		}
	}, [lastJsonMessage])

	useEffect(() => {
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

	useEffect(() => {
		if (location.pathname != '/chat' || !state.isFocus) {
			dispatch({type: 'CONVERSATION_HEADER', conversation_header: {
				username: '',
				avatar: ''
			}})
		}
	}, [state.isFocus, location.pathname])

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

// cases where I should have friend id
// [
// 	api/users/username
// 	conversations first time
// 	api/friends/?filter=user
// ]

// when change the username, he will be offline