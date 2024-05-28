import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
	return (
		<div className='w-11/12 max-w-[1800px] mx-auto'>
			<NavBar />
			<Outlet />
		</div>
	)
}

export default Layout;