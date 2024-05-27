import { useNavigate } from 'react-router-dom';
import homeIcon from '/home.svg'
import chatIcon from '/message.svg'
import notificationIcon from '/notification.svg'
import settingsIcon from '/settings.svg'
import { HTMLAttributes } from 'react';
import Polygon from './Polygon';

interface NavBarElemProps extends HTMLAttributes<HTMLDivElement> {
	className?: string,
	type: 'Home' | 'Chat' | 'Notifications' | 'Settings' | 'Empty',
}

const NavBarElem = ( {className, type, ...props }: NavBarElemProps) => {
	const navigate = useNavigate();
	let marginRight: number = 0;
	let renderedIcon;
	let txMultiplicator: number = 15;
	let index: number = 1;
	let routeToNavigate: string;

	switch (type) {
		case 'Home':
			index = 3;
			routeToNavigate = '/';
			renderedIcon = homeIcon
			marginRight = -60;
			break;
		case 'Chat':
			index = 2;
			routeToNavigate = '/chat';
			renderedIcon = chatIcon;
			marginRight = -51;
			break;
		case 'Settings':
			index = 0;
			routeToNavigate = '/settings';
			renderedIcon = settingsIcon;
			marginRight = -77;
			break;
		case 'Notifications':
			index = 1;
			renderedIcon = notificationIcon;
			marginRight = -113;
			break;
		default:
			break;
	}

	const navigateTo = (route: string) => {
		navigate(route);
	}

	const clickHandler = () => {
		if (routeToNavigate != '') {
			navigateTo(routeToNavigate)
		}
	}

	return (
			<Polygon 
				onClick={clickHandler} 
				className={'group bg-black gap-4 duration-300 select-none'}
				style={{transform: `translateX(${txMultiplicator * index}px)`}}
				{...props}
				>
				<div className='flex gap-3 w-full'>
					<img src={renderedIcon} alt="" />
					<h1 className={`pointer-events-none opacity-0 group-hover:opacity-100 duration-300 text-primary font-medium group-hover:mr-0 mr-[${marginRight}px]`}>{type}</h1>
				</div>
			</Polygon>
	)
}

export default NavBarElem;