import { useChatContext } from "../contexts/chatProvider";
import useIsOnline from "./useIsOnline";

function useGetConversation() {
	const { dispatch } = useChatContext();
	const isOnline = useIsOnline();

	const requestMessages = (username: string, avatar: string, conversation_id: string | number) => {
		dispatch({type: 'FOCUS', state: true})
		dispatch({type: 'CONVERSATION', conversation_id});
		dispatch({type: 'CONVERSATION_HEADER', conversation_header: {
			username: username,
			avatar: avatar,
			isOnline: isOnline(username)
		}})
	}

	return requestMessages;
}

export default useGetConversation;