import { UIEvent } from "react";
import User from "../../../components/User";
import { useChatContext } from "../../../contexts/chatProvider";

function OnlineFriends() {
	const {state, dispatch} = useChatContext()

	const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
			const elem = e.target as HTMLElement
			if (elem) {
				const reachedLimit: boolean = elem.scrollWidth - elem.scrollLeft == elem.clientWidth
				if (reachedLimit) {
					// socket.emit('chat', {
					// 	type: 'online'
					// })
				}
			}
	}
	const clickHandler = (friend: Object & { conversation_id: string | number }) => {
		dispatch({type: 'CONVERSATION', conversation_id: friend.conversation_id})
	}
	return ( 
		<div onScroll={scrollHandler} className="scroll-to-hide online-friends w-full h-[40px] bg-bg items-center gap-3 flex overflow-x-auto">
			{
				state.onlineFriends.length == 0 && <p>no online friend</p>
			}
			{
				state.onlineFriends.length > 0 &&
				state.onlineFriends.map((friend, index) => {
					return <User onClick={() => clickHandler(friend)} key={index} online className="h-[40px] border min-w-[40px] cursor-pointer" width={40} url={friend.avatar_link} />
				})
			}
		</div>
	);
}

export default OnlineFriends;