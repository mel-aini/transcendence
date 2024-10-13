import { useEffect } from "react";
import { useChatContext } from "../../contexts/chatProvider";
import ChatBar from "./ChatBar";
import Conversation from "./ChatBar/Conversation";
import { AnimatePresence } from 'framer-motion'

function Index() {
	const { dispatch } = useChatContext();

	useEffect(() => {

		dispatch({type: 'FOCUS', state: window.innerWidth >= 1024})

		const resizeHandler = () => {
			dispatch({type: 'FOCUS', state: window.innerWidth >= 1024})
		}

		window.addEventListener('resize', resizeHandler)
	
		return () => {
			window.removeEventListener('resize', resizeHandler);
		}

	}, [])

	return (
		<div className="relative w-full h-[calc(100vh-10rem)] lg:flex shrink">
			<ChatBar />
			<AnimatePresence>
				<Conversation />
			</AnimatePresence>
		</div>
	)
}

export default Index;