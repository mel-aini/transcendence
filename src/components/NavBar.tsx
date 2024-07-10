import { HTMLAttributes, useEffect, useState } from "react";
import NavBarElem from "./NavBarElem";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/store";
import User from "./User";
import useLog from "../hooks/useLog";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";

const PROFILE_URL = "https://images.unsplash.com/photo-1669937401447-7cfc6e9906e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGdhbWluZyUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"

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
	const [profileActions, setProfileActions] = useState(false);
	// profile actions
	const [xPos, setXPos] = useState<XPos>(0);
	const [event, setEvent] = useState<any>('auto');

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

	if (isLoading) {
		return (
			<h1>loading...</h1>
		)
	}

	return (
		<div className={"relative w-full h-[100px] flex items-center" + (className ? ` ${className}` : '')}>
			<div className="w-full flex justify-end items-center overflow-hidden">
				<div
					className="relative flex justify-end duration-300"
					style={{transform: `translateX(${xPos}px)`, pointerEvents: event}}
				> 
					<Arrow onClick={clickHandler} left={xPos} />
					<NavBarElem type="Dashboard" />
					<NavBarElem type="Chat" />
					<NavBarElem type="Notifications" />
					<NavBarElem type="Settings" className="cursor-pointer" />
				</div>
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
	)
}

export default NavBar;