import play_icon from "/play_icon_primary.svg"
import send_icon from "/send_icon_primary.svg"
import more_icon from "/more_icon.svg"
import accept from "/accept.svg"
import deny from "/deny.svg"
import { FriendsData } from "../../types/profile"
import { useNavigate } from "react-router-dom"

const Action = ({relation}: {relation: string}) => {
	return (<>
		{
			(relation === "friend") && 
			<div className="flex justify-end gap-[27px] shrink-0">
				<div className="flex gap-[0.5px]">
					<img src={more_icon} alt="" width={5.36} height={5.36}/>
					<img src={more_icon} alt="" width={5.36} height={5.36}/>
					<img src={more_icon} alt="" width={5.36} height={5.36}/>
				</div>
				<img src={play_icon} alt="" width={20} height={20} className="fill-primary"/>
				<img src={send_icon} alt="" width={20} height={20}/>
			</div>
		}
		{
			(relation === "rec_inv") && 
			<div className="flex justify-end gap-[30px] shrink-0">
				<img src={deny} alt="" width={20}/>
				<img src={accept} alt="" width={20}/>
			</div>
		}
		{
			(relation === "blocked") && 
			<div className="flex justify-center shrink-0 w-[101px] h-[26px] rounded-[15px] border opacity-35">
				unblock
			</div>
		}
		</>
	)
}

const FriendBar = ({friend, relation}: {friend: FriendsData, relation: string}) => {
	const navigate = useNavigate();

	const userClick = (path:string) => {
		navigate(path);
	}

	return (
		<div className="flex justify-between items-center w-full gap-3 h-[70px] rounded-md border border-border bg-gray3 px-5">
			<div onClick={() => userClick(friend.profile)} className="flex items-center gap-4 cursor-pointer shrink overflow-hidden whitespace-nowrap">
					<img src={friend.profile_image} alt={"icon"} width={38} height={38} className="rounded-full overflow-hidden shrink-0"/>
					<span className="shrink overflow-hidden text-ellipsis">{friend.username}</span>
			</div>
			<Action relation={relation} />
		</div>
	)
}

export default FriendBar;