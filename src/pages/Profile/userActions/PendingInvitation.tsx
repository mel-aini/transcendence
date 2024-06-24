import { ProfileRequest } from "../../../types/profile"
import { profileSocket } from "../../../utils/profileSocket";

const PendingInvitation = (username: string) => {

	const clickHandler = (status: boolean) => {
		const request: ProfileRequest = {
			type: "accept",
			other_user: username,
			status: status
		};
		profileSocket?.send(JSON.stringify(request));
	}

	return (
		<div>
			<h1 onClick={() => clickHandler(true)}>accept</h1>
			<h1 onClick={() => clickHandler(false)}>reject</h1>
		</div>
	)
}

export default PendingInvitation;