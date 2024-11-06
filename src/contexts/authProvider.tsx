import { Dispatch, ReactNode, createContext, useContext, useLayoutEffect, useReducer } from "react";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";
import jwt from "@/utils/jwt";

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

export enum AUTH_OPTS {
	TOKEN,
	USERNAME,
	USER_ID
}

const reducer = (state: GlobalStateProps, action: any) => {
	switch (action.type)
	{
		case AUTH_OPTS.TOKEN:
			return { ...state, accessToken: action.token}
		case AUTH_OPTS.USERNAME:
			return { ...state, username: action.username}
		case AUTH_OPTS.USER_ID:
			return { ...state, user_id: action.userId}
		default:
			return state;
	}
}

const AuthContextProvider = ({children} : {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();

	useLayoutEffect(() => {
		console.log('access token updated', state.accessToken)
	}, [state.accessToken])

	useLayoutEffect(() => {
		// intercept requests
		const id = api.interceptors.request.use((reqConfig) => {
			reqConfig.headers.Authorization = `Bearer ${state.accessToken}`;
			return reqConfig;
		})
		if (state.accessToken) {
			const payload: JwtPayload & { user_id: string } = jwtDecode(state.accessToken);
			dispatch({type: AUTH_OPTS.USER_ID, userId: payload.user_id})
		} else {
			dispatch({type: AUTH_OPTS.USER_ID, userId: undefined})
		}
	
		return () => {
			api.interceptors.request.eject(id)
		}
	}, [state.accessToken])

	useLayoutEffect(() => {
		// intercept responses
		const id = api.interceptors.response.use(
		response => response, // Directly return successful responses.
		async error => {
			const originalRequest = error.config;
			if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
			try {
				// const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the stored refresh token.
				// Make a request to your auth server to refresh the token.
				const token = await jwt.refresh('access_expired');

				if (!token) {
					throw error;
				}
				dispatch({type: AUTH_OPTS.TOKEN, token: token})
				// Update the authorization header with the new access token.
				api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
				return api(originalRequest); // Retry the original request with the new access token.
			} catch (refreshError) {
				// Handle refresh token errors by clearing stored tokens and redirecting to the login page.
				dispatch({type: AUTH_OPTS.TOKEN, token: null})
				navigate('/login')
				return Promise.reject(refreshError);
			}
			}
			return Promise.reject(error); // For all other errors, return the error as is.
		}
		);

		return () => {
			api.interceptors.request.eject(id)
		}
	}, [])

	return (
		<AuthContext.Provider value={{state, dispatch}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => useContext(AuthContext);
export default AuthContextProvider;