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
import Settings from "../Settings/Index";
import api from "../../api/axios";
import { useQuery } from "@tanstack/react-query";

async function fetchData(id: string | undefined) {
	const uri: string = id ? "users/" + id : "profile";
	const res = await api.get('api/' + uri);
	return res;
}

const Index = () => {
	const { id } = useParams();
	const {data, isLoading, isError} = useQuery({queryKey: ['profile', id], queryFn: () => fetchData(id)});
	const { state, dispatchProfile } = useProfileContext();
	
	useEffect(() => {
		dispatchProfile({type: "USER_DATA", userData: data?.data});
	} ,[data])

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
			<div className="flex flex-col justify-center items-center relative">
				{ state.settings && <Settings /> }
				<ProfileHeader />
				{
					state.userData?.relation !== 'you' &&
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
				}
			</div>
	);
}

export default Index;