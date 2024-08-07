import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import api from '../api/axios';
import { useGlobalContext } from '../contexts/store';

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
		<div className='w-11/12 max-w-[1500px] mx-auto'>
			<NavBar className='relative z-10' />
			<Outlet />
		</div>
	)
}

export default Layout;