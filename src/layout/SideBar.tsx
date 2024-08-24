import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { useLocation, useNavigate } from "react-router-dom";
import Polygon from "../components/helpers/Polygon";
import Title from "../components/Title";

interface SideBarElemProps extends ComponentProps<'div'> {
	children: string
}

export function SideBarElem({children, ...props}: SideBarElemProps) {
	const { pathname } = useLocation();
	const isActive = pathname == '/' + children.toLocaleLowerCase();

	return ( 
		<div className='relative' {...props} >
			<span className='w-[21px] h-full bg-secondary absolute top-0 left-0 cursor-pointer'></span>
			<Polygon
				className={'flex justify-start bg-secondary ' + (isActive ? 'text-primary' : 'text-white')}
				>
				<Title 
					firstCharClassName={"duration-300 " + (isActive ? 'font-medium text-primary text-2xl' : 'font-normal text-white text-xl')} 
					restWordClassName={"duration-300 " + (isActive ? 'font-medium text-primary text-lg' : 'font-normal text-white text-md')} >
						{children}
				</Title>		
			</Polygon>
		</div>
	);
}


function SideBar({ className }: { className?: string }) {
	const navigate = useNavigate();

	return (
		<>
			<div className={twMerge('w-[245px] shadow-right space-y-5 bg-bg', className)}>
				<SideBarElem onClick={() => navigate('/dashboard')}>Dashboard</SideBarElem>
				<SideBarElem onClick={() => navigate('/chat')}>Chat</SideBarElem>
				<SideBarElem onClick={() => navigate('/settings')}>Settings</SideBarElem>
			</div>
			<div className={twMerge("w-[245px] shadow-right space-y-5 bg-bg fixed top-20 left-0 ", className)}>
				<SideBarElem onClick={() => navigate('/dashboard')}>Dashboard</SideBarElem>
				<SideBarElem onClick={() => navigate('/chat')}>Chat</SideBarElem>
				<SideBarElem onClick={() => navigate('/settings')}>Settings</SideBarElem>
			</div>
		</>
	);
}

export default SideBar;