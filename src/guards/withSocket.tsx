import useWebSocket from "react-use-websocket";
import { useChatContext } from "../contexts/chatStore";
import { Fragment, useEffect } from "react";

export const WS_URL = 'ws://localhost:8000/ws/chat/?token=' + localStorage.getItem('access');

function WithSocket({children}: {children: any}) {
	const { dispatch } = useChatContext();
	
	const { lastJsonMessage, readyState } = useWebSocket(
		WS_URL,
		{
		  share: false,
		  shouldReconnect: () => true,
		},
	  )

	useEffect(() => {
	}, [readyState])
	
	useEffect(() => {
		if (lastJsonMessage) {
			console.log(lastJsonMessage)
			if (lastJsonMessage.online) {
				dispatch({type: 'ONLINE', onlineFriends: lastJsonMessage.online})
			}
			if (lastJsonMessage.conversations) {
				dispatch({type: 'CONVERSATIONS', conversations: lastJsonMessage.conversations})
			}
		}
	}, [lastJsonMessage])

	return ( <Fragment>{children}</Fragment> );
}

export default WithSocket;