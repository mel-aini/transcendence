import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import { UserData } from "../types/profile";

export interface INotification {
	code: 200 | 400
	data: {
		notification_id: string, 
		type: "friend-request" | "game-request" | "text" | "join-game" | "join-tournament"
		content: string
		read: boolean, 
		id: string
	}
	identifier: any
	message: "notification"
	type: "notification"
}

export interface GlobalStateProps {
	isLoading: boolean
	alert: boolean
	alertMessage: string
	search: boolean
	userData: UserData | null
	notifications: INotification[]
}

const initialState: GlobalStateProps = {
	isLoading: false,
	alert: false,
	alertMessage: '',
	search: false,
	userData: null,
	notifications: []
};

export const GlobalContext = createContext<{state: GlobalStateProps, dispatch: Dispatch<any>}>({
	state: initialState,
	dispatch: () => {}
});

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
		case 'SEARCH':
			return { 
				...state,
				search: !state.search
			}
		case 'USER_DATA':
			return { 
				...state,
				userData: action.userData
			}
		case 'NOTIFICATIONS':
			return { 
				...state,
				notifications: [...state.notifications, ...action.notifications]
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