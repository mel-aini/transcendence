import play_icon from "/play_icon.svg"
import send_icon from "/send_icon.svg"
import more_icon from "/more_icon.svg"
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator, Transition } from '@headlessui/react'
import { ProfileRequest, UserData } from "../../../types/profile"
import { profileSocket } from "../../../utils/profileSocket"
import { profileContext } from "../Index"
import useWebSocket from "react-use-websocket"
import { useContext, useEffect, useState } from "react"
import { WS_URL } from "../../../contexts/store"
import { useGlobalWebSocketContext } from "../../../contexts/globalWebSokcketStore"
import { useProfileContext } from "../../../contexts/profileStore"

const FriendActions = () => {
	const { sendJsonMessage } = useGlobalWebSocketContext();
	// const userData = useContext(profileContext);
	const { state } = useProfileContext();

	const clickHandler = (type: "unfriend" | "block") => {
		const request: ProfileRequest = {
			type: type,
			identifier: state.userData.username,
			data: {}
		};
		sendJsonMessage(request);
	}

	return (
		<div className="w-[140px] h-[40px] flex justify-between items-center">
			<div className="bg-secondary w-[40px] flex justify-center items-center h-full rounded-md">
				<img src={play_icon} alt="" width={20} height={20}/>
			</div>
			{/* <hr className="border-white w-[20px] rotate-90"/> */}
			<div className="bg-secondary w-[40px] flex justify-center items-center h-full rounded-md">
				<img src={send_icon} alt="" width={20} height={20}/>
			</div>
			{/* <hr className="border-white w-[20px] rotate-90"/> */}

			<Menu as="div" className="relative bg-secondary w-[40px] h-full rounded-md">
				<MenuButton className="w-full h-full flex justify-center items-center outline-none">
					<div className="flex gap-[0.5px]">
						<img src={more_icon} alt="" width={5.36} height={5.36}/>
						<img src={more_icon} alt="" width={5.36} height={5.36}/>
						<img src={more_icon} alt="" width={5.36} height={5.36}/>
					</div>
				</MenuButton>
				<Transition
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<MenuItems className="absolute duration-100 bg-bg flex flex-col left-0 sm:left-11 -top-1 border border-border rounded-md mt-1 outline-none">
						<MenuItem><span onClick={() => clickHandler("unfriend")} className="text-primary my-1 px-3 cursor-pointer select-none">unfriend</span></MenuItem>
						<MenuSeparator className="mx-1 h-px bg-border"/>
						<MenuItem><span onClick={() => clickHandler("block")} className="text-primary my-1 px-3 cursor-pointer select-none">block</span></MenuItem>
					</MenuItems>
				</Transition>
			</Menu>

			{/* <div className="bg-secondary w-[40px] flex justify-center items-center h-full rounded-md">
				<div className="flex gap-[0.5px]">
					<img src={more_icon} alt="" width={5.36} height={5.36}/>
					<img src={more_icon} alt="" width={5.36} height={5.36}/>
					<img src={more_icon} alt="" width={5.36} height={5.36}/>
				</div>
			</div> */}
		</div>
	)
}

export default FriendActions;