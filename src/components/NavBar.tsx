import { useEffect, useState } from "react";
import NavBarElem from "./NavBarElem";

const NavBar = () => {
	const [right, setRight] = useState<number>(-470);
	const [event, setEvent] = useState<any>('auto');

	const clickHandler = async () => {

		if (right == -470) {
			setEvent('none');
			setRight(-112);
			await new Promise(r => setTimeout(r, 400));
		} else {
			setRight(-470);
		}
		setEvent('auto');
	
	}

	useEffect(() => {
		// console.log(right);
	}, [right])

	return (
		<div
			className="flex justify-end duration-300"
			style={{position: "fixed", top: 0, right: right, pointerEvents: event}}
			>
			<NavBarElem 
				type="Empty" 
				onClick={clickHandler}
			/>
			<NavBarElem type="Home" className="translate-x-[-28px]" />
			<NavBarElem type="Chat" className="translate-x-[-56px]" />
			<NavBarElem type="Notifications" className="translate-x-[-84px]" />
			<NavBarElem
				type="Settings" 
				className="translate-x-[-112px] cursor-pointer"
			/>
		</div>
	)
}

export default NavBar;