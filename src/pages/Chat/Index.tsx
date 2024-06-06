import { useEffect } from "react";
import ChatContextProvider, { useChatContext } from "../../contexts/chatStore";
import ChatBar from "./ChatBar";
import Conversation from "./ChatBar/Conversation";
import { AnimatePresence } from 'framer-motion'
import NavBar from "./ChatBar/NavBar";
import { socket } from "../../utils/socket";

function RenderedCom() {
	const {state, dispatch} = useChatContext();

	useEffect(() => {
		// for testing
		socket.connect()
		const onConvs = (messages: any) => {
			console.log(messages);
		}
		socket.on('conversation', onConvs)
		// for testing
		dispatch({type: 'FOCUS', state: window.innerWidth >= 1024})

		const resizeHandler = () => {
			dispatch({type: 'FOCUS', state: window.innerWidth >= 1024})
		}

		window.addEventListener('resize', resizeHandler)
		return () => {
			window.removeEventListener('resize', resizeHandler);
			socket.off('conversations', onConvs)
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

function Index() {
	return (
		<ChatContextProvider>
			<RenderedCom />
		</ChatContextProvider>
	);
}

export default Index;