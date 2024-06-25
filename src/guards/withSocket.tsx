
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useChatContext } from "../contexts/chatStore";
import { Fragment, useEffect } from "react";

const WS_URL = 'ws://localhost:8000/ws/chat/?token=' + localStorage.getItem('access');

function WithSocket({children}: {children: any}) {
	const { dispatch } = useChatContext();
	
	const { lastJsonMessage, readyState } = useWebSocket(
		WS_URL,
		{
		  share: false,
		  shouldReconnect: () => true,
		},
	  )

	// Run when the connection state (readyState) changes
	useEffect(() => {
		console.log("Connection state changed")
		console.log(readyState);
	}, [readyState])
	
	// Run when a new WebSocket message is received (lastJsonMessage)
	useEffect(() => {
		if (lastJsonMessage) {
			console.log(`Got a new message:`);
			console.log(lastJsonMessage.conversations)
			dispatch({type: 'ONLINE', onlineFriends: lastJsonMessage.online})
			// dispatch({type: 'CONVERSATIONS', conversations: lastJsonMessage.conversations})
		}
	}, [lastJsonMessage])

	return ( <Fragment>{children}</Fragment> );
}

export default WithSocket;