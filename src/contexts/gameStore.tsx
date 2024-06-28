import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";

export interface GameData {
	counter: number
	status: string
}

const initialState: GameData = {
	counter: 3,
	status: "ready"
};

export const GameContext = createContext<{state: GameData, dispatch: Dispatch<any>}>({
	state: initialState,
	dispatch: () => {}
});

const reducer = (state: GameData, action: any) => {
	switch (action.type)
	{
		case 'COUNTER':
			return { 
				...state, 
				counter: action.counter
			}
		case 'STATUS':
			return { 
				...state, 
				status: action.status
			}
		default:
			return state;
	}
}

const GameContextProvider = ({children} : {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	
	return (
		<GameContext.Provider value={{state, dispatch}}>
			{children}
		</GameContext.Provider>
	)
}

export const useGameContext = () => useContext(GameContext);
export default GameContextProvider;
