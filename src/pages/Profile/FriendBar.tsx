import play_icon from "/play_icon.svg"
import send_icon from "/send_icon.svg"
import more_icon from "/more_icon_white.svg"
import accept from "/accept.svg"
import deny from "/deny.svg"
import { FriendsData } from "../../types/profile"

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
				<img src={play_icon} alt="" width={20} height={20}/>
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
			<div className="flex justify-center shrink-0 w-[101px] h-[26px] rounded-[15px] border border-secondary text-secondary">
				unblock
			</div>
		}
		</>
	)
}

const FriendBar = ({friend, relation}: {friend: FriendsData, relation: string}) => {
	return (
		<>
		{
			<div className="flex flex-col justify-between items-center w-full">
				<div className="flex justify-between items-center w-full gap-3 h-[70px]">
					<div className="flex justify-between items-center gap-4">
							<img src={friend.profile_image} alt={"icon"} width={50} height={50} className="rounded-full overflow-hidden shrink-0"/>
							<span className="shrink overflow-hidden text-ellipsis">{friend.username}</span>
					</div>
					<Action relation={relation} />
				</div>
				<div className="w-[77%] self-center border-b-[0.5px] border-b-white opacity-50"/>
			</div>
		}
		</>
	)
}

export default FriendBar;