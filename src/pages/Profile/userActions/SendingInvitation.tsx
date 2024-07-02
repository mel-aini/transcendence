import { useContext } from "react";
import { useGlobalWebSocketContext } from "../../../contexts/globalWebSokcketStore";
import { profileContext } from "../Index";
import { ProfileRequest } from "../../../types/profile";
import { useProfileContext } from "../../../contexts/profileStore";
import deny from "/deny.svg"

const SendingInvitation = ({username}: {username: string}) => {
	const { sendJsonMessage } = useGlobalWebSocketContext();
	// const userData = useContext(profileContext);
	const { state, dispatchProfile } = useProfileContext();

	function clickHandler() {
		dispatchProfile({type: "USER_DATA", userData: {...state.userData, relation: undefined}});
		const request: ProfileRequest = {
			type: "cancel",
			identifier: username,
			data: {}
		};
		sendJsonMessage(request);
	}
	return (
		<div className="shrink-0 w-[140px] h-[40px] flex justify-between items-center">
			<div className="h-full w-[90px] bg-secondary rounded-md select-none flex justify-center items-center">
				pending...
			</div>
			<div onClick={clickHandler} className="h-full w-[40px] bg-secondary rounded-md cursor-pointer select-none flex justify-center items-center">
				<img src={deny} alt="" width={20} height={20}/>
			</div>
		</div>
	)
}

export default SendingInvitation;