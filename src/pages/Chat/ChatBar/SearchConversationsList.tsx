import { ComponentProps, useEffect } from "react";
import { Conversation, useChatContext } from "../../../contexts/chatProvider";
import ConversationBar from "./ConversationBar";
import useIsOnline from "../../../hooks/useIsOnline";

interface Props extends ComponentProps<'div'> {
	input: string
}

function SearchConversationsList({input, ...props}: Props) {
	const { state, dispatch } = useChatContext();
	const isOnline = useIsOnline();
	
	const handler = (conversation: Conversation) => {
		dispatch({type: 'FOCUS', state: true})
		dispatch({type: 'CONVERSATION', conversation: {
			id: conversation.id,
			state: 'loading'
		}});
		dispatch({type: 'CONVERSATION_HEADER', conversation_header: {
			username: conversation.friend.username,
			avatar: conversation.friend.avatar,
			isOnline: isOnline(conversation.friend.username)
		}})
	}

	useEffect(() => {
		console.log('state.searchConversations')
		console.log(state.searchConversations)
	}, [state.searchConversations])

	return ( 
		<div {...props}>
			<h1>result for search "{input}"</h1>
			<div>
				{
					state.searchConversations.map((conv, index) => {
						return (
							<ConversationBar onClick={() => handler(conv)} key={index} data={conv} />
						)
					})
				}
			</div>
		</div>
	);
}

export default SearchConversationsList;