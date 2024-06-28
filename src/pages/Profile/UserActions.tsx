import { useEffect, useState } from "react"
import { ProfileRequest, UserData } from "../../types/profile";
import EditProfile from "./userActions/EditProfile";
import FriendActions from "./userActions/FriendActions";
import AddFriend from "./userActions/AddFriend";
import { profileSocket } from "../../utils/profileSocket";
import SendingInvitation from "./userActions/SendingInvitation";
import PendingInvitation from "./userActions/PendingInvitation";
import Blocked from "./userActions/Blocked";
import useWebSocket from "react-use-websocket";
import { useProfileContext } from "../../contexts/profileStore";

enum Actions {
	EditProfile,
	AddFriend,
	Friend,
	SendingInvitation,
	PendingInvitation,
	Blocked
}

const UserActions = ({isProfile, data}: {isProfile: boolean, data: UserData}) => {
	const WS_URL = "ws://127.0.0.1:8080";
	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL,
		{
			share: false,
			shouldReconnect: () => true,
		},
	);
	const [action, setAction] = useState<Actions | null>(null);
	let request: ProfileRequest;
	
	useEffect(() => {
		if (isProfile) {
			setAction(Actions.EditProfile);
		}
		else if (!data.relation) {
			setAction(Actions.AddFriend)
			request  = {
				type: "add",
				other_user: data.username
			};
		}
		else if (data.relation == 'none') {
			setAction(Actions.AddFriend)
			request  = {
				type: "add",
				other_user: data.username
			};
		}
		else if (data.relation == 'friend') {
			setAction(Actions.Friend)
		}
		else if (data.relation == 'send_req') {
			setAction(Actions.SendingInvitation)
			request  = {
				type: "cancel",
				other_user: data.username
			};
		}
		else if (data.relation == 'rec_req') {
			setAction(Actions.PendingInvitation)
		}
		else if (data.relation == 'blocker') {
			setAction(Actions.Blocked)
			request  = {
				type: "unblock",
				other_user: data.username
			};
		}

	}, [])

	return (
		<>
			{action == null && <h1>loading...</h1>}
			{action == Actions.EditProfile && <EditProfile />}
			{action == Actions.Friend && <FriendActions username={data.username}/>}
			{action == Actions.AddFriend && <AddFriend clickHandler={() => profileSocket?.send(JSON.stringify(request))}/>}
			{action == Actions.SendingInvitation && <SendingInvitation clickHandler={() => profileSocket?.send(JSON.stringify(request))}/>}
			{action == Actions.PendingInvitation && <PendingInvitation username={data.username}/>}
			{action == Actions.Blocked && <Blocked clickHandler={() => profileSocket?.send(JSON.stringify(request))}/>}
		</>
	)
}

export default UserActions;