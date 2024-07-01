import States from "./States";
import History from "./History";
import Friends from "./Friends";
import ProfileHeader from "./ProfileHeader";
import { createContext, useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/store";
import { ProfileRes, UserData } from "../../types/profile";
import { useNavigate, useParams } from "react-router-dom";
import fetchProfile from "./fetchProfile";
import { useProfileContext } from "../../contexts/profileStore";

export const profileContext = createContext<any>({});

const Index = () => {
	const { state, dispatchProfile } = useProfileContext();
	const { dispatch } = useGlobalContext();
	const navigate = useNavigate();
	const { id } = useParams();
	const user = id ? 'users/' + id : 'profile';

	const collectData = async () => {
		dispatch({type: 'LOADING', state: true});
		const ProfileRes: ProfileRes = await fetchProfile(user);
		if (ProfileRes.status == 200)
			dispatchProfile({type: "USER_DATA", userData: ProfileRes.data});
		else if (ProfileRes.status == 404)
			navigate('/');
		else if (ProfileRes.status == 401) {
			dispatch({type: 'LOGOUT'});
			navigate('/login');
		}
		dispatch({type: 'LOADING', state: false});
	}

	useEffect(() => {
		collectData();
	} ,[])

	return (
		<div className="flex flex-col justify-center items-center relative">
			<ProfileHeader user={user} />
			<div className="w-full 2xl:px-0 ">
				<div className="xl:h-[800px] grid grid-cols-1 pt-20 xl:grid-cols-7 xl:mt-[75px] gap-5 pb-7">
						<States data={state.userData} />
						<Friends id={id} />
					{state.userData ?
						<History id={id} username={state.userData.username} />
						:
						<div>Loading...</div>
					}
				</div>
			</div>
		</div>
	);
}

export default Index;