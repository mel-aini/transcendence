import play_icon from "/play_icon.svg"
import send_icon from "/send_icon.svg"
import more_icon from "/more_icon.svg"
import block from "/block.svg"
import unfriend from "/unfriend.svg"
import deny from "/deny.svg"
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator, Transition } from '@headlessui/react'
import { FriendsData, ProfileRequest, Relation, UserData } from "../../../types/profile"
import { profileSocket } from "../../../utils/profileSocket"
import { profileContext } from "../Index"
import useWebSocket from "react-use-websocket"
import { useContext, useEffect, useState } from "react"
import { WS_URL } from "../../../contexts/store"
import { useGlobalWebSocketContext } from "../../../contexts/globalWebSokcketStore"
import { useProfileContext } from "../../../contexts/profileStore"
import { modifyObjectByName } from "../UserActions"

const FriendActions = ({username, origin}: {username: string, origin: string}) => {
	const { sendJsonMessage } = useGlobalWebSocketContext();
	// const userData = useContext(profileContext);
	const { state, dispatchProfile } = useProfileContext();
	const [seeMore, setSeeMore] = useState<boolean>(false);

	const clickHandler = (type: "unfriend" | "block" | "invite") => {
		if (origin === "profile") {
			const updatedArray = modifyObjectByName(state.friendsData, username);
			if (updatedArray) {
				dispatchProfile({type: "FRIEND_DATA", friendsData: [...updatedArray]});
			}
		}
		else if (origin === "user")
			dispatchProfile({type: "USER_DATA", userData: {...state.userData, relation: undefined}});
		const request: ProfileRequest = {
			type: type,
			identifier: username,
			data: {}
		};
		sendJsonMessage(request);
	}

	return (
		<div className="shrink-0 w-[140px] h-[40px] flex justify-between items-center">
			{
				seeMore ?
				<>
					<div onClick={() => clickHandler("unfriend")} className="bg-secondary w-[40px] flex justify-center items-center h-full rounded-md cursor-pointer select-none">
						<img src={unfriend} alt="" width={20} height={20}/>
					</div>
					<div onClick={() => clickHandler("block")} className="bg-secondary w-[40px] flex justify-center items-center h-full rounded-md cursor-pointer select-none">
						<img src={block} alt="" width={20} height={20}/>
					</div>
				</>
				:
				<>
					<div onClick={() => clickHandler("invite")} className="bg-secondary w-[40px] flex justify-center items-center h-full rounded-md cursor-pointer select-none">
						<img src={play_icon} alt="" width={20} height={20}/>
					</div>
					<div className="bg-secondary w-[40px] flex justify-center items-center h-full rounded-md cursor-pointer select-none">
						<img src={send_icon} alt="" width={20} height={20}/>
					</div>
				</>
			}
			<div onClick={() => setSeeMore(!seeMore)} className="flex gap-[0.5px] bg-secondary w-[40px] justify-center items-center h-full rounded-md cursor-pointer select-none">
				{
					seeMore ?
						<img src={deny} alt="" width={20} height={20}/>
					:
					<>
						<img src={more_icon} alt="" width={5.36} height={5.36}/>
						<img src={more_icon} alt="" width={5.36} height={5.36}/>
						<img src={more_icon} alt="" width={5.36} height={5.36}/>
					</>
				}
			</div>
		</div>
	)
}

export default FriendActions;
