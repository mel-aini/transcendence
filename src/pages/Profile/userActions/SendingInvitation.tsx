import { useContext } from "react";
import { useGlobalWebSocketContext } from "../../../contexts/globalWebSokcketStore";
import { profileContext } from "../Index";
import { ProfileRequest } from "../../../types/profile";
import { useProfileContext } from "../../../contexts/profileStore";

const SendingInvitation = () => {
	const { sendJsonMessage } = useGlobalWebSocketContext();
	// const userData = useContext(profileContext);
	const { state } = useProfileContext();

	function clickHandler() {
		const request: ProfileRequest = {
			type: "cancel",
			identifier: state.userData.username,
			data: {}
		};
		sendJsonMessage(request);
	}
	return (
		<>
			<h1 onClick={clickHandler}>Sending...</h1>
		</>
	)
}

export default SendingInvitation;