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
import Settings from "./Settings/Settings";
import api from "../../api/axios";

const uri = window.location.pathname;
const profileResponse : UserData = await api.get('api' + uri).then((e) => e.data);

const Index = () => {
	const { state, dispatchProfile } = useProfileContext();

	useEffect(() => {
		dispatchProfile({type: "USER_DATA", userData: profileResponse});
	} ,[])

	return (
		<Suspense fallback={<h1>Loading...</h1>}>
			<div className="flex flex-col justify-center items-center relative">
				{ state.settings && <Settings /> }
				<ProfileHeader />
				<div className="w-full 2xl:px-0 ">
					<div className="xl:h-[800px] grid grid-cols-1 pt-20 xl:grid-cols-7 xl:mt-[75px] gap-5 pb-7">
							<States data={state.userData} />
							<Friends />
						{
							state.userData
							?
							<History />
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