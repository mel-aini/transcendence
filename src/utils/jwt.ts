import { jwtDecode } from 'jwt-decode'
import api from '../api/axios';
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

	async refresh(accessToken?: string) {
		console.log('refreshing...')
		try {
			let res;
			if (accessToken) {
				console.log('using axios')
				res = await axios.post('http://localhost:8000/api/' + 'token/refresh/', {
					Headers: {
						'Authorization': `Bearer ${accessToken}`
					}
				});
			} else {
				console.log('using api')
				res = await api.post('token/refresh/')
			}
			console.log('res.data');
			console.log(res.data);
			return res.data.access_token
		} catch (error) {
			console.log('is null');
			return null;
		}
	}
}

const jwt = new Jwt();

export default jwt;