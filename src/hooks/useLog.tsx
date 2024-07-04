import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authProvider";

const useLog = () => {
	const {dispatch} = useAuthContext()
	const navigate = useNavigate();

	const action = (type: 'LOGIN' | 'LOGOUT') => {
		switch (type) {
			case 'LOGIN':
				// code
				break;
			case 'LOGOUT':
				// code
				dispatch({type: 'LOADING', state: true})
				dispatch({type: 'TOKEN', token: null})
				document.cookie = 'csrftoken' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
				navigate('/')
				break;
		}
	}

	return action;
}

export default useLog;