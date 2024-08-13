import { ComponentProps, ReactNode } from "react";
import Polygon from "./Polygon";
import { twMerge } from "tailwind-merge";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SideBarElemProps extends ComponentProps<'div'> {
	children: string
}

function SideBarElem({children, ...props}: SideBarElemProps) {
	const { pathname } = useLocation();
	const isActive = pathname == '/' + children.toLocaleLowerCase();

	return ( 
		<div className='relative' {...props} >
			<span className='w-[21px] h-full bg-secondary absolute top-0 left-0 cursor-pointer'></span>
			<Polygon 
				className={'flex justify-start font-medium text-lg uppercase italic bg-secondary ' + (isActive ? 'text-primary' : 'text-white')}
				>
					{children}</Polygon>
		</div>
	);
}


function SideBar({ className }: { className?: string }) {
	const navigate = useNavigate();

	return (
		<div className={twMerge("space-y-5", className)}>
			<SideBarElem onClick={() => navigate('/dashboard')}>Dashboard</SideBarElem>
			<SideBarElem onClick={() => navigate('/chat')}>Chat</SideBarElem>
			<SideBarElem>Settings</SideBarElem>
		</div>
	);
}

export default SideBar;