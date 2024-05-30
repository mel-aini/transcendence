import { HTMLAttributes, useState } from "react";
import NavBarElem from "./NavBarElem";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/store";

interface ArrowType extends HTMLAttributes<HTMLDivElement> {
	left: number
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

const NavBar = () => {
	const [xPos, setXPos] = useState<XPos>(0);
	const [event, setEvent] = useState<any>('auto');
	const {state, dispatch} = useGlobalContext();
	const navigate = useNavigate();
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

	const goToProfile = () => {
		dispatch({type: 'LOADING', state: true})
		navigate('/profile')
	}

	return (
		<div className="w-full h-[100px] flex justify-end items-center overflow-hidden">
			<div
				className="relative flex justify-end duration-300"
				style={{transform: `translateX(${xPos}px)`, pointerEvents: event}}
			> 
				<Arrow onClick={clickHandler} left={xPos} />
				<NavBarElem type="Home" />
				<NavBarElem type="Chat" />
				<NavBarElem type="Notifications" />
				<NavBarElem type="Settings" className="cursor-pointer" />
			</div>
			<div className="w-[42px] h-[42px] bg-bg z-10">
				<div onClick={goToProfile} className="w-[42px] h-[42px] rounded-full bg-gray1 z-10"></div>
			</div>
		</div>
	)
}

export default NavBar;