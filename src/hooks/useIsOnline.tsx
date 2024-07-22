import { useEffect } from "react";
import { useChatContext } from "../contexts/chatProvider";

type Username = string

function useIsOnline() {
	const { state } = useChatContext();

	const isOnline = (user: Username) => {
		return state.onlineFriends.some((friend) => {
			return friend.username = user
		})
	}

	useEffect(() => {

	}, [state.onlineFriends])

	return isOnline
}

export default useIsOnline;