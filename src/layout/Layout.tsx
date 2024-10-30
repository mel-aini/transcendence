import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { useEffect } from 'react';
import { useGlobalContext } from '@/contexts/store';
import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios';
import { useAuthContext } from '@/contexts/authProvider';
import { useProfileContext } from '@/contexts/profileStore';

async function fetchData() {
	const res = await api.get('profile/');
	return res;
}

const Layout = () => {
	const { dispatch } = useGlobalContext();
	const { dispatch: authDispatch } = useAuthContext();
	const { dispatchProfile } = useProfileContext();

	const {data, isLoading, isError} = useQuery({queryKey: ['getProfile'], queryFn: () => fetchData(), refetchOnMount: true});

	useEffect(() => {
		if (!isLoading) {
			console.log("data", data?.data);
			
			dispatchProfile({type: "USER_DATA", userData: data?.data});
			dispatch({type: "USER_DATA", userData: data?.data});
			authDispatch({type: 'USERNAME', username: data?.data.username});
		}
	}, [isLoading]);

	return (
		<>
			<NavBar />
			<div className='relative z-40 bg-bg flex gap-10 pl-5 pr-5 sm:pl-10 lg:pl-0 sm:pr-10'>
				<SideBar className='px-5 py-10 hidden lg:block z-10 h-[calc(100vh-5rem)]' />
				<div className='w-full mx-auto bg-bg lg:px-5 py-10 overflow-hidden'>
					<Outlet />
				</div>
			</div>
		</>
	)
}

export default Layout;