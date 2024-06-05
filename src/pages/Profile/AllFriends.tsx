import { useContext, useEffect, useRef, useState } from "react"
import axios from "axios"
import { UserData } from "../../types/profile"
import FriendBar from "./FriendBar"
import { context } from "./Friends"
import { AnimatePresence, motion } from "framer-motion"

const AllFriends = () => {

	const [friends, setFriends] = useState<UserData | null>(null);
	const [relation, setRelation] = useState<string>("friend");
	const seeMore = useContext(context);
	const refFriend = useRef();
	const refPending = useRef();
	const refBlocked = useRef();

	const reset = (element : any) => {
		element.children[0].classList.value = "duration-500 font-normal";
		element.children[1].classList.value = "duration-500 border-b border-primary w-full absolute top-full -translate-x-full";
	}
	
	const resetAll = () => {
		reset(refFriend.current);
		reset(refPending.current);
		reset(refBlocked.current);
	}
	
	const HandleFriend = () => {
		
		resetAll();
		refFriend.current.children[0].classList.value = "duration-500 text-primary font-medium";
		refFriend.current.children[1].classList.value = "duration-500 border-b border-primary w-full";
		// console.log(refFriend.current.children);
		

		setRelation("friend");
		// try {
		// 	const res = await axios.get('http://localhost:3000/users');
		// 	setFriends(res.data);
		// 	console.log(res.data);
		// } catch (error: any) {
			
		// }
	}
	
	const HandlePending = () => {

		resetAll();
		refPending.current.children[0].classList.value = "duration-500 text-primary font-medium";
		refPending.current.children[1].classList.value = "duration-500 border-b border-primary w-full";

		setRelation("rec_inv");
		// try {
		// 	const res = await axios.get('http://localhost:3000/users');
		// 	setFriends(res.data);
		// 	console.log(res.data);
		// } catch (error: any) {
			
		// }
	}
	
	const HandleBlocked = () => {

		resetAll();
		refBlocked.current.children[0].classList.value = "duration-500 text-primary font-medium";
		refBlocked.current.children[1].classList.value = "duration-500 border-b border-primary w-full";

		setRelation("blocked");
		// try {
		// 	const res = await axios.get('http://localhost:3000/users');
		// 	setFriends(res.data);
		// 	console.log(res.data);
		// } catch (error: any) {
			
		// }
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
		<AnimatePresence>
		{
			seeMore.seeAll &&
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{duration: 0.3}}
					exit={{ opacity: 0}}
					className="absolute">
					<div className="fixed top-0 start-0 bg-black opacity-70 w-full min-h-[100vh]" onClick={() => seeMore.setSeeAll(false)}/>
					<motion.div 
						initial={{y: 'calc(-50% - 10px)', x: '-50%'}}
						animate={{y: '-50%'}}
						transition={{duration: 0.3}}
						exit={{y: 'calc(-50% - 10px)', x: '-50%'}}
						className="z-10 flex flex-col justify-between gap-6 pt-[30px] pb-[58px] sm:px-16 px-8 fixed left-[50%] -translate-x-1/2 border border-primary rounded-[10px] max-w-[652px] max-h-[840px] overflow-hidden w-[90%] bg-gray3 top-1/2 -translate-y-1/2">
						<span className="self-end text-sm text-secondary cursor-pointer select-none"
						onMouseEnter={(e) => {e.currentTarget.classList.replace("text-secondary", "text-white");}}
						onMouseLeave={(e) => {e.currentTarget.classList.replace("text-white", "text-secondary");}}
						onClick={() => seeMore.setSeeAll(false)}>
							close
						</span>
						<div className="flex justify-between max-w-[268px] w-full gap-2">
							<div ref={refFriend} onClick={HandleFriend} className='relative h-[36px] w-[59px] flex flex-col justify-between items-center overflow-hidden select-none'>
								<span className="duration-500 text-primary font-medium">Friends</span>
								<div className="duration-500 border-b border-primary w-full" />
							</div>
							<div ref={refPending} onClick={HandlePending} className="relative h-[36px] w-[67px] flex flex-col justify-between items-center overflow-hidden select-none">
								<span className="duration-500 font-normal">Pending</span>
								<div className="duration-500 border-b border-primary w-full absolute top-full -translate-x-full" />
							</div>
							<div ref={refBlocked} onClick={HandleBlocked} className="relative h-[36px] w-[63px] flex flex-col justify-between items-center overflow-hidden select-none">
								<span className="duration-500 font-normal">Blocked</span>
								<div className="duration-500 border-b border-primary w-full absolute top-full -translate-x-full" />
							</div>
						</div>
						<input type="text" placeholder="search" className="bg-transparent border-b-[0.5px] w-full px-3 pb-[9px] font-thin" />
						<div className="min-h-[590px] overflow-auto">
							{
								friends && friends.map((friend: UserData, key: number) => {
									return (
										<div key={key}>
											<FriendBar friend={friend} relation={relation}/>
										</div>
									)
								})
							}
						</div>
					</motion.div>
				</motion.div>
		}
		</AnimatePresence>
		</>
	)
}

export default AllFriends;