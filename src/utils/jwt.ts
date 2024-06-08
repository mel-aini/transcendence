import { JwtPayload, jwtDecode } from 'jwt-decode'

interface JWT {
	access: string,
	refresh: string
}

interface NewJwtPayload extends JwtPayload {
	user_id: number | string
}

class Jwt {

	constructor() {}

	save({access, refresh}: JWT) {
		localStorage.setItem('access', access);
		localStorage.setItem('refresh', refresh);
		const payload = jwt.decode();
		const user_id = payload?.user_id;
		if (user_id) {
			sessionStorage.setItem('user_id', user_id.toString());
		}
	}

	remove() {
		if (localStorage.getItem('access')) {
			localStorage.removeItem('access');
		}
		if (localStorage.getItem('refresh')) {
			localStorage.removeItem('refresh');
		}
		if (sessionStorage.getItem('user_id')) {
			sessionStorage.removeItem('user_id');
		}
	}

	getAccessToken() {
		return (localStorage.getItem('access'));
	}
	
	getRefreshToken() {
		return (localStorage.getItem('refresh'));
	}

	decode() : NewJwtPayload | null {
		const token: string | null = this.getAccessToken();
		if (!token) return null
		return jwtDecode(token)
	}
}

const jwt = new Jwt();

export default jwt;