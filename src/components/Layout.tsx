import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './SideBar';

const Layout = () => {
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