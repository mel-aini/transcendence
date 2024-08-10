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
		<div>
			<NavBar className='relative z-10' />
			<div className='flex gap-10 pl-10 md:pl-0 pr-10 py-10'>
				<SideBar className='hidden md:block' />
				<div className='w-full max-w-[1500px] mx-auto'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default Layout;