let socket: WebSocket | null = null;

export function initWebSocket() {
	const url = 'ws://localhost:8000/ws/chat/?token=' + localStorage.getItem('access');
	socket = new WebSocket(url);
	return socket;
}

export function getWebSocket() {
	return socket
}