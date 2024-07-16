import { useEffect, useRef } from "react";
import { useChatContext } from "../../../contexts/chatProvider";
import Message from "./Message";
import { ReadyState } from "react-use-websocket";

const ME = 'user1'; 

function ConversationMessages() {
	const { state, dispatch } = useChatContext();
	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!container.current) return;
			container.current.scrollTo(0, container.current.scrollHeight)
	}, [state.messages])

	return ( 
		<div ref={container} className="messages-container grow bg-secondary overflow-auto p-5 flex flex-col gap-8">
			{
				state.messages.map((message, index) => {
					return <Message key={index} type={message.sender == ME ? 'sent' :"arrive"} date={message.date} className=" animate-msg">{message.content}</Message>
				})
			}
		</div>
	);
}

export default ConversationMessages;