import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import jwt from "../utils/jwt";
import { initWebSocket } from "../utils/socket";

export interface GlobalStateProps {
	isLogin: boolean
	isLoading: boolean
	ws: WebSocket | undefined
}

const initialState: GlobalStateProps = {
	isLogin: false,
	isLoading: false,
	ws: undefined
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
			return { ...state, isLogin: true, ws: initWebSocket()}
		case 'LOGOUT':
			jwt.remove()
			// socket.disconnect()
			return { ...state, isLogin: false }
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