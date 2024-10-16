import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import { UserData } from "../types/profile";

export interface INotification {
	notification_id: string, 
	type: "friend-request" | "game-request" | "text" | "join-game" | "join-tournament" | "message" | "none"
	content: string
	read: boolean, 
	id: string,
	sender?: string
}

export interface GlobalStateProps {
	isLoading: boolean
	alert: {
		state: boolean,
		message: string,
		timer: number | null,
		isError: boolean
	}
	search: boolean
	userData: UserData | null,
	gameId: string | null,
	localGameData: {
		time: number,
		goals: number,
		difficulty: "easy" | "medium" | "hard",
	}
}

const initialState: GlobalStateProps = {
	isLoading: false,
	alert: {
		state: false,
		message: '',
		timer: null,
		isError: false
	},
	search: false,
	userData: null,
	gameId: null,
	localGameData: {
		time: 3,
		goals: 5,
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
		
			setTimeout(() => {
                action.dispatch({ type: 'ALERT_OFF' });
            }, action.timer || 1300);
			return { 
				...state, 
				alert: {
					state: true,
					message: action.message,
					timer: action.timer || 1300,
					isError: action.isError
				}
			}
		case 'ALERT_OFF':
			return { 
				...state, 
				alert: {
					state: false,
					message: '',
					timer: null,
					isError: false
				}
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
		case 'LOCAL_GAME_DATA':
			return { 
				...state,
				localGameData: action.localGameData
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