import { Fragment, useEffect, useRef, useState } from "react";
import { useChatContext } from "../../../contexts/chatProvider";
import Message from "./Message";
import { IoIosArrowDown } from "react-icons/io";
import { useAuthContext } from "../../../contexts/authProvider";
import Observer from "./Observer";

function ConversationMessages() {
	const { state } = useChatContext();
	const { state: authState } = useAuthContext();

	const scrollToBottom = (elem: Element) => {
		console.log('dkhat bach nscrolli');
		console.log('scrollit', elem.scrollHeight);
		console.log('scrollHeight', elem.scrollHeight)
		elem.scrollTo(0, elem.scrollHeight)
	}

	useEffect(() => {
		if (state.conversation.state == 'ok') {
			const parent = document.querySelector('.messages-container');
			if (parent) {
				scrollToBottom(parent)
			}
		}
	}, [state.conversation.state])

	return ( 
		<div className="flex flex-col gap-8">
			{
				state.conversation.state == 'ok' &&
				<>
					<Observer />
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
								className="animate-msg"
								>
									{state.lastMessage.content}
							</Message>
					}
				</>
			}
			{
				state.conversation.state == 'loading' && <h1>loading messages...</h1>
			}
		</div>
	);
}

export default ConversationMessages;