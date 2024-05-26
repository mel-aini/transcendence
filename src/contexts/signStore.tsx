import { Dispatch, ReactNode, createContext, useReducer } from "react";

interface InitialStateProps {
	test: boolean
}

const initialState: InitialStateProps = {
	test: false
};

const SignContext = createContext<{state: InitialStateProps, dispatch: Dispatch<any>}>({
	state: initialState,
	dispatch: () => {}
});

const reducer = (state: InitialStateProps, action: any) => {
	switch (action.type)
	{
		case 'ENTERUSERNAME':
			// console.log(action.type, state);
			return { 
				test: !state.test
			}
		default:
			return state;
	}
}

const SignContextProvider = ({children} : {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	
	return (
		<SignContext.Provider value={{state, dispatch}}>
			{children}
		</SignContext.Provider>
	)
}

export { SignContext };
export default SignContextProvider;