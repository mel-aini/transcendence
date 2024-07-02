import { useEffect, useState } from "react"
import EditProfile from "./userActions/EditProfile";
import FriendActions from "./userActions/FriendActions";
import AddFriend from "./userActions/AddFriend";
import SendingInvitation from "./userActions/SendingInvitation";
import PendingInvitation from "./userActions/PendingInvitation";
import Blocked from "./userActions/Blocked";
import { Actions, useProfileContext } from "../../contexts/profileStore";
import { useGlobalWebSocketContext } from "../../contexts/globalWebSokcketStore";
import WaitingAction from "./userActions/WaitingAction";

const UserActions = ({isProfile}: {isProfile: boolean}) => {
	// const userData = useContext(profileContext);
	// const { lastJsonMessage } = useGlobalWebSocketContext();
	const [action, setAction] = useState<Actions | null>(null);
	const { state, dispatchProfile } = useProfileContext();
	const { GlobalState } = useGlobalWebSocketContext();

	const setActions = (relation: string | undefined) => {
		if (!relation)
			setAction(null);
		else if (relation == 'none')
			setAction(Actions.AddFriend);
		else if (relation == 'friend')
			setAction(Actions.Friend);
		else if (relation == 'send_req')
			setAction(Actions.SendingInvitation);
		else if (relation == 'rec_req')
			setAction(Actions.PendingInvitation);
		else if (relation == 'blocker')
			setAction(Actions.Blocked);
	}

	useEffect(() => {
		if (isProfile) {
			setAction(Actions.EditProfile);
		}
		else
			setActions(state.userData?.relation);
	}, [state.userData?.relation])

	return (
		<>
			{action == null && <WaitingAction />}
			{action == Actions.EditProfile && <EditProfile />}
			{action == Actions.Friend && <FriendActions username={state.userData.username} />}
			{action == Actions.AddFriend && <AddFriend username={state.userData.username}  />}
			{action == Actions.SendingInvitation && <SendingInvitation username={state.userData.username}  />}
			{action == Actions.PendingInvitation && <PendingInvitation username={state.userData.username}  />}
			{action == Actions.Blocked && <Blocked username={state.userData.username}  />}
		</>
	)
}

export default UserActions;