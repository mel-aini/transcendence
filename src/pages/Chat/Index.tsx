import { useEffect } from "react";
import ChatContextProvider, { useChatContext } from "../../contexts/chatStore";
import Conversations from "./Conversations";
import Conversation from "./Conversations/Conversation";
import { AnimatePresence } from 'framer-motion'

function RenderedCom() {
	const {state, dispatch} = useChatContext();

	useEffect(() => {
		if (window.innerWidth >= 640) {
			dispatch({type: 'FOCUS', state: true})
		}
	}, [])

	return (
		<div className="relative w-full h-[100vh] sm:flex">
			<Conversations />
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