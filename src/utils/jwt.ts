import { jwtDecode } from 'jwt-decode'
import api from '@/api/axios';
import axios from 'axios';
import { API_END_POINT } from './urls';

class Jwt {

	constructor() {}

	isValid(token: string | null) {
		if (!token) return false;
		const payload = jwtDecode(token);
		const currentTime = Date.now() / 1000;

		if (!payload.exp || currentTime > payload.exp) {
			return false;
		}
		return true;
	}

	async refresh(access_expired?: string) {
		try {
			let res;
			if (access_expired) {
				res = await axios.post(API_END_POINT + 'token/refresh/', null, {
					withCredentials: true
				});
			} else {
				res = await api.post('token/refresh/')
			}
			return res.data.access_token
		} catch (error) {
			return null;
		}
	}
}

const jwt = new Jwt();

export default jwt;