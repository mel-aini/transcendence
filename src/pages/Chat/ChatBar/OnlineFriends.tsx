import { UIEvent } from "react";
import User from "../../../components/User";
import { useChatContext } from "../../../contexts/chatProvider";
import useIsOnline from "../../../hooks/useIsOnline";

function OnlineFriends() {
	const { state, dispatch } = useChatContext()
	const isOnline = useIsOnline();

	const clickHandler = (friend: Object & { username: string, avatar_link: string, conversation_id: string | number }) => {
		dispatch({type: 'FOCUS', state: true})
		dispatch({type: 'CONVERSATION', conversation: {
			id: friend.conversation_id,
			state: 'loading'
		}});
		dispatch({type: 'CONVERSATION_HEADER', conversation_header: {
			username: friend.username,
			avatar: friend.avatar_link,
			isOnline: isOnline(friend.username)
		}})
	}

	return ( 
		<div className="scroll-to-hide online-friends w-full h-[40px] items-center gap-3 flex overflow-x-auto">
			{
				state.onlineFriends.length == 0 && <p>no online friend</p>
			}
			{
				state.onlineFriends.length > 0 &&
				state.onlineFriends.map((friend, index) => {
					friend.avatar_link = "https://picsum.photos/200/30" + index + 1;
					return <User onClick={() => clickHandler(friend)} key={index} online className="h-[40px] border min-w-[40px] cursor-pointer" width={40} url={friend.avatar_link} />
				})
			}
		</div>
	);
}

export default OnlineFriends;