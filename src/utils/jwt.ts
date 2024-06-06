interface JWT {
	access: string,
	refresh: string
}

class Jwt {

	constructor() {}

	save({access, refresh}: JWT) {
		localStorage.setItem('access', access);
		localStorage.setItem('refresh', refresh);
	}

	remove() {
		if (localStorage.getItem('access')) {
			localStorage.removeItem('access');
		}
		if (localStorage.getItem('refresh')) {
			localStorage.removeItem('refresh');
		}
	}

	getAccessToken() {
		return (localStorage.getItem('access'));
	}
	
	getRefreshToken() {
		return (localStorage.getItem('refresh'));
	}
}

const jwt = new Jwt();

export default jwt;