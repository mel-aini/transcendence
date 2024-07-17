import { useEffect, useRef } from "react";
import { useChatContext } from "../../../contexts/chatProvider";
import Message from "./Message";
import { ReadyState } from "react-use-websocket";

const ME = 'user1'; 

function ConversationMessages() {
	const { state, dispatch, sendJsonMessage } = useChatContext();
	const firstTime = useRef(true);
	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!firstTime.current || !container.current) return;
		container.current.scrollTo(0, container.current.scrollHeight)
		if (state.messages,length != 0) {
			firstTime.current = false;
		}
	}, [state.messages])

	const handleScroll = () => {
		return () => {
			if (!container.current) return;
			if (container.current.scrollTop == 0) {
				console.log('should fetch');
				sendJsonMessage({
					type: 'messages',
					limit: 10,
					conversation_id: state.conversation_id ,
					message_id: state.messages[0].id
				})
			}
		}
	}
	return ( 
		<div
			onScroll={handleScroll()} 
			ref={container} className="messages-container grow bg-secondary overflow-auto p-5 flex flex-col gap-8">
			{
				state.messages.map((message, index) => {
					return <Message key={index} type={message.sender == ME ? 'sent' :"arrive"} date={message.date} className=" animate-msg">{message.content}</Message>
				})
			}
		</div>
	);
}

export default ConversationMessages;