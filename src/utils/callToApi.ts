import { BACKEND_END_POINT } from "./global";

type THeaders = HeadersInit | undefined;

const callToApi = async (endPoint: string, data?: Object) => {
	const method = data ? 'POST' : 'GET';
	const headers: THeaders = data ? {
		"Content-Type": "application/json",
	} : undefined;

	const response: Response = await fetch(BACKEND_END_POINT + endPoint, {
		method: method,
		headers: headers,
		body: data ? JSON.stringify(data) : null
	})

	const body = await response.json();

	if (response.status >= 500) throw new Error('500 Internal server error');
	if (response.status >= 400) throw body
	return body
}

export default callToApi;