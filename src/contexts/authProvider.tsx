import { Dispatch, ReactNode, createContext, useContext, useLayoutEffect, useReducer } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

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

const NO_RETRY_HEADER = 'x-no-retry'

const AuthContextProvider = ({children} : {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();

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

			
				if (error.response.status == 401) {
					if (!error.config.headers[NO_RETRY_HEADER]) {
						dispatch({type: 'TOKEN', token: null});
						console.log('errrorrrrr');
						navigate('/login')
						return Promise.reject(error)
					}
					error.config.headers[NO_RETRY_HEADER] = 'true';
					const res = await api.post('/api/token/refresh');
					console.log(res);
					return api(originRequest);
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