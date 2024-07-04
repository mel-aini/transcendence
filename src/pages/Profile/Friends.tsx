import { createContext, useEffect, useState } from "react";
import AllFriends from "./AllFriends";
import { FriendsData, ProfileRes } from "../../types/profile";
import { useGlobalContext } from "../../contexts/store";
import { useNavigate } from "react-router-dom";
import fetchProfile from "./fetchProfile";
import Container from "../../components/Container";
import { useProfileContext } from "../../contexts/profileStore";

export const context = createContext<any>({});

const Friends = ({id}: {id: string | undefined}) => {
	const { state, dispatchProfile } = useProfileContext();
	const { dispatch } = useGlobalContext();
	const navigate = useNavigate();
	const [seeAll, setSeeAll] = useState<boolean>(false);
	const uri = id ? "friends/" + id + "/" : "friends/";

	const collectData = async () => {
		const ProfileRes: ProfileRes = await fetchProfile(uri + "?start=0&end=15");
		if (ProfileRes.status == 200)
			dispatchProfile({type: "FRIEND_DATA", friendsData: ProfileRes.data});
		else if (ProfileRes.status == 404)
			navigate('/');
		else if (ProfileRes.status == 401) {
			dispatch({type: 'LOGOUT'});
			navigate('/login');
		}
	}

	const userClick = (path:string) => {
		navigate(path);
	}

	useEffect(() => {
		collectData();
	}, []);

	return (
		<context.Provider value={{seeAll, setSeeAll}}>
			<div className="row-start-1 xl:row-start-2 xl:col-start-1 xl:col-end-4 min-h-[134px]">
				<Container className="h-full select-none" childClassName="relative flex flex-col justify-between items-center px-7 py-5">
					<div className="relative flex justify-between items-center w-full">
						<h1 className="text-2xl font-semibold">Friends</h1>
						<span className="cursor-pointer" onClick={() => setSeeAll(true)}>see all</span>
						{ seeAll && <AllFriends id={id} /> }
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
		</context.Provider>
	)
}

export default Friends;