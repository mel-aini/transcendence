import { useContext, useState } from "react"
import add_icon from "/add_icon.svg"
import { ProfileRequest } from "../../../types/profile";
import { WS_URL } from "../../../contexts/store";
import useWebSocket from "react-use-websocket";
import { profileContext } from "../Index";
import { useGlobalWebSocketContext } from "../../../contexts/globalWebSokcketStore";
import { useProfileContext } from "../../../contexts/profileStore";

const AddFriend = ({username}: {username: string}) => {

	const { sendJsonMessage } = useGlobalWebSocketContext();
	// const userData = useContext(profileContext);
	const { state, dispatchProfile } = useProfileContext();

	const clickHandler = () => {
		dispatchProfile({type: "USER_DATA", userData: {...state.userData, relation: undefined}});
		const request: ProfileRequest = {
			type: "add",
			identifier: username,
			data: {}
		};
		sendJsonMessage(request);
	}

	return (
		<div onClick={clickHandler} className="shrink-0 w-[140px] h-[40px] flex justify-center items-center bg-secondary rounded-md gap-2">
			<span>add friend</span>
			<img src={add_icon} alt="" width={20} height={20}/>
		</div>
	)
}

export default AddFriend;