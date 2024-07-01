import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import jwt from "../utils/jwt";
import useWebSocket from "react-use-websocket";

export interface GlobalStateProps {
	isLogin: boolean
	isLoading: boolean
	access: string | null
}

const initialState: GlobalStateProps = {
	isLogin: false,
	isLoading: false,
	access: null
};

export const GlobalContext = createContext<{state: GlobalStateProps, dispatch: Dispatch<any>}>({
	state: initialState,
	dispatch: () => {}
});

const reducer = (state: GlobalStateProps, action: any) => {
	switch (action.type)
	{
		case 'LOGIN':
			jwt.save(action.jwt)
			return { ...state, isLogin: true, access: action.jwt.access}
		case 'LOGOUT':
			jwt.remove()
			// socket.disconnect()
			return { ...state, isLogin: false, access: null }
		case 'LOADING':
			if (action.state == true) {
				return { ...state, isLoading: true }
			}
			return { ...state, isLoading: false }
		default:
			return state;
	}
}

const GlobalContextProvider = ({children} : {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	
	return (
		<GlobalContext.Provider value={{state, dispatch}}>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalContextProvider;