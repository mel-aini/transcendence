// import { useEffect } from "react";
// import { initWebSocket } from "../utils/socket";
// import { useChatContext } from "../contexts/chatStore";

// const url = 'ws://localhost:9000/ws/chat/?token=' + localStorage.getItem('access');

// function useWebSocket() {
// 	const { state, dispatch } = useChatContext();

// 	useEffect(() => {
// 		if (!state.ws) {
// 			const socket = new WebSocket(url);
// 			console.log(socket)
// 			if (socket) {
	
// 				socket.onopen = () => {
// 					console.log('connected')
// 				}
	
// 				socket.onmessage = (event) => {
// 					const res = JSON.parse(event.data);
// 					// dispatch({type: 'ONLINE', onlineFriends: res.online})
// 					// dispatch({type: 'CONVERSATIONS', onlineFriends: res.conversations})
// 					console.log(res.online)
// 					console.log(res.conversations)
// 				}
// 				dispatch({type: 'SOCKET', socket: socket})
// 			}
// 		}
	
// 	}, [state.ws])

// 	return ( null );
// }

// export default useWebSocket;