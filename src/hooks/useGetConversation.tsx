import { useChatContext } from "../contexts/chatProvider";

function useGetConversation() {
	const { dispatch } = useChatContext();

	const requestMessages = (username: string, avatar: string, conversation_id: string | number) => {
		dispatch({type: 'FOCUS', state: true})
		dispatch({type: 'CONVERSATION', conversation_id});
		dispatch({type: 'CONVERSATION_HEADER', conversation_header: {
			username: username,
			avatar: avatar
		}})
	}

	return requestMessages;
}

export default useGetConversation;