import { HTMLAttributes } from "react";

type ArrivedMsg = "arrive";
type SentMessage = "sent";

interface MessageProps extends HTMLAttributes<HTMLDivElement> {
	children: string
	type: ArrivedMsg | SentMessage,
	date: string
	className?: string
}

const Message = ({type = "arrive", children, date, className, ...props}: MessageProps) => {
	return (
		<div
			className={`max-w-[300px] flex flex-col gap-1 ${type == 'arrive' ? 'self-start' : 'self-end'}` + (className ? (" " + className) : '')}
			{...props}
			>
			<span className={`font-thin text-[10px] ${type == 'arrive' ? 'self-start' : 'self-end'}`}>{date}</span>
			<div
				style={{
					borderRadius: type == "arrive" ? "0 20px 20px 20px" : "20px 0 20px 20px",
				}} 
				className={`${type == 'arrive' ? ' bg-gray2' : 'bg-secondary'} py-[7px] px-5 leading-7 font-normal`}
				>
				{children}
			</div>
		</div>
	)
}

export default Message;