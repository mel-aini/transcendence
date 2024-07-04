import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/store";
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
				navigate('/')
				break;
		}
	}

	return action;
}

export default useLog;