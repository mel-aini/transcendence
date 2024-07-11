import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Alert from './Alert';

const Layout = () => {
	return (
		<div className='w-11/12 max-w-[1500px] mx-auto'>
			<NavBar className='relative z-50' />
			<Alert />
			<Outlet />
		</div>
	)
}

export default Layout;