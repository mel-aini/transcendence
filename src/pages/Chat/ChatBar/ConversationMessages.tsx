import { useEffect, useRef } from "react";
import { useChatContext } from "../../../contexts/chatProvider";
import Message from "./Message";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { CHAT_WS_ENDPOINT } from "../../../utils/global";
import { useGlobalContext } from "../../../contexts/store";

const ME = 'user2'; 

function ConversationMessages() {
	const { state: gstate } = useGlobalContext();
	const { state, dispatch } = useChatContext();
	const container = useRef<HTMLDivElement>(null);
	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
		CHAT_WS_ENDPOINT + gstate.access,
		{
		  share: false,
		  shouldReconnect: () => true,
		},
	  )

	useEffect(() => {
		if (!container.current) return;
			container.current.scrollTo(0, container.current.scrollHeight)
	}, [state.messages])

	useEffect(() => {
		if (readyState == ReadyState.OPEN && state.conversation_id) {
			sendJsonMessage({
				type: 'messages',
				conversation_id: state.conversation_id,
			})
		}
	}, [state.conversation_id])

	useEffect(() => {
		if (lastJsonMessage && lastJsonMessage.messages) {
			console.log(lastJsonMessage.messages)
			dispatch({type: 'MESSAGES', messages: lastJsonMessage.messages})
		}
	}, [lastJsonMessage])

	return ( 
		<div ref={container} className="messages-container grow bg-bg overflow-auto p-5 flex flex-col gap-8">
			{
				state.messages.map((message, index) => {
					return <Message key={index} type={message.sender == ME ? 'sent' :"arrive"} date={message.date} className=" animate-msg">{message.content}</Message>
				})
			}
		</div>
	);
}

export default ConversationMessages;