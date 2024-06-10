import { createContext, useEffect, useState } from "react";
import AllFriends from "./AllFriends";
import { FriendsData, ProfileRes } from "../../types/profile";
import { useGlobalContext } from "../../contexts/store";
import { useNavigate } from "react-router-dom";
import fetchProfile from "./fetchProfile";

export const context = createContext<any>({});

const Friends = ({id}: {id: string | undefined}) => {
	const { dispatch } = useGlobalContext();
	const navigate = useNavigate();
	const [seeAll, setSeeAll] = useState<boolean>(false);
	const [data, setData] = useState<FriendsData[] | null>(null);
	const uri = id ? "friends/" + id + "/" : "friends/";

	const collectData = async () => {
		const ProfileRes: ProfileRes = await fetchProfile(uri + "?start=0&end=5");
		if (ProfileRes.status == 200)
			setData(ProfileRes.data);
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
			<div className="w-full">
				<div className="relative rounded-xl flex justify-center gap-5 items-center border-primary border h-[95px] select-none">
					{data && data.map((friend: FriendsData, key: number) => {
						return (
							<img onClick={() => userClick(friend.profile)} key={key} className="w-[38px] h-[38px] cursor-pointer rounded-full" src={friend.profile_image}/>
						)
					})}
					<span className="cursor-pointer" onClick={() => setSeeAll(true)}>see all</span>
					{ seeAll && <AllFriends id={id} /> }
				</div>
			</div>
		</context.Provider>
	)
}

export default Friends;