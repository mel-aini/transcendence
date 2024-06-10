import { HTMLAttributes } from "react";
import User from "../../../components/User";

type State = 'read' | 'unread' | 'sent'

export interface ConversationBarData {
	id: string,
	last_message: string,
	status: State,
	last_date: string,
	sender: string,
	friend: {
		username: string,
		avatar: string,
		online: boolean
	}
}

interface Props extends HTMLAttributes<HTMLDivElement> {
	className?: string
	data: ConversationBarData
}

const ConversationBar = ({className, data, ...props}: Props) => {

	return (
		<div 
			className={"w-full flex justify-between items-center duration-300 cursor-pointer " + (className ? ` ${className}` : '')} 
			{...props}>
			<div className="overflow-hidden shrink flex items-center text-[14px]">
				<User className="shrink-0 mr-2" width={40} url={data.friend.avatar} />
				{data.sender != data.friend.username && <h1 className=" font-light pr-1">to</h1>}
				<h3 className="shrink overflow-hidden whitespace-nowrap text-ellipsi font-medium">{data.friend.username}</h3>
				<span className="shrink-0 mr-2">:</span>
				<p 
					className={"shrink overflow-hidden whitespace-nowrap text-ellipsis" + (data.status == 'unread' ? ' font-normal text-primary' : ' font-thin')}>
					{data.last_message}
				</p>
			</div>
			<span className="text-[14px] font-thin ml-3">{data.last_date}</span>
		</div>
	);
}

export default ConversationBar;