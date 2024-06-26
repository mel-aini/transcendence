import { useEffect, useRef } from "react";
import { useChatContext } from "../../../contexts/chatStore";
import Message from "./Message";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WS_URL } from "../../../guards/withSocket";

const ME = 'mel-aini'; 

function ConversationMessages() {
	const { state } = useChatContext();
	const container = useRef<HTMLDivElement>(null);
	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
		WS_URL,
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
		console.log(lastJsonMessage);
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