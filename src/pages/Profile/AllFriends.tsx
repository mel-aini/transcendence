import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { FriendsData, ProfileRes } from "@/types/profile"
import FriendBar from "./FriendBar"
import { AnimatePresence, motion } from "framer-motion"
import { useGlobalContext } from "@/contexts/store"
import { useNavigate, useParams } from "react-router-dom"
import RelationBar from "./RelationBar"
import { useProfileContext } from "@/contexts/profileStore"
import api from "@/api/axios"
import { useQuery } from "@tanstack/react-query"

const Skeleton = () => {
	return (
		<div className="w-[600px] overflow-hidden bg-secondary p-5 sm:p-10 rounded-md space-y-5">
			<div className="flex justify-between max-w-[268px] w-full gap-2 animate-pulse">
			{
				[1, 2, 3].map((key: number) => <div key={key} className='h-[36px] w-[60px] flex flex-col justify-between items-center bg-[#2F2F2F] rounded-lg' />)
			}
			</div>
			<div className="w-full h-[40px] bg-[#2F2F2F] rounded-lg animate-pulse" />
			<div className="h-[226px] pr-2 space-y-2 bg-[#2F2F2F] rounded-lg animate-pulse" />
		</div>
	)
}

async function fetchData(uri: string) {
	const res = await api.get(uri + "/");
	return res;
}

const AllFriends = () => {
	const { id } = useParams();
	const newUri = useRef<string>(id ? "friends/" + id : "friends");
	const {data, isLoading, isError, isRefetching} = useQuery({queryKey: ['allFriends', id], queryFn: () => fetchData(newUri.current), refetchInterval: 5000});
	const { state, dispatchProfile } = useProfileContext();
	const [relation, setRelation] = useState<string>("friend");
	const refScroll = useRef(null);
	const refFriend = useRef();
	const refPending = useRef();
	const refBlocked = useRef();
	const searchData = useRef<string>('');

	const stopScroll = useRef(false);
	const countScroll = useRef(10);

	const collectData = async (uri: string, isscroll?: boolean) => {
		try {
			const ProfileRes: FriendsData[] = await api.get(uri).then((e) => e.data);
			if (isscroll)
			{
				(ProfileRes.length < 10) && (stopScroll.current = true);
				state.friendsData ?
				dispatchProfile({type: "FRIEND_DATA", friendsData: state.friendsData.concat(ProfileRes)})
				:
				dispatchProfile({type: "FRIEND_DATA", friendsData: ProfileRes});
			}
			else
				dispatchProfile({type: "FRIEND_DATA", friendsData: ProfileRes});
		}
		catch (err: any) {
			dispatchProfile({type: "FRIEND_DATA", friendsData: null});
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
		newUri.current = uri;
		collectData(uri + "/");
	}

	useEffect(() => {
		if (!isLoading)
			dispatchProfile({type: "FRIEND_DATA", friendsData: data?.data});
	}, [isLoading]);

	useEffect(() => {
		if (!isRefetching)
			dispatchProfile({type: "FRIEND_DATA", friendsData: data?.data});
	}, [isRefetching]);

	if (isLoading) {
		return (
			<Skeleton />
		)
	}

	if (isError) {
		return (
			<h1>Error</h1>
		)
	}

	const scrollHandler  = (e: any) => {
		const start: any = refScroll.current;
		const end = e.target.lastChild;
		if (!end)
			return ;
		const lastPart: number = end.getBoundingClientRect().top - start.getBoundingClientRect().top;
		if (!stopScroll.current && lastPart <= 520)
		{
			let name;
			if (relation == "friend")
				name = newUri.current;
			else if (relation == "rec_req")
				name = "pending";
			else if (relation == "blocker")
				name = "blocked";
			collectData(name + "/?filter=" + searchData.current + "&start=" + countScroll.current.toString() + "&end=" + (countScroll.current + 10).toString(), true);
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
		collectData(name + "/?filter=" + searchData.current);
	}

	return (
		<>
		<AnimatePresence>
			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{duration: 0.3}}
				exit={{ opacity: 0}}
				className="w-[600px] overflow-hidden bg-secondary p-5 sm:p-10 rounded-md space-y-5">
				<div className="flex justify-between max-w-[268px] w-full gap-2">
					<RelationBar ref={refFriend} onClick={() => HandleClick(refFriend, "friend", id ? "friends/" + id : "friends")} width={59} name={"Friends"} active={true} />
					{
						!(id) &&
						<>
							<RelationBar ref={refPending} onClick={() => HandleClick(refPending, "rec_req", "pending")} width={67} name={"Pending"} active={false} />
							<RelationBar ref={refBlocked} onClick={() => HandleClick(refBlocked, "blocker", "blocked")} width={63} name={"Blocked"} active={false} />
						</>
					}
				</div>
				<input onChange={(e) => HandleChange(e)} type="text" placeholder="search" className="outline-none w-full bg-transparent border-b-[0.5px] px-3 py-[9px] font-thin" />
				<div ref={refScroll} onScroll={scrollHandler} className="h-[226px] overflow-auto overscroll-none scrollClass pr-2 space-y-2">
				{
					state.friendsData && state.friendsData.length == 0 && <div className="text-center">empty list</div>
				}
				{
					state.friendsData && state.friendsData.length > 0 && state.friendsData.map((friend: FriendsData, index: number) => {
						return (
							<FriendBar key={index} friend={friend} relation={friend.relation}/>
						)
					})
				}
				</div>
			</motion.div>
		</AnimatePresence>
		</>
	)
}

export default AllFriends;