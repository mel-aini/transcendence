import { CHAT_OPTS, useChatContext } from "@/contexts/chatProvider";

function useGetConversation() {
	const { dispatch } = useChatContext();

	const requestMessages = (username: string, avatar: string, conversation_id: string | number) => {
		dispatch({type: CHAT_OPTS.FOCUS, state: true})
		dispatch({type: CHAT_OPTS.CONVERSATION, conversation_id});
		dispatch({type: CHAT_OPTS.CONVERSATION_HEADER, conversation_header: {
			username: username,
			avatar: avatar
		}})
	}

	return requestMessages;
}

export default useGetConversation;