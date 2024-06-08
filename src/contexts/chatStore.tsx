import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";

export interface ChatStateProps {
	isFocus: boolean,
	messages: any[]
}

const initialState: ChatStateProps = {
	isFocus: false,
	messages: []
};

export const ChatContext = createContext<{state: ChatStateProps, dispatch: Dispatch<any>}>({
	state: initialState,
	dispatch: () => {}
});

const reducer = (state: ChatStateProps, action: any) => {
	switch (action.type)
	{
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
			console.log('new message', action.message)
			return { 
				...state, 
				messages: [...state.messages, action.message] 
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