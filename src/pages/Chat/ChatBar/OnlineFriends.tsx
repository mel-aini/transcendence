import User from "../../../components/User";
import { useChatContext } from "../../../contexts/chatProvider";

function OnlineFriends() {
	const { state, dispatch } = useChatContext()

	const clickHandler = (friend: Object & { username: string, avatar_link: string, conversation_id: string | number }) => {
		dispatch({type: 'FOCUS', state: true})
		dispatch({type: 'CONVERSATION', conversation: {
			id: friend.conversation_id,
			state: 'loading'
		}});
		dispatch({type: 'CONVERSATION_HEADER', conversation_header: {
			username: friend.username,
			avatar: friend.avatar_link
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
					return <User border onClick={() => clickHandler(friend)} key={index} online className="h-[40px] border min-w-[40px] cursor-pointer" url={friend.avatar_link} />
				})
			}
		</div>
	);
}

export default OnlineFriends;