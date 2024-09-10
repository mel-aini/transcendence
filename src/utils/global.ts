export const BACKEND_END_POINT: string = 'http://localhost:8000/';
export const OAUTH_URL: string = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-8c149b86f1565aeacace008f2612305bdaa671a5f2fd61821c4200d8b080ec6d&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fsignup&response_type=code"
export const CHAT_WS_ENDPOINT: string = 'ws://localhost:8000/ws/chat/?token='

export const getDate = () => {
	const date = new Date();

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0')

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

class MessageDate {

	constructor() {}

	getDate() {
		const date = new Date();
	
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0')
	
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}
	
	getDay(inDate: string) {
		const parts = inDate.split(' ');

		const date = new Date();
	
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
	
		if (parts[0] == `${year}-${month}-${day}`) {
			return 'today'
		}
		return parts[0];
	}
}

export const dateMeta = new MessageDate();
 