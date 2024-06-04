import ChatContextProvider, { useChatContext } from "../../contexts/chatStore";
import Conversations from "./Conversations";
import Conversation from "./Conversations/Conversation";
import { AnimatePresence } from 'framer-motion'

function RenderedCom() {
	const {state} = useChatContext();

	return (
		<div className="relative w-full h-[100vh]">
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