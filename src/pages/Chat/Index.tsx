import { useEffect } from "react";
import { useChatContext } from "../../contexts/chatStore";
import ChatBar from "./ChatBar";
import Conversation from "./ChatBar/Conversation";
import { AnimatePresence } from 'framer-motion'
import NavBar from "./ChatBar/NavBar";
import { socket } from "../../utils/socket";

function Index() {
	const {state, dispatch} = useChatContext();

	useEffect(() => {
		// for testing
		socket.connect()

		const onConnect = () => {
			console.log('connected');

			socket.emit('chat', { type: 'messages' })

			socket.emit('chat', { type: 'online' })

			socket.emit('chat', { type: 'conversations' })
		}

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
	
		socket.on('connect', onConnect);
		socket.on('chat', chatHandler);
		
		dispatch({type: 'FOCUS', state: window.innerWidth >= 1024})

		const resizeHandler = () => {
			dispatch({type: 'FOCUS', state: window.innerWidth >= 1024})
		}

		window.addEventListener('resize', resizeHandler)

		return () => {
			window.removeEventListener('resize', resizeHandler);
			socket.off('chat', chatHandler)
		}

	}, [])

	return (
		<div className="relative w-full h-[100vh] lg:flex">
			<NavBar className="hidden px-4 py-5 h-full lg:flex flex-col justify-between border-r border-r-dark" />
			<ChatBar />
			<AnimatePresence>
				{state.isFocus && <Conversation />}
			</AnimatePresence>
		</div>
	)
}

export default Index;