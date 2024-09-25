const { VITE_APP_API_END_POINT, VITE_APP_WS_END_POINT } = import.meta.env;
export const API_END_POINT = VITE_APP_API_END_POINT
export const WS_END_POINT = VITE_APP_WS_END_POINT
export const OAUTH_URL: string = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-8c149b86f1565aeacace008f2612305bdaa671a5f2fd61821c4200d8b080ec6d&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fsignup&response_type=code"

class Urls {
	constructor() {}

	Api(uri: string) {
		return API_END_POINT + uri + "/";
	}

	Ws(uri: string) {
		return WS_END_POINT + uri + "/";
	}
}

const urls = new Urls();

export default urls;