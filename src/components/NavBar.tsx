import { HTMLAttributes, useEffect, useState } from "react";
import NavBarElem from "./NavBarElem";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/store";
import User from "./User";
import useLog from "../hooks/useLog";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import Modal from "./Modal";
import Input from "./Input";
import { FiSearch } from "react-icons/fi";
import SearchUsers from "./SearchUsers";
import { useAuthContext } from "../contexts/authProvider";
// import Notifications from "./Notifications";

interface ArrowType extends HTMLAttributes<HTMLDivElement> {
	left: number
}

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
		<div className="flex flex-col absolute right-0 -translate-y-3 top-full rounded-md select-none overflow-hidden">
			<div onClick={goToProfile} className={elemCLass}>go to profile</div>
			<div className={elemCLass}>settings</div>
			<div onClick={() => action('LOGOUT')} className={elemCLass}>logout</div>
		</div>
	)
}

const Arrow = (props: ArrowType) => {

	return (
		<div {...props} 
			className="cursor-pointer w-[40px] h-[40px] absolute top-0 flex flex-col justify-evenly items-center"
			style={{left: props.left == 0 ? 0 : -20}}
			>
				<IoIosArrowBack 
					className="text-3xl fill-primary duration-300" 
					style={{rotate: props.left == 0 ? '180deg' : '0deg'}}
				/>
		</div>
	)
}

type XPos = 0 | 400;

async function fetchData() {
	const res = await api.get('api/profile/');
	return res;
}

const NavBar = ({className}: {className?: string}) => {
	const {data, isLoading, isError} = useQuery({queryKey: ['profile'], queryFn: fetchData})
	// profile actions
	// profile actions
	const { dispatch: authDispatch } = useAuthContext();
	const {state, dispatch} = useGlobalContext();
	const [profileActions, setProfileActions] = useState(false);
	const [xPos, setXPos] = useState<XPos>(0);
	const [event, setEvent] = useState<any>('auto');
	const [notification, setNotification] = useState(true);

	const clickHandler = async () => {

		if (xPos == 400) {
			setEvent('none');
			setXPos(0);
			await new Promise(r => setTimeout(r, 500));
		} else {
			setXPos(400);
		}
		setEvent('auto');
	}

	useEffect(() => {
		authDispatch({type: 'USERNAME', username: data?.data.username});
	}, [])

	if (isLoading) {
		return (
			<h1>loading...</h1>
		)
	}

	if (isError) {
		return (
			<h1>Error!</h1>
		)
	}

	return (
		<>
			<div className={"relative w-full h-[100px] flex items-center" + (className ? ` ${className}` : '')}>
				<div className="w-full flex justify-end items-center overflow-x-hidden">
					<div
						className="relative flex justify-end duration-300"
						style={{transform: `translateX(${xPos}px)`, pointerEvents: event}}
						> 
						<Arrow onClick={clickHandler} left={xPos} />
						<NavBarElem type="Dashboard" />
						<NavBarElem type="Chat" />
						<NavBarElem onClick={() => setNotification(prev => !prev)} type="Notifications" />
						<NavBarElem onClick={() => dispatch({type: 'SEARCH'})} type="Search" className="cursor-pointer" />
					</div>
					{/* {notification && <Notifications className="w-[530px] absolute h-[400px] top-24 right-0" />} */}
					<div className="w-[42px] h-[42px] bg-bg cursor-pointer flex justify-center items-center z-10">
						<User 
							onClick={() => setProfileActions(prev => !prev)} 
							width={35} 
							border 
							className="border-white cursor-pointer z-10" 
							url={data?.data.profile_image} />
					</div>
				</div>
				{profileActions && <ProfileActions setProfileActions={setProfileActions} />}
			</div>
			{/* Search Modal */}
			<Modal
				className='top-20 translate-y-0 w-11/12 max-w-[600px]'
				isOpen={state.search} 
				onClose={() => dispatch({type: 'SEARCH'})}>
				<SearchUsers />
			</Modal>
			{/* Search Modal */}
		</>
	)
}

export default NavBar;