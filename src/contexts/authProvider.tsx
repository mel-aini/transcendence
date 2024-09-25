import { Dispatch, ReactNode, createContext, useContext, useEffect, useLayoutEffect, useReducer } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";

export interface GlobalStateProps {
	accessToken: string | null
	username: string | undefined
	user_id: string | undefined
}

const initialState: GlobalStateProps = {
	accessToken: null,
	username: undefined,
	user_id: undefined
};

export const AuthContext = createContext<{state: GlobalStateProps, dispatch: Dispatch<any>}>({
	state: initialState,
	dispatch: () => {}
});

const reducer = (state: GlobalStateProps, action: any) => {
	switch (action.type)
	{
		case 'TOKEN':
			console.log('update token', action.token)
			return { ...state, accessToken: action.token}
		case 'USERNAME':
			return { ...state, username: action.username}
		case 'USER_ID':
			return { ...state, user_id: action.userId}
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
		if (state.accessToken) {
			const payload: JwtPayload & { user_id: string } = jwtDecode(state.accessToken);
			dispatch({type: 'USER_ID', userId: payload.user_id})
		} else {
			dispatch({type: 'USER_ID', userId: undefined})
		}
	
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
						navigate('/login')
						return Promise.reject(error)
					}
					originRequest.config.headers[NO_RETRY_HEADER] = 'true';
					const res = await api.post('/api/token/refresh/');
					console.log('trying to refresh token');
					console.log(res)
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