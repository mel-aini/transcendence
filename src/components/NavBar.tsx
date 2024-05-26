import { HTMLAttributes, useState } from "react";
import NavBarElem from "./NavBarElem";
import { IoIosArrowBack } from "react-icons/io";

interface ArrowType extends HTMLAttributes<HTMLDivElement> {
	left: number
}

const Arrow = (props: ArrowType) => {
	return (
		<div {...props} 
			className="cursor-pointer w-[40px] h-[40px] absolute top-0 flex flex-col justify-evenly items-center"
			style={{left: props.left}}
			>
				{props.left == 15 && <IoIosArrowBack className="text-3xl fill-primary rotate-180" />}
				{props.left != 15 && <IoIosArrowBack className="text-3xl fill-primary" />}
		</div>
	)
}

const NavBar = () => {
	const [xPos, setXPos] = useState<number>(0);
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
		<div className="container h-[100px] w-[95%] max-w-[1200px] mx-auto bg-bg flex justify-end items-center overflow-hidden">
			<div
				className="relative flex justify-end duration-300"
				style={{transform: `translateX(${xPos}px)`, pointerEvents: event}}
			>
				<Arrow onClick={clickHandler} left={xPos == 0 ? 15 : -15} />
				<NavBarElem type="Home" className="translate-x-[84px]" />
				<NavBarElem type="Chat" className="translate-x-[56px]" />
				<NavBarElem type="Notifications" className="translate-x-[28px]" />
				<NavBarElem type="Settings" className="cursor-pointer" />
			</div>
			<div className="w-[40px] h-[40px] bg-bg z-10">
				<div className="w-[40px] h-[40px] rounded-full bg-gray1 z-10"></div>
			</div>
		</div>
	)
}

export default NavBar;