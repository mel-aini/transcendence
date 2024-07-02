import { FriendsData } from "../../types/profile"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import FriendActions from "./userActions/FriendActions"
import AddFriend from "./userActions/AddFriend"
import PendingInvitation from "./userActions/PendingInvitation"
import Blocked from "./userActions/Blocked"
import SendingInvitation from "./userActions/SendingInvitation"
import WaitingAction from "./userActions/WaitingAction"

const Action = ({username, relation}: {username: string, relation: string}) => {
	const [action, setAction] = useState<string>(relation);

	// const clickHandler = (type: "accept" | "deny" | "unblock" |  "unfriend" | "block") => {

	// 		dispatchProfile({type: "USER_DATA", userData: {...state.userData, relation: undefined}});
	// 		const request: ProfileRequest = {
	// 			type: type,
	// 			identifier: username,
	// 			data: {}
	// 		};
	// 		sendJsonMessage(request);
	// 	}
		// 'none' | 'friend' | 'send_req' | 'rec_req' | 'blocker'

	useEffect(() => {
		
	}, []);
	return (
		<>
		{
			action == null && 
			<WaitingAction />
		}
		{
			(action === "friend") && 
			<FriendActions username={username}/>
		}
		{
			(action === "rec_inv") && //rec_req
			<PendingInvitation username={username}/>
		}
		{
			(action === "blocked") && //blocker
			<Blocked username={username} />
		}
		{
			(action === "add") && //none
			<AddFriend username={username} />
		}
		{
			(action === "send_req") &&
			<SendingInvitation username={username} />
		}
		</>
	)
}

const FriendBar = ({friend, relation}: {friend: FriendsData, relation: string}) => {
	const navigate = useNavigate();

	const userClick = (path:string) => {
		navigate(path);
	}

	return (
		<div className="flex justify-between items-center w-full gap-3 h-[70px] rounded-md border border-border bg-gray3 px-5">
			<div onClick={() => userClick(friend.profile)} className="flex items-center gap-4 cursor-pointer shrink overflow-hidden whitespace-nowrap">
					<img src={friend.profile_image} alt={"icon"} width={38} height={38} className="rounded-full overflow-hidden shrink-0"/>
					<span className="shrink overflow-hidden text-ellipsis">{friend.username}</span>
			</div>
			<Action username={friend.username} relation={relation} />
		</div>
	)
}

export default FriendBar;