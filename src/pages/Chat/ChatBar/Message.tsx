import { HTMLAttributes } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdError } from "react-icons/md";

type ArrivedMsg = "arrive";
type SentMessage = "sent";

interface MessageProps extends HTMLAttributes<HTMLDivElement> {
	children: string
	type: ArrivedMsg | SentMessage,
	date: string
	className?: string
	state?: 'processing' | 'ok' | 'error'
}

const Message = ({type = "arrive", children, date, className, state, ...props}: MessageProps) => {
	return (
		<div
			className={`max-w-[70%] xl:max-w-[600px] 2xl:max-w-[800px] flex flex-col gap-1 ${type == 'arrive' ? 'self-start' : 'self-end'}` + (className ? (" " + className) : '')}
			{...props}
			>
			<div className={`flex items-center gap-2 font-extralight text-[12px] ${type == 'arrive' ? 'self-start' : 'self-end'}`}>
				{state == 'processing' && <AiOutlineLoading3Quarters className="animate-spin" /> }
				{state == 'error' && <MdError className="fill-red-600" /> }
				<span>{date}</span>
			</div>
			<div
				className={`font-normal bg-bg rounded-xl p-5 ${type == 'arrive' ? ' text-white text-left rounded-tl-none' : 'text-primary text-right rounded-tr-none'}`}
				>{children}</div>
		</div>
	)
}

export default Message;