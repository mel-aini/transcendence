import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserData } from "../../types/profile"
import FriendBar from "./FriendBar"
import { context } from "./Friends"

const AllFriends = () => {

	const [friends, setFriends] = useState<UserData | null>(null);
	const [relation, setRelation] = useState<string>("friend");
	const seeMore = useContext(context);

	const HandleFriend = () => {
		setRelation("friend");
	}
	
	const HandlePending = () => {
		setRelation("rec_inv");
	}
	
	const HandleBlocked = () => {
		setRelation("blocked");
	}

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
		<>
		{
			seeMore.seeAll &&
			<div className="relative">
				<div className="fixed top-0 start-0 bg-black opacity-70 size-full" onClick={() => seeMore.setSeeAll(false)}/>
				<div className="z-10 flex flex-col justify-between gap-6 pt-[30px] pb-[58px] sm:px-16 px-8 fixed top-10 left-[50%] -translate-x-1/2 border border-primary rounded-[10px] max-w-[652px] w-[85%] bg-gray3">
					<span className="self-end text-sm text-secondary" onClick={() => seeMore.setSeeAll(false)}>close</span>
					<div className="flex justify-between max-w-[268px] w-full gap-2">
						{
							relation === "friend" ?
							<div onClick={HandleFriend} className="h-[36px] w-[59px] flex flex-col justify-between items-center">
								<span className="text-primary font-medium">Friends</span>
								<div className="border-b border-primary w-full" />
							</div>
							:
							<div onClick={HandleFriend} className="h-[36px] w-[59px] flex flex-col justify-between items-center">
								<span className="font-normal">Friends</span>
								<div className="border-b border-primary w-full" />
							</div>
						}
						{
							relation === "rec_inv" ?
							<div onClick={HandlePending} className="h-[36px] w-[67px] flex flex-col justify-between items-center">
								<span className="text-primary font-medium">Pending</span>
								<div className="border-b border-primary w-full" />
							</div>
							:
							<div onClick={HandlePending} className="h-[36px] w-[67px] flex flex-col justify-between items-center">
								<span className="font-normal">Pending</span>
								<div className="border-b border-primary w-full" />
							</div>
						}
						{
							relation === "blocked" ?
							<div onClick={HandleBlocked} className="h-[36px] w-[63px] flex flex-col justify-between items-center">
								<span className="text-primary font-medium">Blocked</span>
								<div className="border-b border-primary w-full" />
							</div>
							:
							<div onClick={HandleBlocked} className="h-[36px] w-[63px] flex flex-col justify-between items-center">
								<span className="font-normal">Blocked</span>
								<div className="border-b border-primary w-full" />
							</div>
						}
					</div>
					{/* <div> */}
						<input type="text" placeholder="search" className="bg-transparent border-b-[0.5px] w-full px-3 pb-[9px] font-thin" />
					{/* </div> */}
						{friends && friends.map((friend: UserData, key: number) => {
							return (
								<div key={key}>
									<FriendBar friend={friend} relation={relation}/>
								</div>
							)
						})
					}
				</div>
			</div>
		}
		</>
	)
}

export default AllFriends;