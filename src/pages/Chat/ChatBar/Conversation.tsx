import {motion} from 'framer-motion'
import ConversationHeader from "./ConversationHeader";
import { FormEvent, InputHTMLAttributes, MouseEvent, useRef } from "react";
import ConversationMessages from './ConversationMessages';
import { useChatContext } from '../../../contexts/chatStore';

const getDate = () => {
	const date = new Date();

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function Conversation() {
	const { state, dispatch } = useChatContext();
	const message = useRef<string>('');

	const sendMessage = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const newMessage = {
			content: message.current,
			date: getDate()
		}
		dispatch({type: 'MESSAGE', message: newMessage});

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
			{state.conversation_id && <>
				<ConversationHeader />
				<ConversationMessages />
				<form onSubmit={(e) => sendMessage(e)} className="w-full flex justify-between items-center pl-5 h-[50px] border-t border-t-dark bg-bg shrink-0">
					<input className="h-full grow bg-bg focus:outline-none" placeholder="try/silent...🤫" onChange={(e) => message.current = e.target.value} type="text" name="" id="" />
					<button className="shrink-0 px-5 border-l h-full border-l-dark text-primary" type="submit">send</button>
				</form>
			</>}
			{!state.conversation_id &&
				<div className='h-full flex justify-center items-center'>Welcome to chat</div>
			}
		</motion.div>
	);
}

export default Conversation;