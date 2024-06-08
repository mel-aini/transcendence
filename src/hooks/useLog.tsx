import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/store";

const useLog = () => {
	const {dispatch} = useGlobalContext();
	const navigate = useNavigate();

	const action = (type: 'LOGIN' | 'LOGOUT') => {
		switch (type) {
			case 'LOGIN':
				// code
				break;
			case 'LOGOUT':
				// code
				dispatch({type: 'LOADING', state: true})
				dispatch({type: 'LOGOUT'});
				navigate('/')
				break;
		}
	}

	return action;
}

export default useLog;