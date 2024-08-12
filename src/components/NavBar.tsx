import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function ProfileActions({setProfileActions}: {setProfileActions: any}) {
	const {dispatch} = useGlobalContext();
	const navigate = useNavigate();
	const action = useLog();

	const goToProfile = () => {
		setProfileActions(false)
		dispatch({type: 'LOADING', state: true})
		navigate('/profile')
	}

	const elemCLass = 'cursor-pointer bg-secondary hover:bg-slate-800 duration-300 p-3'

	return (
		<div className="flex flex-col absolute right-0 -translate-y-3 top-16 w-32 rounded-md select-none overflow-hidden ">
			<div onClick={goToProfile} className={elemCLass}>go to profile</div>
			<div className={elemCLass}>settings</div>
			<div onClick={() => action('LOGOUT')} className={elemCLass}>logout</div>
		</div>
	)
}


const NavBar = ({ className }: {className?: string}) => {
	const {state, dispatch} = useGlobalContext();
	const [profileActions, setProfileActions] = useState(false);
	const [notification, setNotification] = useState(true);

	return (
		<>
			<div className={twMerge('sticky top-0 left-0 h-20 flex justify-between px-10 bg-bg', className)}>
				<h1 className='h-20 flex items-center'>logo</h1>
				<div className="flex justify-end items-center gap-5 h-20">
					<FiSearch
						onClick={() => dispatch({type: 'SEARCH'})} 
						className="text-2xl lg:hidden" />
					<div 
						onClick={() => dispatch({type: 'SEARCH'})} 
						className="hidden lg:flex items-center text-gray1 h-10 pl-4 pr-32 rounded-md cursor-pointer border border-border">search</div>
					<div className="relative flex items-center cursor-pointer">
						<FiBell className="text-2xl" />
						<span className="absolute -top-1 right-0 size-3 rounded-full bg-red-500"></span>
					</div>
					<User 
						onClick={() => setProfileActions(prev => !prev)} 
						width={35} 
						border 
						className="border-white cursor-pointer z-10 relative" 
						url={state.userData?.profile_image || ''}>
							{profileActions && <ProfileActions setProfileActions={setProfileActions} />}
					</User>
					<HiOutlineMenuAlt3 className="text-2xl lg:hidden" />
					{/* Search Modal */}
					<Modal
						className='top-20 translate-y-0 w-11/12 max-w-[600px]'
						isOpen={state.search} 
						onClose={() => dispatch({type: 'SEARCH'})}>
						<SearchUsers />
					</Modal>
					{/* Search Modal */}
				</div>
			</div>
		</>
	)
}

export default NavBar;