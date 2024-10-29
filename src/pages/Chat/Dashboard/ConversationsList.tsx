import ConversationBar from "./ConversationBar";
import { Conversation, useChatContext } from "../../../contexts/chatProvider";
import { useEffect } from "react";

interface Props {
	className?: string
}

function ConversationsList({className, ...props}: Props) {
	const {state, dispatch} = useChatContext();

	const handler = (conversation: Conversation) => {
		dispatch({type: 'FOCUS', state: true})
		dispatch({type: 'CONVERSATION', conversation: {
			id: conversation.id,
			state: 'loading'
		}});
		dispatch({type: 'CONVERSATION_HEADER', conversation_header: {
			username: conversation.friend.username,
			avatar: conversation.friend.avatar,
			id: conversation.friend.id
		}})
	}

	useEffect(() => {
		dispatch({type: 'CONVERSATION', conversation: {
			id: null,
			state: null
		}})
	}, [])

	return ( 
		<div className="flex flex-col gap-[20px]" {...props}>
			{
				state.conversations.length != 0 && state.conversations.map((conv, index) => {
					return <ConversationBar onClick={() => handler(conv)} key={index} data={conv} />
				})
			}
			{
				state.conversations.length == 0 && 
				<div className="w-full flex flex-col items-center mt-5 font-light text-sm">
					You have no conversations
				</div>
			}
		</div>
	);
}

export default ConversationsList;