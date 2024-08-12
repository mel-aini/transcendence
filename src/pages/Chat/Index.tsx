import { FormEvent, useEffect, useState } from "react";
import { useChatContext } from "../../contexts/chatProvider";
import ChatBar from "./ChatBar";
import Conversation from "./ChatBar/Conversation";
import { AnimatePresence } from 'framer-motion'
import NavBar from "./ChatBar/NavBar";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { useAuthContext } from "../../contexts/authProvider";

function Index() {
	const {state, dispatch} = useChatContext();
	// todo: to remove
	// const [isOpen, setIsOpen] = useState(false);
	// const [username, setUsername] = useState('');

	// const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	authDispatch({type: 'USERNAME', username: username})
	// 	setIsOpen(false);
	// }
	//

	useEffect(() => {

		const chatHandler = (data: any) => {
			switch (data.type) {
				case 'message':
					dispatch({type: 'MESSAGE', message: data.message})
					break;
				case 'messages':
					dispatch({type: 'MESSAGES', messages: data.messages})
					break;
				case 'online':
					dispatch({type: 'ONLINE', onlineFriends: data.onlineFriends})
					break;
				case 'conversations':
					dispatch({type: 'CONVERSATIONS', conversations: data.conversations})
					break;
				default:
					break;
			}
		}
		
		dispatch({type: 'FOCUS', state: window.innerWidth >= 1024})

		const resizeHandler = () => {
			dispatch({type: 'FOCUS', state: window.innerWidth >= 1024})
		}

		window.addEventListener('resize', resizeHandler)
		// todo: to remove
			// setIsOpen(true)
		//
		return () => {
			window.removeEventListener('resize', resizeHandler);
		}

	}, [])

	return (
		<div className="relative w-full h-[calc(100vh-10rem)] lg:flex">
			{/* <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<form onSubmit={handleSubmit}>
					<Input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="enter username" />
				</form>
			</Modal> */}
			<ChatBar />
			<AnimatePresence>
				{state.isFocus && <Conversation />}
			</AnimatePresence>
		</div>
	)
}

export default Index;