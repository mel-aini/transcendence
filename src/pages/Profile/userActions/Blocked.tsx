import useWebSocket from "react-use-websocket";
import { WS_URL } from "../../../contexts/store";
import { profileContext } from "../Index";
import { useContext } from "react";
import { ProfileRequest } from "../../../types/profile";
import { useGlobalWebSocketContext } from "../../../contexts/globalWebSokcketStore";
import { useProfileContext } from "../../../contexts/profileStore";
import unblock from "/unblock.svg"
import { modifyObjectByName } from "../UserActions";

const Blocked = ({username, origin}: {username: string, origin: string}) => {

	const {sendJsonMessage} = useGlobalWebSocketContext();
	// const userData = useContext(profileContext);
	const { state, dispatchProfile } = useProfileContext();

	const clickHandler = () => {
		if (origin === "profile") {
			const updatedArray = modifyObjectByName([...state.friendsData], username);
			if (updatedArray) {
				dispatchProfile({type: "FRIEND_DATA", friendsData: [...updatedArray]});
			}
		}
		else if (origin === "user")
			dispatchProfile({type: "USER_DATA", userData: {...state.userData, relation: undefined}});
		const request: ProfileRequest = {
			type: "unblock",
			identifier: username,
			data: {}
		};
		sendJsonMessage(request);
	}
	return (
		<div onClick={clickHandler} className="bg-secondary flex items-center justify-center shrink-0 w-[110px] h-[40px] rounded-md select-none cursor-pointer gap-2">
			<span>unblock</span>
			<img src={unblock} alt="" width={20} height={20}/>
		</div>
	)
}

export default Blocked;