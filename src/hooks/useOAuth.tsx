import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/store";
import { API_END_POINT } from "../utils/urls";
import axios from "axios";
import { useAuthContext } from "../contexts/authProvider";

const useOAuth = (): [() => Promise<void>, boolean] => {
	const [searchParams] = useSearchParams();
	const [toggle, setToggle] = useState<boolean>(false)
	const {dispatch} = useGlobalContext();
	const { state: authState, dispatch: authDispatch } = useAuthContext();
	const navigate = useNavigate();

	const handleOAuth = async () => {

		const code: string | null = searchParams.get('code');
		const state: string | null = searchParams.get('state');

		if (!code && !state) return;
		
		dispatch({type: 'LOADING', state: true});
		try {
			const data = {
				type : "oauth",
				data: {
					code: code,
					state: state
				}
			}
			type OAuthResponse = {
				access_token: string
				redirection: string
			}

			try {
				
				const response: OAuthResponse = await axios.post(API_END_POINT + 'register/', data, {
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					}
				})
				authDispatch({type: 'TOKEN', token: response.access_token});

			} catch (error) {
				
			}

			setToggle(prev => !prev) // just for re render

			// console.log(asdasd)

		} catch (error) {
			console.log(error);
		}
		dispatch({type: 'LOADING', state: false});
	}

	// useEffect(() => {
	// 	if (authState.accessToken) {
	// 		navigate('/dashboard')
	// 	}
	// }, [authState.accessToken])

	return [ handleOAuth, toggle ]
}

export default useOAuth;