import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";

export interface ChatStateProps {
	isFocus: boolean
}

const initialState: ChatStateProps = {
	isFocus: false
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
				return { isFocus: true}
			return { isFocus: false}
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