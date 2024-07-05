import States from "./States";
import History from "./History";
import Friends from "./Friends";
import ProfileHeader from "./ProfileHeader";
import { Suspense, createContext, useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/store";
import { ProfileRes, UserData } from "../../types/profile";
import { useNavigate, useParams } from "react-router-dom";
import fetchProfile from "./fetchProfile";
import { useProfileContext } from "../../contexts/profileStore";
import Settings from "./Settings";
import api from "../../api/axios";

// export const profileContext = createContext<any>({});
const profileResponse: ProfileRes = await api.get(window.location.pathname);

const Index = () => {
	const { state, dispatchProfile } = useProfileContext();
	
	// const collectData = async () => {
		// 	dispatch({type: 'LOADING', state: true});
		// 	else if (ProfileRes.status == 404)
			// 		navigate('/');
		// 	else if (ProfileRes.status == 401) {
			// 		dispatch({type: 'LOGOUT'});
			// 		navigate('/login');
			// 	}
			// 	dispatch({type: 'LOADING', state: false});
			// }
			
	useEffect(() => {
		dispatchProfile({type: "USER_DATA", userData: profileResponse.data});
		// collectData();
	} ,[])

	return (
		<Suspense fallback={<h1>Loading...</h1>}>
			<div className="flex flex-col justify-center items-center relative">
				{ state.settings && <Settings /> }
				<ProfileHeader user={user} />
				<div className="w-full 2xl:px-0 ">
					<div className="xl:h-[800px] grid grid-cols-1 pt-20 xl:grid-cols-7 xl:mt-[75px] gap-5 pb-7">
							<States data={state.userData} />
							<Friends id={id} />
						{
							state.userData
							?
							<History id={id} />
							:
							<div>Loading...</div>
						}
					</div>
				</div>
			</div>
		</Suspense>
	);
}

export default Index;