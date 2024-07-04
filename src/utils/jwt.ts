import { jwtDecode } from 'jwt-decode'
import api from '../api/axios';


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

	async refresh() {
		try {
			const res = await api.post('api/token/refresh');
			console.log(res);
		} catch (error) {
			return null;
		}
	}
}

const jwt = new Jwt();

export default jwt;