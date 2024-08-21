import { FiSearch } from "react-icons/fi";
import api from "../../../api/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { FriendsData } from "../../../types/profile";
import { useNavigate } from "react-router-dom";
import { usePingPongContext } from "../../../contexts/pingPongProvider";
import LayoutHeader from "../../../components/LayoutHeader";

function FriendBar({friend} : {friend: FriendsData}) {
	const [send, setSend] = useState<boolean>(false);
	const navigate = useNavigate();

	const goToProfile = () => {
		navigate(friend.profile);
	}

	const sendPlayInv = () => {
		// if (!send)
			// setSend(true);
		setSend(!send);
	}

	return (
		<div className="flex justify-between items-center h-[50px] gap-4 shrink-0">
			<div className="h-full w-full flex mobile:justify-between justify-center items-center border border-border rounded-md mobile:px-5 px-3 gap-2">
				<div className="flex items-center gap-4 select-none">
					<div className="relative w-[31px] h-[31px]">
						{
							friend.online &&
							<span className="absolute rounded-full h-[7px] w-[7px] bg-[#1ED947] -translate-x-full -translate-y-full top-full left-full" />
						}
						<img onClick={goToProfile} src={friend.profile_image} className="w-full h-full rounded-full border border-primary overflow-hidden shrink-0 cursor-pointer" />
					</div>
					<span className="font-normal text-base truncate mobile:w-16 w-10">{friend.username}</span>
				</div>
				<span className="font-normal text-base mobile:block hidden shrink-0">lvl </span> {/* {friend.level.current} */} 
			</div>
			{
				send ?
				<div className="border border-border bg-secondary rounded-md h-full shrink-0 flex justify-center items-center sm:px-10 px-6">
					<span className="text-gray1 sm:text-base text-sm">sent</span>
				</div>
				:
				<div onClick={sendPlayInv} className="border border-border bg-bg rounded-md h-full shrink-0 flex justify-center items-center sm:px-9 px-5 cursor-pointer select-none">
					<span className="text-primary sm:text-base text-sm">invite</span>
				</div>
			}
		</div>
	)
}

async function fetchFriends() {
	const res = await api.get('api/friends/');
	return res;
}

function VsFriend() {
	const {data, isLoading, isError} = useQuery({queryKey: ['playFriends'], queryFn: () => fetchFriends()});
	const [friends, setFriends] = useState<FriendsData[]>(data?.data);
	const scrollRef = useRef(null);
	const stopScroll = useRef<boolean>(false);
	const countScroll = useRef<number>(10);
	const searchData = useRef<string>("");
	const navigate = useNavigate();
	// const { state, dispatch } = usePingPongContext();

	const fetchOtherFriends = async (uri: string, isScroll: boolean) => {
		const res: FriendsData[] = await api.get(uri).then((e) => e.data);
		console.log(res);
		if (isScroll)
		{
			if (res.length < 10)
				stopScroll.current = true;
			// if (friends)
				setFriends((prev) => prev.concat(res));
			// else
			// 	setFriends(res);
		}
		else
			setFriends(res);
	}

	const scrollHandler = (e: any) => {
		const start: any = scrollRef.current;
		const end = e.target.lastChild;
		if (!end)
			return ;
		const lastPart: number = end.getBoundingClientRect().top - start.getBoundingClientRect().top;
		if (!stopScroll.current && lastPart <= 135)
		{
			fetchOtherFriends("api/friends/?filter=" + searchData.current + "&start=" + countScroll.current.toString() + "&end=" + (countScroll.current + 10).toString(), true);
			countScroll.current += 10;
		}
	}

	const changeHandler = (e: any) => {
		stopScroll.current = false;
		countScroll.current = 10;
		searchData.current = e.currentTarget.value;
		if (searchData.current == "")
			fetchOtherFriends("api/friends/?filter=" + searchData.current, false);
	}
	
	const clickHandler = () => {
		if (searchData.current != "")
			fetchOtherFriends("api/friends/?filter=" + searchData.current, false);
	}

	const handleCancel = () => {
		navigate('/ping-pong');
	}

	useEffect(() => {
		if (!isLoading)
			setFriends(data?.data);
		console.log(friends);
		
	}, [isLoading]);

	return (
		<>
			<LayoutHeader>Play against a friend</LayoutHeader>
			<div className="flex justify-center items-center">
				<div className="w-full max-w-[770px] flex flex-col bg-secondary border border-border rounded-md p-10 gap-7">
					<div className="flex flex-col gap-4">
						<h1 className="text-2xl font-semibold">Play against a friend</h1>
						<p className="text-base font-normal">search for a friend and invite it in game</p>
					</div>
					<div className="flex flex-col gap-5">
						<div className="flex h-[50px] gap-3">
							<input onChange={(e) => changeHandler(e)} type="text" className="w-full h-full border border-border focus:border-primary duration-200 rounded-md px-5 py-3 outline-none bg-transparent" placeholder="search" />
							<div onClick={clickHandler} className="w-[50px] shrink-0 h-full flex justify-center items-center border border-border rounded-md cursor-pointer">
								<FiSearch className='text-2xl' />
							</div>
						</div>
						<div ref={scrollRef} onScroll={(e) => scrollHandler(e)} className="flex flex-col gap-3 max-h-[180px] overflow-auto scrollClass pr-2">
							{
								isLoading ?
								<div>loading...</div>
								:
								friends && friends.map((friend: FriendsData, key: number) => {
									return (
										<FriendBar friend={friend} key={key} />
									)
								})
							}
						</div>
					</div>
					<div className="self-end">
						<span onClick={handleCancel} className="font-extralight cursor-pointer hover:underline duration-300 select-none">back</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default VsFriend;