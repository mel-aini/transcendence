import useWebSocket, { ReadyState } from "react-use-websocket";
import { useChatContext } from "../contexts/chatProvider";
import { Fragment, useEffect } from "react";
import { useGlobalContext } from "../contexts/store";
import { CHAT_WS_ENDPOINT } from "../utils/global";

// const WS_URL = 'ws://localhost:8000/ws/chat/?token=' + localStorage.getItem('access');

function WithSocket({children}: {children: any}) {
	const { state } = useGlobalContext();
	const { dispatch } = useChatContext();
	
	const { lastJsonMessage, readyState } = useWebSocket(
		CHAT_WS_ENDPOINT + state.access,
		{
		  share: false,
		  shouldReconnect: () => true,
		},
	  )

	useEffect(() => {
		if (readyState == ReadyState.OPEN) {
			console.log('connection opened')
		}
		if (readyState == ReadyState.CLOSED) {
			console.log('connection closed')
		}
	}, [readyState])
	
	useEffect(() => {
		if (lastJsonMessage) {
			// console.log(lastJsonMessage)
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