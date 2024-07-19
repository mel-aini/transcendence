import { useEffect, useRef, useState } from "react";
import { useChatContext } from "../../../contexts/chatProvider";
import Message from "./Message";
import { IoIosArrowDown } from "react-icons/io";
import { useAuthContext } from "../../../contexts/authProvider";

function ConversationMessages() {
	const { state, sendJsonMessage } = useChatContext();
	const { state: authState } = useAuthContext();
	const container = useRef<HTMLDivElement>(null);
	const [isScrollTop, setIsScrollTop] = useState(false);

	const scrollToBottom = () => {
		if (!container.current) return;
		container.current.scrollTo(0, container.current.scrollHeight)
		setIsScrollTop(false)
	}

	useEffect(() => {
		scrollToBottom();
	}, [state.messages, state.lastMessage])

	const handleScroll = () => {
		if (!container.current) return;
		if (container.current.scrollTop == 0) {
			console.log('should fetch');
			sendJsonMessage({
				type: 'messages',
				limit: 10,
				conversation_id: state.conversation_id,
				message_id: state.messages[0].id
			})
		}
	}

	console.log('username:', authState.username);

	return ( 
		<div
			onScroll={handleScroll}
			onWheel={(e) => setIsScrollTop(e.deltaY < 0)}
			ref={container} className="messages-container grow bg-secondary overflow-auto p-5 flex flex-col gap-8">
			{
				state.messages.map((message, index) => {
					return <Message 
						state={message.state} 
						key={index} 
						type={message.sender == authState.username ? 'sent' : 'arrive' } 
						date={message.date}
						>
							{message.content}
						</Message>
				})
			}
			{
				state.lastMessage &&
					<Message 
						state={state.lastMessage.state}
						type={state.lastMessage.sender == authState.username ? 'sent' : 'arrive' } 
						date={state.lastMessage.date}
						className=" animate-msg"
						>
							{state.lastMessage.content}
					</Message>
			}
			{isScrollTop && <div
				onClick={scrollToBottom}
				className="fixed bottom-16 right-3 size-10 rounded-full bg-bg flex justify-center items-center cursor-pointer">
				<IoIosArrowDown className="text-xl" />
			</div>}
		</div>
	);
}

export default ConversationMessages;