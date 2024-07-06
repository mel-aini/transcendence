import { Suspense, useEffect } from "react";
import AllFriends from "./AllFriends";
import { FriendsData, ProfileRes } from "../../types/profile";
import { useGlobalContext } from "../../contexts/store";
import { useNavigate } from "react-router-dom";
import fetchProfile from "./fetchProfile";
import Container from "../../components/Container";
import { useProfileContext } from "../../contexts/profileStore";
import api from "../../api/axios";

const uri = window.location.pathname.substring(1);
const index = uri.indexOf('/');
const id = (index === -1) ? undefined : uri.substring(index);
const newUri = id ? "friends" + id + "/" : "friends/";
const friendsResponse: FriendsData[] = await api.get('api/' + newUri + "?start=0&end=23").then((e) => e.data);

const Friends = () => {
	const { state, dispatchProfile } = useProfileContext();
	const navigate = useNavigate();

	// const collectData = async () => {
	// 	const ProfileRes: ProfileRes = await fetchProfile(uri + "?start=0&end=15");
	// 	if (ProfileRes.status == 200)
	// 		dispatchProfile({type: "FRIEND_DATA", friendsData: ProfileRes.data});
	// 	else if (ProfileRes.status == 404)
	// 		navigate('/');
	// 	else if (ProfileRes.status == 401) {
	// 		dispatch({type: 'LOGOUT'});
	// 		navigate('/login');
	// 	}
	// }
	
	const userClick = (path:string) => {
		navigate(path);
	}

	useEffect(() => {
		dispatchProfile({type: "FRIEND_DATA", friendsData: friendsResponse});
	}, []);

	return (
		<Suspense fallback={<h1>loading...</h1>}>
		<div className="row-start-1 xl:row-start-2 xl:col-start-1 xl:col-end-4 min-h-[134px]">
			<Container className="h-full select-none" childClassName="relative flex flex-col justify-between items-center px-7 py-5">
				<div className="relative flex justify-between items-center w-full">
					<h1 className="text-2xl font-semibold">Friends</h1>
					<span className="cursor-pointer" onClick={() => dispatchProfile({type: "SEE_ALL_FRIENDS", seeAllFriends: true})}>see all</span>
					{ state.seeAllFriends && <AllFriends /> }
				</div>
				<div className="flex justify-start items-center gap-3 w-full overflow-hidden">
					{state.friendsData && state.friendsData.map((friend: FriendsData, key: number) => {
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