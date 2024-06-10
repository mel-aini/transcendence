import { useEffect, useState } from "react"
import { Relation } from "../../types/profile";
import EditProfile from "./userActions/EditProfile";
import FriendActions from "./userActions/FriendActions";
import AddFriend from "./userActions/AddFriend";

enum Actions {
	EditProfile,
	AddFriend,
	Friend,
	SendingInvitation,
	PendingInvitation,
	Blocked
}

const UserActions = ({isProfile, relation}: {isProfile: boolean, relation: Relation | undefined}) => {

	const [action, setAction] = useState<Actions | null>(null);
	
	useEffect(() => {
		if (isProfile) {
			setAction(Actions.EditProfile);
		}
		else if (!relation) {
			setAction(Actions.AddFriend)
		}
		else if (relation == 'none') {
			setAction(Actions.AddFriend)
		}
		else if (relation == 'friend') {
			setAction(Actions.Friend)
		}
		else if (relation == 'send_req') {
			setAction(Actions.SendingInvitation)
		}
		else if (relation == 'rec_req') {
			setAction(Actions.PendingInvitation)
		}
		else if (relation == 'blocker') {
			setAction(Actions.Blocked)
		}

	}, [])

	return (
		<>
			{action == null && <h1>loading...</h1>}
			{action == Actions.EditProfile && <EditProfile />}
			{action == Actions.Friend && <FriendActions />}
			{action == Actions.AddFriend && <AddFriend />}
			{action == Actions.SendingInvitation && <h1>Pending...</h1>}
			{action == Actions.PendingInvitation && <h1>accept/reject</h1>}
			{action == Actions.Blocked && <h1>Blocked</h1>}
		</>
	)
}

export default UserActions;