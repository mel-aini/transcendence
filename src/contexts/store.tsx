import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";

export interface GlobalStateProps {
	isLoading: boolean
	alert: boolean
	alertMessage: string
}

const initialState: GlobalStateProps = {
	isLoading: false,
	alert: false,
	alertMessage: ''
};

export const GlobalContext = createContext<{state: GlobalStateProps, dispatch: Dispatch<any>}>({
	state: initialState,
	dispatch: () => {}
});

// export const GLOBAL_CONTEXT_OPTIONS = {
// 	ALERT: 'ALERT',
// 	LOADING: 'LOADING'
// }

const reducer = (state: GlobalStateProps, action: any) => {
	switch (action.type)
	{
		case 'LOADING':
			if (action.state == true) {
				return { ...state, isLoading: true }
			}
			return { ...state, isLoading: false }
		case 'ALERT':
			if (action.display == false) {
				return { 
					...state, 
					alert: false, 
					alertMessage: ''
				}
			}
			return { 
				...state, 
				alert: true, 
				alertMessage: action.content 
			}
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