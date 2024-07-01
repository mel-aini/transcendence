import { useContext, useState } from "react"
import add_icon from "/add_icon.svg"
import { ProfileRequest } from "../../../types/profile";
import { WS_URL } from "../../../contexts/store";
import useWebSocket from "react-use-websocket";
import { profileContext } from "../Index";
import { useGlobalWebSocketContext } from "../../../contexts/globalWebSokcketStore";
import { useProfileContext } from "../../../contexts/profileStore";

const AddFriend = () => {

	const { sendJsonMessage } = useGlobalWebSocketContext();
	// const userData = useContext(profileContext);
	const { state } = useProfileContext();

	const clickHandler = () => {
		const request: ProfileRequest = {
			type: "add",
			identifier: state.userData.username,
			data: {}
		};
		sendJsonMessage(request);
	}

	return (
		<div onClick={clickHandler} className="w-[142px] h-[40px] flex justify-center items-center bg-secondary rounded-md gap-2">
			<span>add friend</span>
			<img src={add_icon} alt="" width={20} height={20}/>
		</div>
	)
}

export default AddFriend;