import { useContext } from "react";
import { ProfileRequest } from "../../../types/profile"
import { profileContext } from "../Index";
import { useGlobalWebSocketContext } from "../../../contexts/globalWebSokcketStore";
import { useProfileContext } from "../../../contexts/profileStore";

const PendingInvitation = () => {
	const { sendJsonMessage } = useGlobalWebSocketContext();
	// const userData = useContext(profileContext);
	const { state, dispatchProfile } = useProfileContext();

	const clickHandler = (type: "accept" | "deny") => {
		const request: ProfileRequest = {
			type: type,
			identifier: state.userData.username,
			data: {}
		};
		sendJsonMessage(request);
	}

	return (
		<div>
			<h1 onClick={() => clickHandler("accept")}>accept</h1>
			<h1 onClick={() => clickHandler("deny")}>reject</h1>
		</div>
	)
}

export default PendingInvitation;