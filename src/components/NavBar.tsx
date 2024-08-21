import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/store";
import User from "./User";
import useLog from "../hooks/useLog";
import Modal from "./Modal";
import SearchUsers from "./SearchUsers";
// import Notifications from "./Notifications";
import { FiBell } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { useChatContext } from "../contexts/chatProvider";
import Notification from "./Notification";
import { SideBarElem } from "./SideBar";
import Logo from "./Logo";

type DropMenuTypes = null | 'profile' | 'notification' | 'navbar';

interface DropMenuProps {
	setDropMenu: any, 
	type: DropMenuTypes
}

function DropMenu({ setDropMenu, type }: DropMenuProps) {
	const {dispatch} = useGlobalContext();
	const navigate = useNavigate();
	const action = useLog();

	const goToProfile = () => {
		setDropMenu(false)
		dispatch({type: 'LOADING', state: true})
		navigate('/profile')
	}

	const elemCLass = 'cursor-pointer bg-secondary hover:bg-slate-800 duration-300 p-3'

	{/* profile actions */}
	if (type == 'profile') {
		return (
			<div className="flex flex-col absolute z-50 right-0 top-full w-32 rounded-md select-none overflow-hidden ">
				<div onClick={goToProfile} className={elemCLass}>go to profile</div>
				<div className={elemCLass}>settings</div>
				<div onClick={() => action('LOGOUT')} className={elemCLass}>logout</div>
			</div>
		)
	}

	{/* notifications */}
	if (type == 'notification') {
		return (
			<div className="scrollClass absolute z-50 right-0 top-full w-[450px] max-h-[400px] p-5 border border-border rounded-md bg-bg overflow-auto space-y-5">
				<Notification />
				<Notification />
				<Notification />
				<Notification />
			</div>
		)
	}
	
	{/* navigation list */}
	if (type == 'navbar') {
		return (
			<div className="space-y-5 w-[250px absolute z-50 right-0 top-full p-5 bg-bg rounded-lg">
				<SideBarElem onClick={() => navigate('/dashboard')}>Dashboard</SideBarElem>
				<SideBarElem onClick={() => navigate('/chat')}>Chat</SideBarElem>
				<SideBarElem onClick={() => navigate('/settings')}>Settings</SideBarElem>
			</div>
		)
	}
}


const NavBar = ({ className }: {className?: string}) => {
	const {state, dispatch} = useGlobalContext();
	const {state: chatState} = useChatContext();
	const [dropMenu, setDropMenu] = useState(false);
	const dropMenuType = useRef< DropMenuTypes >(null)
	const container = useRef<HTMLDivElement>(null);
	const { pathname } = useLocation();

	useEffect(() => {
		const elem = container.current
		if (chatState.isFocus && window.innerWidth <= 1024) {
			elem?.classList.remove('z-50');
			elem?.classList.add('z-40');
			elem?.classList.add('lg:z-50');
		} else {
			elem?.classList.remove('z-40');
			elem?.classList.remove('lg:z-50');
			elem?.classList.add('z-50');
		}
	}, [chatState.isFocus])

	useEffect(() => {
		setDropMenu(false);
	}, [pathname])

	return (
		<>
			<div
				ref={container} 
				className={twMerge('nav-bar sticky top-0 left-0 h-20 z-40 lg:z-50 shadow-bottom flex justify-between px-10 bg-bg', className)}>
				<div className='h-20 flex items-center'>
					<Link to={'/'}>
						<Logo className="font-medium cursor-pointer" />
					</Link>
				</div>
				<div className="relative flex justify-end items-center gap-5 h-20">
					<FiSearch
						onClick={() => dispatch({type: 'SEARCH'})} 
						className="text-2xl lg:hidden" />
					<div 
						onClick={() => dispatch({type: 'SEARCH'})} 
						className="hidden lg:flex items-center text-gray1 h-10 pl-4 pr-32 rounded-md cursor-pointer border border-border">search</div>
					<div
						onClick={() => {
							dropMenuType.current = 'notification';
							setDropMenu(prev => !prev)
						}} 
						className="relative flex items-center cursor-pointer">
						<FiBell className="text-2xl" />
						<span className="absolute -top-1 right-0 size-3 rounded-full bg-red-500"></span>
					</div>
					<User 
						onClick={() => {
							dropMenuType.current = 'profile';
							setDropMenu(prev => !prev)}
						}
						border 
						className="border-white cursor-pointer size-[30px]" 
						url={state.userData?.profile_image || ''}>
					</User>
					{dropMenu && <DropMenu setDropMenu={setDropMenu} type={dropMenuType.current} />}
					<HiOutlineMenuAlt3
						onClick={() => {
							dropMenuType.current = 'navbar';
							setDropMenu(prev => !prev)}
						}
						className="text-2xl lg:hidden cursor-pointer" />
					{/* Search Modal */}
					<Modal
						className='top-20 translate-y-0 w-11/12 max-w-[600px]'
						isOpen={state.search} 
						onClose={() => dispatch({type: 'SEARCH'})}>
						<SearchUsers />
					</Modal>
					{/* Search Modal */}
					{/* Overlay */}
					{dropMenu && <div
						onClick={() => setDropMenu(false)}
						className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)]" />}
					{/* Overlay */}
				</div>
			</div>
		</>
	)
}

export default NavBar;