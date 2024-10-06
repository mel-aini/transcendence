import States from "./States";
import History from "./History";
import Friends from "./Friends";
import ProfileHeader from "./ProfileHeader";
import { useEffect } from "react";
import { useGlobalContext } from "../../contexts/store";
import {  useParams } from "react-router-dom";
import { useProfileContext } from "../../contexts/profileStore";
import api from "../../api/axios";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/authProvider";

async function fetchData(id: string | undefined) {
	const uri: string = id ? "users/" + id : "profile";
	const res = await api.get(uri + "/");
	return res;
}

const Index = () => {
	const { id } = useParams();
	const {data, isLoading, isError, isRefetching} = useQuery({queryKey: ['profile', id], queryFn: () => fetchData(id), refetchInterval: 5000});
	const { state, dispatchProfile } = useProfileContext();
	const { dispatch } = useGlobalContext();
	const { dispatch: authDispatch } = useAuthContext();

	useEffect(() => {
		authDispatch({type: 'TOKEN', token: null})
	}, [])
	
	useEffect(() => {
		if (!isLoading)
		{
			dispatchProfile({type: "USER_DATA", userData: data?.data});
			if (!id)
			{
				dispatch({type: "USER_DATA", userData: data?.data});
				authDispatch({type: 'USERNAME', username: data?.data.username});
			}
		}
	} ,[isLoading, id])

	useEffect(() => {
		if (!isRefetching)
		{
			dispatchProfile({type: "USER_DATA", userData: data?.data});
			if (!id)
			{
				dispatch({type: "USER_DATA", userData: data?.data});
				authDispatch({type: 'USERNAME', username: data?.data.username});
			}
		}
	} ,[isRefetching])

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