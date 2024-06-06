import { HTMLAttributes } from "react";
import User from "../../../components/User";
import { Data } from "./ConversationsList";

interface Props extends HTMLAttributes<HTMLDivElement> {
	className?: string
	data: Data
}

const ConversationBar = ({className, data, ...props}: Props) => {

	return (
		<div 
			className={"w-full flex justify-between items-center duration-300 cursor-pointer " + (className ? ` ${className}` : '')} 
			{...props}>
			<div className="overflow-hidden shrink flex items-center text-[14px]">
				<User className="shrink-0 mr-2" width={40} url="https://cdn.intra.42.fr/users/310f20caa8f2fff044bda72e14f997ea/ochouikh.jpg" />
				<h3 className="shrink overflow-hidden whitespace-nowrap text-ellipsi font-medium">{data.username}</h3>
				<span className="shrink-0 mr-2">:</span>
				<p 
					className={"shrink overflow-hidden whitespace-nowrap text-ellipsis" + (data.lastMessage.state == 'unread' ? ' font-normal text-primary' : ' font-thin')}>
					{data.lastMessage.value}
				</p>
			</div>
			<span className="text-[14px] font-thin ml-3">{data.lastMessage.date}</span>
		</div>
	);
}

export default ConversationBar;