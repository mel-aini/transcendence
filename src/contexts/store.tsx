import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import jwt from "../utils/jwt";

export interface GlobalStateProps {
	isLogin: boolean
	isLoading: boolean
}

const initialState: GlobalStateProps = {
	isLogin: false,
	isLoading: false
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
			return { ...state, isLogin: true }
		case 'LOGOUT':
			jwt.remove()
			return { ...state, isLogin: false }
		case 'LOADING':
			return { ...state, isLoading: !state.isLoading }
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