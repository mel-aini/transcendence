import Message from "../Message";
import {motion} from 'framer-motion'
import ConversationHeader from "./ConversationHeader";
import { FormEvent, InputHTMLAttributes, MouseEvent, useRef } from "react";
import { socket } from "../../../utils/socket";
import { useChatContext } from "../../../contexts/chatStore";

function Conversation() {
	const {state, dispatch} = useChatContext();

	const message = useRef<string>('');

	const sendMessage = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		socket.emit('chat', {
			type: 'send_message',
			user_id: (1).toString(),
			conversation_id: (2).toString(),
			content: message.current,
			date: Date.now(),
			sender: 'mohssine'
		});

		((e.target as HTMLElement).firstChild as InputHTMLAttributes<HTMLInputElement>).value = message.current = '';
	}

	return ( 
		<motion.div 
			initial={{x: '100%'}}
			animate={{x: 0}}
			exit={{x: '100%'}}
			transition={{
				duration: 0.3,
				ease: 'easeInOut'
			}}
			className="w-full h-full flex flex-col absolute top-0 left-0 lg:static z-10">
			<ConversationHeader />
			<div className="grow bg-bg overflow-auto p-5 flex flex-col gap-8">
				{
					state.messages.map((message, index) => {
						return <Message key={index} type="sent" date={message.date} className=" animate-msg">{message.content}</Message>
					})
				}
				{/* <Message type="arrive" date="22:23">nta maghatsalish dak l ui</Message>
				<Message type="sent" date="22:23">chawer 3lia</Message>
				<Message type="arrive" date="22:23">Lorem ipsum dolor sit amet consectetur ipsum dolor ipsum dolor.</Message>
				<Message type="sent" date="22:23">chawer 3lia lorem ipsum dolorsit amet consectetur ipusm</Message>
				<Message type="arrive" date="22:23">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio id vitae est unde nesciunt vel architecto cupiditate deserunt ipsa ullam!</Message>
				<Message type="sent" date="22:23">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, ut!</Message>
				<Message type="arrive" date="22:23">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, ut!</Message>
				<Message type="sent" date="22:23">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, ut!</Message>
				<Message type="arrive" date="22:23">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, ut!</Message>
				<Message type="sent" date="22:23">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, ut!</Message>
				<Message type="arrive" date="22:23">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, ut!</Message>
				<Message type="sent" date="22:23">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, ut!</Message>
				<Message type="sent" date="22:23">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, ut!</Message> */}
			</div>
			<form onSubmit={(e) => sendMessage(e)} className="w-full flex justify-between items-center pl-5 h-[50px] border-t border-t-dark bg-bg shrink-0">
				<input className="h-full grow bg-bg focus:outline-none" placeholder="try/silent...🤫" onChange={(e) => message.current = e.target.value} type="text" name="" id="" />
				<button className="shrink-0 px-5 border-l h-full border-l-dark text-primary" type="submit">send</button>
			</form>
		</motion.div>
	);
}

export default Conversation;