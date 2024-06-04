import { HTMLAttributes } from "react";
import User from "../../../components/User";
import { Data } from "./ConversationsList";

interface Props extends HTMLAttributes<HTMLDivElement> {
	className?: string
	isFocus?: boolean
	data: Data
}

const ConversationBar = ({className, isFocus, data, ...props}: Props) => {
	const isFocusCss = isFocus ? 'bg-[#0D7377]' : 'bg-bg hover:bg-gray2';

	return (
		<div 
			className={"relative w-full flex justify-between h-[70px] items-center duration-300 cursor-pointer " + isFocusCss + (className ? ` ${className}` : '')} 
			{...props}>
			<div className="flex gap-4 shrink overflow-hidden">
				<User className="shrink-0" width={50} url="https://cdn.intra.42.fr/users/310f20caa8f2fff044bda72e14f997ea/ochouikh.jpg" />
				<div className="flex flex-col shrink overflow-hidden">
					<span className="shrink overflow-hidden whitespace-nowrap text-ellipsis">{data.username}</span>
					<span 
						className={"shrink overflow-hidden whitespace-nowrap text-ellipsis text-[12px]" + (data.lastMessage.state == 'unread' ? ' font-medium' : '')}>
						{data.lastMessage.value}
					</span>
				</div>
			</div>
			<div className="flex flex-col items-center gap-2 text-sm font-extralight">
				<span>{data.lastMessage.date}</span>
				<span className={"w-2 h-2 bg-green-500 rounded-xl" + (data.lastMessage.state == 'unread' ? '' : ' opacity-0')}></span>
			</div>
			<div className=" absolute bottom-0 w-full h-[1px] px-[66px] opacity-50">
				<div className="bg-white h-full"></div>
			</div>
		</div>
	);
}

export default ConversationBar;