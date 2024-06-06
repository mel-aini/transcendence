import { RiDashboardLine } from "react-icons/ri";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";

interface Props {
	className?: string
}

function NavBar({className}: Props) {
	return ( 
		<div className={className}>
			<div className="hidden lg:flex flex-col gap-8 justify-between">
				<span className="w-[25px] h-[25px] border rounded-full"></span>
				<RiDashboardLine className="text-[25px]" />
				<IoChatbubbleOutline className="text-[25px]" />
				<FiBell className="text-[25px]" />
			</div>
			<>
				<span className="lg:hidden w-[25px] h-[25px] border rounded-full"></span>
				<RiDashboardLine className="lg:hidden text-[25px]" />
				<IoChatbubbleOutline className="lg:hidden text-[25px]" />
				<FiBell className="lg:hidden text-[25px]" />
			</>
			<TbSettings className="text-[25px]" />
		</div>
	);
}

export default NavBar;