import { useNavigate, useSearchParams } from "react-router-dom";
import { STORE_OPTS, useGlobalContext } from "@/contexts/store";
import { API_END_POINT } from "@/utils/urls";
import axios from "axios";
import { AUTH_OPTS, useAuthContext } from "@/contexts/authProvider";

const useOAuth = (): [() => Promise<void>] => {
	const [searchParams] = useSearchParams();
	const { dispatch } = useGlobalContext();
	const { dispatch: authDispatch } = useAuthContext();
	const navigate = useNavigate();

	const handleOAuth = async () => {

		const code: string | null = searchParams.get('code');
		const state: string | null = searchParams.get('state');

		if (!code && !state) return;
		
		dispatch({type: STORE_OPTS.LOADING, state: true});
		const data = {
			type : "oauth",
			data: {
				code: code,
				state: state
			}
		}
		try {
			
			const response = await axios.post(API_END_POINT + 'register/', data, {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				}
			})
			authDispatch({type: AUTH_OPTS.TOKEN, token: response.data.access_token});
			navigate('/dashboard')

		} catch (error) {
			dispatch({type: STORE_OPTS.ALERT, message: 'Something wrong happened', isError: true, dispatch});
		}
		dispatch({type: STORE_OPTS.LOADING, state: false});
	}

	return [ handleOAuth ]
}

export default useOAuth;