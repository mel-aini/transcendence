import { Fragment, ReactNode, useEffect } from "react";
import { useChatContext } from "../contexts/chatProvider"
import { ReadyState } from "react-use-websocket";

function ChatLogic({children}: {children: ReactNode}) {
	const {state, dispatch, sendJsonMessage, lastJsonMessage, readyState} = useChatContext();

	useEffect(() => {
		if (readyState == ReadyState.OPEN) {
			console.log('connection opened')
		}
		if (readyState == ReadyState.CLOSED) {
			console.log('connection closed')
		}
	}, [readyState])
	
	useEffect(() => {
		console.log('new message', lastJsonMessage)
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

	useEffect(() => {
		console.log('making new call to the web socket')
		if (readyState == ReadyState.OPEN && state.conversation_id) {
			sendJsonMessage({
				type: 'messages',
				conversation_id: state.conversation_id,
			})
		}
	}, [state.conversation_id])

	return (
		<Fragment>{children}</Fragment>
	)
}

export default ChatLogic;