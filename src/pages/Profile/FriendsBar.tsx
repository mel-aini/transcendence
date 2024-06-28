import play_icon from "/play_icon_primary.svg"
import send_icon from "/send_icon_primary.svg"
import more_icon from "/more_icon.svg"
import accept from "/accept.svg"
import deny from "/deny.svg"
import { FriendsData, ProfileRequest } from "../../types/profile"
import { useNavigate } from "react-router-dom"
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator, Transition } from "@headlessui/react"
import { profileSocket } from "../../utils/profileSocket"
import { useProfileContext } from "../../contexts/profileStore"

const Action = ({username, relation}: {username: string, relation: string}) => {

	const clickHandler = (type: "accept" | "unblock" | "unfriend" | "block", status?: boolean) => {
		const request: ProfileRequest = {
			type: type,
			other_user: username,
		};
		if (status != undefined)
			request.status = status;
		profileSocket?.send(JSON.stringify(request));
	}
	return (<>
		{
			(relation === "friend") && 
			<div className="flex justify-end gap-[27px] shrink-0">
				<Menu as="div" className="relative">
					<MenuButton className="outline-none">
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
						<MenuItems className="absolute duration-100 bg-bg top-1/2 -translate-y-1/2 -right-3 sm:right-7 flex flex-col border border-border rounded-md outline-none">
							<MenuItem><span onClick={() => clickHandler("unfriend")} className="text-primary my-[2px] px-3 cursor-pointer select-none">unfriend</span></MenuItem>
							<MenuSeparator className="mx-1 h-px bg-border"/>
							<MenuItem><span onClick={() => clickHandler("block")} className="text-primary my-[2px] px-3 cursor-pointer select-none">block</span></MenuItem>
						</MenuItems>
					</Transition>
				</Menu>
				<img src={play_icon} alt="" width={20} height={20}/>
				<img src={send_icon} alt="" width={20} height={20}/>
			</div>
		}
		{
			(relation === "rec_inv") && 
			<div className="flex justify-end gap-[30px] shrink-0">
				<img onClick={() => clickHandler("accept", false)} src={deny} alt="" width={20}/>
				<img onClick={() => clickHandler("accept", true)} src={accept} alt="" width={20}/>
			</div>
		}
		{
			(relation === "blocked") && 
			<div onClick={() => clickHandler("unblock")} className="flex justify-center shrink-0 w-[101px] h-[26px] rounded-[15px] border opacity-35">
				unblock
			</div>
		}
		</>
	)
}

const FriendsBar = ({relation}: {relation: string}) => {
	const { state } = useProfileContext();
	const navigate = useNavigate();

	const userClick = (path:string) => {
		navigate(path);
	}

	return (
		<>
		{
			state.friendsData && state.friendsData.map((friend: FriendsData, index: number) => {
				return (
						<div key={index} className="flex justify-between items-center w-full gap-3 h-[70px] rounded-md border border-border bg-gray3 px-5">
							<div onClick={() => userClick(friend.profile)} className="flex items-center gap-4 cursor-pointer shrink overflow-hidden whitespace-nowrap">
									<img src={friend.profile_image} alt={"icon"} width={38} height={38} className="rounded-full overflow-hidden shrink-0"/>
									<span className="shrink overflow-hidden text-ellipsis">{friend.username}</span>
							</div>
							<Action username={friend.username} relation={relation} />
						</div>
				)
			})
		}
		</>
	)
}

export default FriendsBar;