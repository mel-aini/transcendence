import { useNavigate } from 'react-router-dom';
import homeIcon from '/home.svg'
import chatIcon from '/message.svg'
import notificationIcon from '/notification.svg'
import settingsIcon from '/settings.svg'
import { HTMLAttributes } from 'react';
import { FaBarsStaggered } from "react-icons/fa6";

interface NavBarElemProps extends HTMLAttributes<HTMLDivElement> {
	className?: string,
	type: 'Home' | 'Chat' | 'Notifications' | 'Settings' | 'Empty',
}

const NavBarElem = ( {className, type, ...props }: NavBarElemProps) => {

	let divClass = 'group bg-black h-[40px] w-[50px] hover:w-[100px] cursor-pointer flex justify-start items-center px-3 gap-3 duration-300'
	let svgFill = 'fill-black';

	function getIcon() {
		switch (type) {
			case 'Home':
				return homeIcon
			case 'Chat':
				return chatIcon
			case 'Notifications':
				divClass = 'group bg-black h-[40px] w-[50px] hover:w-[160px] cursor-pointer flex justify-start items-center px-3 gap-3 duration-300'
				return notificationIcon
			case 'Settings':
				divClass = 'group bg-black h-[40px] w-[50px] hover:w-[120px] cursor-pointer flex justify-start items-center px-3 gap-3 duration-300'
				return settingsIcon
			case 'Empty':
				svgFill = 'fill-white';
				return homeIcon;
			default:
				break;
		}
	}

	const renderedIcon = getIcon();
	const navigate = useNavigate();

	const clickHandler = () => {
		switch (type) {
			case 'Home':
				navigate('/');
				break;
			case 'Chat':
				navigate('/chat');
				break;
			case 'Settings':
				navigate('/settings');
				break;
			default:
				break;
		}
	}

	return (
		<div
			className={"flex items-center select-none duration-300" + (className ? (" " + className) : '')} 
			{...props}
			>
			<div className="flex items-center h-[40px] duration-300">
				<svg width={30} height={40} viewBox="0 0 30 40">
					<polygon onClick={clickHandler} points="30,0  30,0  30,40  0,40" className={"cursor-pointer " + svgFill} />
				</svg>
				{ type != 'Empty' && <div onClick={clickHandler} className={divClass}>
					<img src={renderedIcon} alt="" />
					<h1 className="pointer-events-none opacity-0 group-hover:opacity-100 duration-300">{type}</h1>
				</div> }
				{ 
					type == 'Empty' && 
					<div
						className='h-[40px] w-[50px] bg-white flex justify-center items-center cursor-pointer'
						>
						{/* <img src={renderedIcon} alt="" /> */}
						<FaBarsStaggered fill='black' size={20} />
					</div>
				}
				<svg width={30} height={40} viewBox="0 0 30 40" className="rotate-180">
					<polygon onClick={clickHandler} points="30,0  30,0  30,40  0,40" className={"cursor-pointer " + svgFill} />
				</svg>
			</div>
		</div>
	);
}

export default NavBarElem;