import { useNavigate, useSearchParams } from "react-router-dom";
import { STORE_OPTS, useGlobalContext } from "@/contexts/store";
import { API_END_POINT } from "@/utils/urls";
import axios from "axios";
import { AUTH_OPTS, useAuthContext } from "@/contexts/authProvider";

const useOAuth = (): [() => Promise<void>] => {
	const [searchParams] = useSearchParams();
	// const [toggle, setToggle] = useState<boolean>(false)
	const { dispatch } = useGlobalContext();
	const { dispatch: authDispatch } = useAuthContext();
	const navigate = useNavigate();

	const handleOAuth = async () => {

		const code: string | null = searchParams.get('code');
		const state: string | null = searchParams.get('state');

		if (!code && !state) return;
		
		dispatch({type: STORE_OPTS.LOADING, state: true});
		try {
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
				// console.log('response: ', response)
				authDispatch({type: AUTH_OPTS.TOKEN, token: response.data.access_token});
				navigate('/dashboard')

			} catch (error) {
				console.log('error in response', error)
			}

		} catch (error) {
			console.log(error);
		}
		dispatch({type: STORE_OPTS.LOADING, state: false});
	}

	return [ handleOAuth ]
}

export default useOAuth;