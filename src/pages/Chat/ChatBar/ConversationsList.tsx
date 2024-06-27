import ConversationBar from "./ConversationBar";
import { useChatContext } from "../../../contexts/chatProvider";
import { useEffect } from "react";

interface Props {
	className?: string
}

function ConversationsList({className, ...props}: Props) {
	const {state, dispatch} = useChatContext();
	
	const handler = (conversation: Object & {id: string}) => {
		dispatch({type: 'FOCUS', state: true})
		dispatch({type: 'CONVERSATION', conversation_id: conversation.id})
	}

	useEffect(() => {
		dispatch({type: 'CONVERSATION', conversation_id: null})
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