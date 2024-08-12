import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { useEffect } from 'react';
import { useGlobalContext } from '../contexts/store';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

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
			<NavBar className='z-50 shadow-bottom' />
			<div className='relative z-40 bg-bg flex gap-10 pl-10 md:pl-0 pr-10'>
				<SideBar className='px-5 py-10 hidden md:block z-10 h-[calc(100vh-5rem)]' />
				<div className='w-full mx-auto bg-bg px-5 py-10'>
					<Outlet />
				</div>
			</div>
		</>
	)
}

export default Layout;