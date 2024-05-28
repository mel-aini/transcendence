import { useNavigate } from 'react-router-dom';
import homeIcon from '/home.svg'
import chatIcon from '/message.svg'
import notificationIcon from '/notification.svg'
import settingsIcon from '/settings.svg'
import { HTMLAttributes } from 'react';
import Polygon from './Polygon';
import { useGlobalContext } from '../contexts/store';

interface NavBarElemProps extends HTMLAttributes<HTMLDivElement> {
	className?: string,
	type: 'Home' | 'Chat' | 'Notifications' | 'Settings' | 'Empty',
}

const NavBarElem = ( {className, type, ...props }: NavBarElemProps) => {
	const {dispatch} = useGlobalContext();
	const navigate = useNavigate();
	let marginRight: string = ' ';
	let renderedIcon;
	let txMultiplicator: number = 15;
	let index: number = 1;
	let routeToNavigate: string;

	switch (type) {
		case 'Home':
			index = 3;
			routeToNavigate = '/dashboard';
			renderedIcon = homeIcon
			marginRight += 'mr-[-60px]';
			break;
		case 'Chat':
			index = 2;
			routeToNavigate = '/chat';
			renderedIcon = chatIcon;
			marginRight += 'mr-[-51px]';
			break;
		case 'Settings':
			index = 0;
			routeToNavigate = '/settings';
			renderedIcon = settingsIcon;
			marginRight += 'mr-[-77px]';
			break;
		case 'Notifications':
			index = 1;
			renderedIcon = notificationIcon;
			marginRight += 'mr-[-113px]';
			break;
		default:
			break;
	}

	const navigateTo = (route: string) => {
		dispatch({type: 'LOADING'})
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
					<h1 className={`pointer-events-none opacity-0 group-hover:opacity-100 duration-300 text-primary font-medium group-hover:mr-0` + marginRight}>{type}</h1>
				</div>
			</Polygon>
	)
}

export default NavBarElem;