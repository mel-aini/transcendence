import { Dispatch, ReactNode, createContext, useContext, useLayoutEffect, useReducer } from "react";
import api from "../api/axios";

export interface GlobalStateProps {
	accessToken: string | null
}

const initialState: GlobalStateProps = {
	accessToken: null
};

export const AuthContext = createContext<{state: GlobalStateProps, dispatch: Dispatch<any>}>({
	state: initialState,
	dispatch: () => {}
});

const reducer = (state: GlobalStateProps, action: any) => {
	switch (action.type)
	{
		case 'TOKEN':
			return { accessToken: action.token}
		default:
			return state;
	}
}

const AuthContextProvider = ({children} : {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	
	useLayoutEffect(() => {
		// intercept requests
		const id = api.interceptors.request.use((reqConfig) => {
			reqConfig.headers.Authorization = `Bearer ${state.accessToken}`;
			return reqConfig;
		})

		return () => {
			api.interceptors.request.eject(id)
		}
	}, [state.accessToken])

	useLayoutEffect(() => {
		// intercept responses
		const id = api.interceptors.response.use(resConfig => resConfig, async (error) => {
			const originRequest = error.config;

			try {
				if (error.response.status == 401 || error.response.status == 403) {
					// access token should refresh
					const res = await api.get('/refresh');
					dispatch({type: 'TOKEN', token: res.data.refresh})
					originRequest.headers.Authorization = `Bearer ${res.data.refresh}`;
					originRequest._retry = true;
					return api(originRequest);
				}
			} catch (error) {
				dispatch({type: 'TOKEN', token: null})
			}
		})

		return () => {
			api.interceptors.request.eject(id)
		}
	}, [state.accessToken])

	return (
		<AuthContext.Provider value={{state, dispatch}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => useContext(AuthContext);
export default AuthContextProvider;