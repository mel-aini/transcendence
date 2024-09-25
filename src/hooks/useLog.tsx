import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authProvider";
import api from "../api/axios";

const useLog = () => {
	const {dispatch} = useAuthContext()
	const navigate = useNavigate();

	const action = async (type: 'LOGIN' | 'LOGOUT') => {
		switch (type) {
			case 'LOGIN':
				// code
				break;
			case 'LOGOUT':
				// code
				try {
					await api.post('api/logout/');
					dispatch({type: 'TOKEN', token: null})
					navigate('/')
				} catch (error) {
					
				}
				break;
		}
	}

	return action;
}

export default useLog;