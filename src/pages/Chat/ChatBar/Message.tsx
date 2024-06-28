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
			className={`w-full sm:max-w-[400px] md:max-w-[60%] flex flex-col gap-1 ${type == 'arrive' ? 'self-start' : 'self-end'}` + (className ? (" " + className) : '')}
			{...props}
			>
			<span className={`font-thin text-[10px] ${type == 'arrive' ? 'self-start' : 'self-end'}`}>{date}</span>
			<p
				className={`font-normal ${type == 'arrive' ? ' text-white text-left' : 'text-primary text-right'}`}
				>{children}</p>
		</div>
	)
}

export default Message;