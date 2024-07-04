import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";

export interface ChatStateProps {
	isFocus: boolean,
	messages: any[],
	onlineFriends: any[],
	conversations: any[],
	conversation_id: string | number | null;
	ws: WebSocket | null

}

const initialState: ChatStateProps = {
	isFocus: false,
	messages: [],
	onlineFriends: [],
	conversations: [],
	conversation_id: null,
	ws: null
};

export const ChatContext = createContext<{state: ChatStateProps, dispatch: Dispatch<any>}>({
	state: initialState,
	dispatch: () => {}
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
	const [state, dispatch] = useReducer(reducer, initialState);
	
	return (
		<ChatContext.Provider value={{state, dispatch}}>
			{children}
		</ChatContext.Provider>
	)
}

export const useChatContext = () => useContext(ChatContext);
export default ChatContextProvider;