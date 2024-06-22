export let profileSocket: WebSocket | null = null;

export function initProfileWebSocket() {
	if (profileSocket != null)
		return ;
	const url = 'ws://localhost:8000/ws/profile/?token=' + localStorage.getItem('access');
	profileSocket = new WebSocket(url);
	// return profileSocket;
}

export function closeProfileWebSocket() {
	if (profileSocket != null)
		profileSocket?.close();
}

// export function getProfileWebSocket() {
// 	return profileSocket;
// }