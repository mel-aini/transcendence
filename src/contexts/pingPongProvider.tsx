import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";

export enum Levels {
	FindingOpponent,
	OpponentFound,
	OpponentIsReady,
	WaitingForOpponent
}

export interface PingPongStateProps {
	level: Levels
}

const initialState: PingPongStateProps = {
	level: Levels.FindingOpponent
};

export const PingPongContext = createContext<{state: PingPongStateProps, dispatch: Dispatch<any>}>({
	state: initialState,
	dispatch: () => {}
});

const reducer = (state: PingPongStateProps, action: any) => {
	switch (action.type)
	{
		case 'CHLEVEL':
			return {
				...state,
				level: action.level
			}
		default:
			return state;
	}
}

const PingPongContextProvider = ({children} : {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	
	return (
		<PingPongContext.Provider value={{state, dispatch}}>
			{children}
		</PingPongContext.Provider>
	)
}

export const usePingPongContext = () => useContext(PingPongContext);
export default PingPongContextProvider;