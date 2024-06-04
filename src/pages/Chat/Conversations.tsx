import SearchBar from "../../components/SearchBar";
import ConversationsList from "./Conversations/ConversationsList";
import NavBar from "./Conversations/NavBar";
import { motion } from 'framer-motion'
function Conversations() {

	return ( 
		<motion.div
			initial={{opacity: 1}}
			exit={{opacity: 1}}
			transition={{duration: 0.5}}
			className="w-full pt-5 h-full relative flex flex-col z-0">
			<div className="scroll-to-hide flex flex-col overflow-auto grow">
				<div className="px-5 flex flex-col shrink-0">
					<h1 className="mb-5">Conversations</h1>
					<SearchBar className="shrink-0" />
					<h1 className="mt-8 text-center shrink-0">1 message not read</h1>
				</div>
				<ConversationsList className="shrink-0" />
			</div>
			<NavBar className="shrink-0" />
		</motion.div>
	);
}

export default Conversations;