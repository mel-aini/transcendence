import {motion} from 'framer-motion'
import ConversationHeader from "./ConversationHeader";
import { FormEvent, InputHTMLAttributes, MouseEvent, useRef, useState } from "react";
import ConversationMessages from './ConversationMessages';
import { useChatContext } from '../../../contexts/chatProvider';
import { useAuthContext } from '../../../contexts/authProvider';
import { ReadyState } from 'react-use-websocket';

interface Imessage {
	content : string
	date :  string
	id? :  number
	receiver :  string
	sender : string
}

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
	const { state, dispatch, sendJsonMessage, readyState } = useChatContext();
	const [message, setMessage] = useState('');
	const { state: authState } = useAuthContext();
	const sendMessage = async (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const message_content = message;
		setMessage('');
		((e.target as HTMLElement).firstChild as InputHTMLAttributes<HTMLInputElement>).value = '';
		// const newMessage: Imessage = {
		// 	content: message.current,
		// 	date: getDate(),
		// 	receiver: 'salam',
		// 	sender: 'user1'
		// }
		console.log('trying to send message...');
		const ServerMessage = {
			id: state.conversation_id,
			type: 'send_message',
			message: message_content,
			sender: authState.username,
			receiver: authState.username == 'user1' ? 'user2' : 'user1',
		}

		dispatch({type: 'LAST_MESSAGE', message: {
			content: message_content,
			date: "2024-06-27 12:58:51",
			sender: authState.username,
			receiver: authState.username == 'user1' ? 'user2' : 'user1',
			id: null,
			state: 'processing'
		}});
		
		setTimeout(() => {
			if (readyState == ReadyState.OPEN) {
				sendJsonMessage(ServerMessage);
			}
			if (readyState != ReadyState.OPEN) {
				dispatch({type: 'LAST_MESSAGE', message: null});
			
				// if error
				dispatch({type: 'MESSAGE', message: {
					content: message_content,
					date: "2024-06-27 12:58:51",
					sender: authState.username,
					receiver: authState.username == 'user1' ? 'user2' : 'user1',
					id: null,
					state: 'error'
				}});
			}
		}, 300)
		// // simulate request processing
		// await new Promise(r => setTimeout(r, 1000));

		// // remove message after response come
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
			className="w-full h-full flex flex-col absolute top-0 left-0 lg:static z-10 bg-secondary">
			{state.conversation_id && <>
				<ConversationHeader />
				<ConversationMessages />
				<form onSubmit={(e) => sendMessage(e)} className="w-full flex justify-between items-center pl-5 h-[50px] border-t border-t-dark bg-bg shrink-0">
					<input
						disabled={state.lastMessage?.state == 'processing'} 
						className="h-full grow bg-bg focus:outline-none" 
						placeholder={state.lastMessage == null ? "try/silent...🤫" : 'sending...'} 
						onChange={(e) => setMessage(e.target.value)} 
						type="text" name="" id="" />
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