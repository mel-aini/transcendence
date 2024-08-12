import {AnimatePresence, motion} from 'framer-motion'
import ConversationHeader from "./ConversationHeader";
import { FormEvent, InputHTMLAttributes, MouseEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import ConversationMessages from './ConversationMessages';
import { useChatContext } from '../../../contexts/chatProvider';
import { useAuthContext } from '../../../contexts/authProvider';
import { ReadyState } from 'react-use-websocket';
import { isEmpty } from '../../../utils/validation';

interface Imessage {
	content : string
	date :  string
	id? :  number
	receiver :  string
	sender : string
}

function Conversation() {
	const { state, dispatch, sendJsonMessage, readyState } = useChatContext();
	const [message, setMessage] = useState('');
	const { state: authState } = useAuthContext();
	const [isVisible, setIsVisible] = useState(() => window.innerWidth >= 1024);

	const sendMessage = async (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (isEmpty(message)) {
			return;
		}
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
			id: state.conversation.id,
			type: 'send_message',
			message: message_content,
			sender: authState.username,
			receiver: state.conversation_header.username,
		}

		dispatch({type: 'LAST_MESSAGE', message: {
			content: message_content,
			date: "2024-06-27 12:58:51",
			sender: authState.username,
			receiver: state.conversation_header.username,
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
					receiver: state.conversation_header.username,
					id: null,
					state: 'error'
				}});
			}
		}, 300)
	}

	useLayoutEffect(() => {
		dispatch({type: 'FOCUS', state: window.innerWidth >= 1024})

		const resizeHandler = () => {
			dispatch({type: 'FOCUS', state: false})
		}

		window.addEventListener('resize', resizeHandler)
		// todo: to remove
			// setIsOpen(true)
		//
		return () => {
			window.removeEventListener('resize', resizeHandler);
		}
	}, [])

	useLayoutEffect(() => {
		if (state.isFocus) {
			setIsVisible(true);
		} else {
			if (window.innerWidth >= 1024) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		}
	}, [state.isFocus])

	return ( 
		<AnimatePresence>
			{isVisible && 
			<motion.div
				initial={{x: '100%'}}
				animate={{x: 0}}
				exit={{x: '100%'}}
				transition={{
					duration: 0.3,
					ease: 'easeInOut'
				}}
				className="w-full h-full flex flex-col fixed top-0 left-0 lg:static z-10 bg-secondary">
				{!state.conversation.state &&
					<div className='h-full flex justify-center items-center'>Welcome to chat</div>
				}
				{state.conversation.state && <>
					<ConversationHeader />
					<div className="messages-container grow flex flex-col bg-secondary overflow-auto p-5">
						<ConversationMessages />
					</div>
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
			</motion.div>}
		</AnimatePresence>
	);
}

export default Conversation;