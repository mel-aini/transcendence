import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authProvider";
import api from "../api/axios";
import { useGlobalContext } from "../contexts/store";

const useLog = () => {
	const {dispatch} = useAuthContext()
	const {dispatch: gdispatch} = useGlobalContext()
	const navigate = useNavigate();

	const action = async (type: 'LOGIN' | 'LOGOUT') => {
		switch (type) {
			case 'LOGIN':
				// code
				break;
			case 'LOGOUT':
				// code
				try {
					const res = await api.post('logout/');
					// gdispatch({type: 'LOADING', state: true})
					dispatch({type: 'TOKEN', token: null})
					navigate('/')
				} catch (error) {
					
				}
				// console.log(res)
				// dispatch({type: 'TOKEN', token: null})
				// document.cookie = 'csrftoken' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
				break;
		}
	}

	return action;
}

export default useLog;