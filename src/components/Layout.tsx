import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { useEffect } from 'react';
import { useGlobalContext } from '../contexts/store';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { useChatContext } from '../contexts/chatProvider';

async function fetchData() {
	const res = await api.get('api/profile');
	return res;
}

const Layout = () => {

	const { dispatch } = useGlobalContext();

	const {data, isLoading, isError} = useQuery({queryKey: ['getProfile'], queryFn: () => fetchData()});

	useEffect(() => {
		if (!isLoading)
			dispatch({type: "USER_DATA", userData: data?.data});
	}, [isLoading]);

	return (
		<>
			<NavBar />
			<div className='relative z-40 bg-bg flex gap-10 pl-10 lg:pl-0 pr-10'>
				<SideBar className='px-5 py-10 hidden lg:block z-10 h-[calc(100vh-5rem)]' />
				<div className='w-full mx-auto bg-bg lg:px-5 py-10'>
					<Outlet />
				</div>
			</div>
		</>
	)
}

export default Layout;