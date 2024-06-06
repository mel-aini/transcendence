import { useEffect } from "react";
import ChatContextProvider, { useChatContext } from "../../contexts/chatStore";
import ChatBar from "./ChatBar";
import Conversation from "./ChatBar/Conversation";
import { AnimatePresence } from 'framer-motion'
import NavBar from "./ChatBar/NavBar";

function RenderedCom() {
	const {state, dispatch} = useChatContext();

	useEffect(() => {
		dispatch({type: 'FOCUS', state: window.innerWidth >= 1024})

		window.addEventListener('resize' ,() => {
			dispatch({type: 'FOCUS', state: window.innerWidth >= 1024})
		})
		
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