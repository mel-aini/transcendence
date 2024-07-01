import { useEffect, useState } from "react"
import EditProfile from "./userActions/EditProfile";
import FriendActions from "./userActions/FriendActions";
import AddFriend from "./userActions/AddFriend";
import SendingInvitation from "./userActions/SendingInvitation";
import PendingInvitation from "./userActions/PendingInvitation";
import Blocked from "./userActions/Blocked";
import { Actions, useProfileContext } from "../../contexts/profileStore";

const UserActions = ({isProfile}: {isProfile: boolean}) => {
	// const userData = useContext(profileContext);
	// const { lastJsonMessage } = useGlobalWebSocketContext();
	// const [action, setAction] = useState<Actions | null>(null);
	const { state, dispatchProfile } = useProfileContext();

	// const setValue = (relation: string) => {
	// 	if (relation == "add")
	// 		return "send_req";
	// 	if (relation == "accept")
	// 		return "friend";
	// 	if (relation == "deny" || relation == "unblock" || relation == "unfriend" || relation == "cancel")
	// 		return "none";
	// 	if (relation == "block")
	// 		return "blocker";
	// }

	const setActions = (relation: string | undefined) => {
		if (!relation)
			dispatchProfile({type: "FRIEND_ACTION", friendAction: Actions.AddFriend})
		else if (relation == 'none')
			dispatchProfile({type: "FRIEND_ACTION", friendAction: Actions.AddFriend})
		else if (relation == 'friend')
			dispatchProfile({type: "FRIEND_ACTION", friendAction: Actions.Friend})
		else if (relation == 'send_req')
			dispatchProfile({type: "FRIEND_ACTION", friendAction: Actions.SendingInvitation})
		else if (relation == 'rec_req')
			dispatchProfile({type: "FRIEND_ACTION", friendAction: Actions.PendingInvitation})
		else if (relation == 'blocker')
			dispatchProfile({type: "FRIEND_ACTION", friendAction: Actions.Blocked})
	}

	// useEffect(() => {
	// 	if (lastJsonMessage && lastJsonMessage.type === "user-action" && lastJsonMessage.code === 200 && lastJsonMessage.identifier === state.userData.username)
	// 	{
	// 		const value = setValue(lastJsonMessage.data.value);
			
	// 		dispatchProfile({type: "USER_DATA", userData: {...state.userData, relation: value}});
	// 		setActions(value);
	// 	}
	// 	console.log("2", lastJsonMessage);
	// }, [lastJsonMessage])

	
	useEffect(() => {
		if (isProfile) {
			dispatchProfile({ type: "FRIEND_ACTION", friendAction: Actions.EditProfile });
		}
		else
			setActions(state.userData?.relation);
	}, [])

	return (
		<>
			{state.friendAction == null && <h1>loading...</h1>}
			{state.friendAction == Actions.EditProfile && <EditProfile />}
			{state.friendAction == Actions.Friend && <FriendActions />}
			{state.friendAction == Actions.AddFriend && <AddFriend />}
			{state.friendAction == Actions.SendingInvitation && <SendingInvitation />}
			{state.friendAction == Actions.PendingInvitation && <PendingInvitation />}
			{state.friendAction == Actions.Blocked && <Blocked />}
		</>
	)
}

export default UserActions;