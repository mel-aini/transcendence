import useWebSocket from "react-use-websocket";
import { WS_URL } from "../../../contexts/store";
import { profileContext } from "../Index";
import { useContext } from "react";
import { ProfileRequest } from "../../../types/profile";
import { useGlobalWebSocketContext } from "../../../contexts/globalWebSokcketStore";
import { useProfileContext } from "../../../contexts/profileStore";

const Blocked = () => {

	const {sendJsonMessage} = useGlobalWebSocketContext();
	// const userData = useContext(profileContext);
	const { state } = useProfileContext();

	const clickHandler = () => {
		const request: ProfileRequest = {
			type: "unblock",
			identifier: state.userData.username,
			data: {}
		};
		sendJsonMessage(request);
	}
	return (
		<div onClick={clickHandler} className="flex justify-center shrink-0 w-[101px] h-[26px] rounded-[15px] border opacity-35 select-none cursor-pointer">
			unblock
		</div>
	)
}

export default Blocked;