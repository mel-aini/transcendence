import play_icon from "/play_icon.svg"
import send_icon from "/send_icon.svg"
import more_icon from "/more_icon_white.svg"
import { useEffect, useState } from "react"
import axios from "axios"
import { UserData } from "../../types/profile"

const AllFriends = () => {

	const [friends, setFriends] = useState<UserData | null>(null);

	const getFriends = async () => {
		try {
			const res = await axios.get('http://localhost:3000/users');
			setFriends(res.data);
			console.log(res.data);
		} catch (error: any) {
			
		}
	}
	useEffect(() => {
		getFriends();
	}, []);

	return (
		<div className="flex flex-col justify-between gap-5 sm:py-10 sm:px-16 p-7 border border-primary rounded-[10px] absolute max-w-[652px] w-[85%] max-h-[840px] bg-gray3">
			<span className="self-end text-sm text-secondary">close</span>
			<div className="flex justify-between max-w-[268px] w-full">
				<span className="text-primary font-medium border-b border-primary pb-3">Friends</span>
				<span className="font-normal">Pending</span>
				<span className="font-normal">Blocked</span>
			</div>
			{/* <div> */}
				<input type="text" placeholder="search" className="bg-transparent border-b-[0.5px] w-full px-3 py-1 font-thin" />
			{/* </div> */}
				{friends && friends.map((friend: UserData, key: number) => {
					return (
							<div className="flex flex-col justify-between items-center w-full">
								<div key={key} className="flex justify-between items-center w-full h-[70px]">
									<div className="flex justify-between items-center gap-2 h-[50px]">
										<img src={friend.profile_image} alt={friend.profile_image} width={50} height={50} className="rounded-full overflow-hidden"/>
										<span className="shrink overflow-hidden text-ellipsis">{friend.username}</span>
									</div>
									<div className="flex justify-between sm:gap-[27px]">
										<div className="flex gap-[0.5px]">
											<img src={more_icon} alt="" width={5.36} height={5.36}/>
											<img src={more_icon} alt="" width={5.36} height={5.36}/>
											<img src={more_icon} alt="" width={5.36} height={5.36}/>
										</div>
										<img src={play_icon} alt="" width={20} height={20}/>
										<img src={send_icon} alt="" width={20} height={20}/>
									</div>
								</div>
								<hr className="w-[77%] self-center"/>
							</div>
						)
					})
				}
		</div>
	)
}

export default AllFriends;