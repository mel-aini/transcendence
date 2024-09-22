import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import { UserData } from "../types/profile";

export interface INotification {
	notification_id: string, 
	type: "friend-request" | "game-request" | "text" | "join-game" | "join-tournament" | "message"
	content: string
	read: boolean, 
	id: string,
	sender?: string
}

export interface GlobalStateProps {
	isLoading: boolean
	alert: boolean
	alertMessage: string
	search: boolean
	userData: UserData | null,
	gameId: string | null,
	AIdata: {
		time: number,
		goals: string,
		difficulty: string,
	}
}

const initialState: GlobalStateProps = {
	isLoading: false,
	alert: false,
	alertMessage: '',
	search: false,
	userData: null,
	gameId: null,
	AIdata: {
		time: 3,
		goals: "5",
		difficulty: "medium",
	}
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
		case 'GAME_ID':
			return { 
				...state,
				gameId: action.gameId
			}
		case 'AI_DATA':
			return { 
				...state,
				AIdata: action.AIdata
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