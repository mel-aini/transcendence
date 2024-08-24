import { useNavigate } from "react-router-dom";
import Notifications from "../components/Notifications";
import { useGlobalContext } from "../contexts/store";
import { SideBarElem } from "./SideBar";
import useLog from "../hooks/useLog";
import { Variants, motion } from "framer-motion";

export type DropMenuTypes = null | 'profile' | 'notification' | 'navbar';

interface DropMenuProps {
	setDropMenu: any, 
	type: DropMenuTypes
}

const variants: Variants = {
	hidden: {
		opacity: 0,
		y: -10,
		transition: {
			duration: 0.3
		}
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3
		}
	}
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
			<motion.div 
				initial='hidden'
				animate='visible'
				exit='hidden'
				variants={variants}
				className="flex flex-col absolute z-50 right-0 top-full w-32 rounded-md select-none overflow-hidden ">
				<div onClick={goToProfile} className={elemCLass}>go to profile</div>
				<div className={elemCLass}>settings</div>
				<div onClick={() => action('LOGOUT')} className={elemCLass}>logout</div>
			</motion.div>
		)
	}

	{/* notifications */}
	if (type == 'notification') {
		return (
			<motion.div 
				initial='hidden'
				animate='visible'
				exit='hidden'
				variants={variants}
				className="scrollClass absolute z-50 right-0 top-full w-[450px] max-h-[400px] p-5 border border-border rounded-md bg-bg overflow-auto space-y-5">
				<Notifications />
			</motion.div>
		)
	}
	
	{/* navigation list */}
	if (type == 'navbar') {
		return (
			<motion.div 
				initial='hidden'
				animate='visible'
				exit='hidden'
				variants={variants}
				className="space-y-5 w-[250px] absolute z-50 right-0 top-full p-5 bg-bg rounded-lg">
				<SideBarElem onClick={() => navigate('/dashboard')}>Dashboard</SideBarElem>
				<SideBarElem onClick={() => navigate('/chat')}>Chat</SideBarElem>
				<SideBarElem onClick={() => navigate('/settings')}>Settings</SideBarElem>
			</motion.div>
		)
	}
}

export default DropMenu;