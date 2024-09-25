import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../contexts/store";
import { API_END_POINT } from "../utils/urls";

const useOAuth = (): [() => Promise<void>, boolean] => {
	const [searchParams] = useSearchParams();
	const [toggle, setToggle] = useState<boolean>(false)
	const {dispatch} = useGlobalContext();

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
		
			const response = await fetch(API_END_POINT + 'register/', {
				method: 'Post',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data)
			})
	
			const body = await response.json();
			
			if (!response.ok) throw new Error('response error');

			setToggle(prev => !prev) // just for re render
			
			dispatch({type: 'LOGIN', jwt: body.jwt})

			body.isUser ? navigate('/profile') : navigate('/signup?isUser=false');
			// navigate('/signup?isUser=false');

		} catch (error) {
			console.log(error);
		}
		dispatch({type: 'LOADING', state: false});
	}

	return [ handleOAuth, toggle ]
}

export default useOAuth;