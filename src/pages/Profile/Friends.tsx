import { Suspense, useEffect, useState } from "react";
import AllFriends from "./AllFriends";
import { FriendsData, ProfileRes } from "../../types/profile";
import { useGlobalContext } from "../../contexts/store";
import { useNavigate, useParams } from "react-router-dom";
import fetchProfile from "./fetchProfile";
import Container from "../../components/Container";
import { useProfileContext } from "../../contexts/profileStore";
import api from "../../api/axios";
import { useQuery } from "@tanstack/react-query";

async function fetchData(id: string | undefined) {
	const uri: string = id ? "friends/" + id : "friends";
	const res = await api.get(uri + "/?start=0&end=23");
	return res;
}

const Friends = () => {
	const { id } = useParams();
	const {data, isLoading, isError, isRefetching} = useQuery({queryKey: ['friends', id], queryFn: () => fetchData(id), refetchInterval: 5000});
	const navigate = useNavigate();
	const [friends, setFriends] = useState< FriendsData[] | null >(null);
	const [seeAllFriends, setSeeAllFriends] = useState<boolean>(false);
	
	const userClick = (path:string) => {
		navigate(path);
	}

	useEffect(() => {
		if (!isLoading)
			setFriends(data?.data);
	}, [isLoading]);

	useEffect(() => {
		if (!isRefetching)
			setFriends(data?.data);
	}, [isRefetching]);

	if (isLoading) {
		return (
			<h1>loading...</h1>
		)
	}

	if (isError) {
		return (
			<h1>Error</h1>
		)
	}

	return (
		<Suspense fallback={<h1>loading...</h1>}>
		<div className="row-start-1 xl:row-start-2 xl:col-start-1 xl:col-end-4 min-h-[134px]">
			<Container className="h-full select-none" childClassName="relative flex flex-col justify-between items-center px-7 py-5">
				<div className="relative flex justify-between items-center w-full">
					<h1 className="text-2xl font-semibold">Friends</h1>
					<span className="cursor-pointer" onClick={() => setSeeAllFriends(true)}>see all</span>
					{ seeAllFriends && <AllFriends setSeeAllFriends={setSeeAllFriends} /> }
				</div>
				<div className="flex justify-start items-center gap-3 w-full overflow-hidden">
					{friends && friends.map((friend: FriendsData, key: number) => {
						return (
							<img onClick={() => userClick(friend.profile)} key={key} className="min-w-[40px] h-[40px] cursor-pointer rounded-full" src={friend.profile_image}/>
						)
					})}
				</div>
			</Container>
		</div>
		</Suspense>
	)
}

export default Friends;