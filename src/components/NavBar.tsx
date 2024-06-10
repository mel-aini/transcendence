import { HTMLAttributes, useState } from "react";
import NavBarElem from "./NavBarElem";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/store";
import User from "./User";
import useLog from "../hooks/useLog";

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

	return (
		<div className="flex flex-col gap-2 absolute right-0 -translate-y-3 top-full p-3 border border-primary rounded-md bg-bg select-none">
			<div onClick={goToProfile} className="cursor-pointer">go to profile</div>
			<hr className=" opacity-50" />
			<div className="cursor-pointer">settings</div>
			<hr className=" opacity-50" />
			<div onClick={() => action('LOGOUT')} className="cursor-pointer">logout</div>
		</div>
	)
}

const Arrow = (props: ArrowType) => {

	return (
		<div {...props} 
			className="cursor-pointer w-[40px] h-[40px] absolute top-0 flex flex-col justify-evenly items-center"
			style={{left: props.left == 0 ? 0 : -40}}
			>
				<IoIosArrowBack 
					className="text-3xl fill-primary duration-300" 
					style={{rotate: props.left == 0 ? '180deg' : '0deg'}}
				/>
		</div>
	)
}

type XPos = 0 | 400;

const NavBar = ({className}: {className?: string}) => {
	// profile actions
	const [profileActions, setProfileActions] = useState(false);
	// profile actions
	const [xPos, setXPos] = useState<XPos>(400);
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
				<div className="w-[42px] h-[42px] bg-bg cursor-pointer flex justify-center items-center">
					<User onClick={() => setProfileActions(prev => !prev)} width={35} border className="border-white cursor-pointer z-10" url="https://images.unsplash.com/photo-1669937401447-7cfc6e9906e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGdhbWluZyUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" />
				</div>
			</div>
			{profileActions && <ProfileActions setProfileActions={setProfileActions} />}
		</div>
	)
}

export default NavBar;