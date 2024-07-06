import { useEffect, useRef, useState } from "react"
import { FriendsData, ProfileRes } from "../../types/profile"
import FriendBar from "./FriendBar"
import { AnimatePresence, motion } from "framer-motion"
import { useGlobalContext } from "../../contexts/store"
import { useNavigate } from "react-router-dom"
import fetchProfile from "./fetchProfile"
import RelationBar from "./RelationBar"
import { useProfileContext } from "../../contexts/profileStore"
import api from "../../api/axios"

const uri = window.location.pathname.substring(1);
const index = uri.indexOf('/');
const id = (index === -1) ? undefined : uri.substring(index);
const newUri = id ? "friends" + id + "/" : "friends/";
const friendsResponse: FriendsData[] = await api.get('api/' + newUri).then((e) => e.data);

const AllFriends = () => {
	const { state, dispatchProfile } = useProfileContext();
	const [relation, setRelation] = useState<string>("friend");
	const refScroll = useRef();
	const refFriend = useRef();
	const refPending = useRef();
	const refBlocked = useRef();
	const searchData = useRef<string>('');

	const stopScroll = useRef(false);
	const countScroll = useRef(10);

	const collectData = async (uri: string, isscroll?: boolean) => {
		const ProfileRes: FriendsData[] = await api.get('api/' + uri).then((e) => e.data);
		console.log(ProfileRes);
		if (isscroll)
		{
			if (ProfileRes.length < 10)
				stopScroll.current = true;
			if (state.friendsData)
				dispatchProfile({type: "FRIEND_DATA", friendsData: state.friendsData.concat(ProfileRes)});
			else
				dispatchProfile({type: "FRIEND_DATA", friendsData: ProfileRes});
		}
		else
		{
			dispatchProfile({type: "FRIEND_DATA", friendsData: ProfileRes});
		}
	}

	const reset = (element : any) => {
		element.children[0].classList.value = "duration-500 font-normal";
		element.children[1].classList.value = "duration-500 border-b border-primary w-full absolute top-full -translate-x-full";
	}

	const apply = (element : any) => {
		element.children[0].classList.value = "duration-500 text-primary font-medium";
		element.children[1].classList.value = "duration-500 border-b border-primary w-full";
	}
	
	const resetAll = () => {
		reset(refFriend.current);
		reset(refPending.current);
		reset(refBlocked.current);
	}

	const HandleClick = (ref: any, newRelation: string, uri: string) => {
		if (relation == newRelation)
			return ;
		dispatchProfile({type: "FRIEND_DATA", friendsData: null});
		resetAll();
		apply(ref.current);
		
		stopScroll.current = false;
		countScroll.current = 10;
		
		setRelation(newRelation);
		collectData(uri);
	}

	useEffect(() => {
		dispatchProfile({type: "FRIEND_DATA", friendsData: friendsResponse});
		// collectData(uri);
	}, []);

	const scrollHandler  = (e: any) => {
		const start: any = refScroll.current;
		const end = e.target.lastChild;
		if (!end)
			return ;
		const lastPart: number = end.getBoundingClientRect().top - start.getBoundingClientRect().top;
		if (!stopScroll.current && lastPart <= 520)
		{
			console.log("heree");
			
			let name;
			if (relation == "friend")
				name = newUri;
			else if (relation == "rec_req")
				name = "pending";
			else if (relation == "blocker")
				name = "blocked";
			collectData(name + "?filter=" + searchData.current + "&start=" + countScroll.current.toString() + "&end=" + (countScroll.current + 10).toString(), true);
			countScroll.current += 10;
		}
	}

	const HandleChange = (e: any) => {
		stopScroll.current = false;
		countScroll.current = 10;
		searchData.current = e.currentTarget.value;
		let name;
		if (relation == "friend")
			name = newUri;
		else if (relation == "rec_req")
			name = "pending";
		else if (relation == "blocker")
			name = "blocked";
		collectData(name + "?filter=" + searchData.current);
	}

	return (
		<>
		<AnimatePresence>
			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{duration: 0.3}}
				exit={{ opacity: 0}}
				className="absolute">
				<div className="fixed top-0 start-0 bg-black opacity-70 w-full min-h-[100vh]" onClick={() => dispatchProfile({type: "SEE_ALL_FRIENDS", seeAllFriends: false})}/>
				<motion.div
					initial={{y: 'calc(-50% - 10px)', x: '-50%'}}
					animate={{y: '-50%'}}
					transition={{duration: 0.3}}
					exit={{y: 'calc(-50% - 10px)', x: '-50%'}}
					className={`z-50 flex flex-col justify-between gap-6 pt-[30px] pb-[58px] sm:px-16 px-8 fixed left-[50%] -translate-x-1/2 border border-border rounded-[10px] max-w-[652px] max-h-[840px] min-h-[330px] h-[90%] overflow-hidden w-[90%] bg-secondary top-1/2 -translate-y-1/2`}>
					<span className="self-end text-sm opacity-50 cursor-pointer select-none"
					onMouseEnter={(e) => {e.currentTarget.classList.replace("opacity-50", "opacity-100");}}
					onMouseLeave={(e) => {e.currentTarget.classList.replace("opacity-100", "opacity-50");}}
					onClick={() => dispatchProfile({type: "SEE_ALL_FRIENDS", seeAllFriends: false})}>
						close
					</span>
					<div className="flex justify-between max-w-[268px] w-full gap-2">
						<RelationBar ref={refFriend} onClick={() => HandleClick(refFriend, "friend", newUri)} width={59} name={"Friends"} active={true} />
						{
							!(id) &&
							<>
								<RelationBar ref={refPending} onClick={() => HandleClick(refPending, "rec_req", "pending")} width={67} name={"Pending"} active={false} />
								<RelationBar ref={refBlocked} onClick={() => HandleClick(refBlocked, "blocker", "blocked")} width={63} name={"Blocked"} active={false} />
							</>
						}
					</div>
					<input onChange={(e) => HandleChange(e)} type="text" placeholder="search" className="outline-none focus:w-full duration-200 ease-in-out w-[35%] bg-transparent border-b-[0.5px] px-3 py-[9px] font-thin" />
					<div ref={refScroll} onScroll={scrollHandler} className="min-h-[590px] overflow-auto">
					{
						state.friendsData && state.friendsData.map((friend: FriendsData, index: number) => {
							return (
								<FriendBar key={index} friend={friend} relation={friend.relation}/>
							)
						})
					}
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
		</>
	)
}

export default AllFriends;