import SearchBar from "../../components/SearchBar";
import ConversationsList from "./ChatBar/ConversationsList";
import NavBar from "./ChatBar/NavBar";
import { motion } from 'framer-motion'
import { IoAddCircle } from "react-icons/io5";
import OnlineFriends from "./ChatBar/OnlineFriends";

function ChatBar() {

	return ( 
		<motion.div
			initial={{opacity: 1}}
			exit={{opacity: 1}}
			transition={{duration: 0.5}}
			className="w-full px-5 pt-5 h-full relative flex flex-col z-0 lg:max-w-[400px] lg:border-r lg:border-r-dark">
			<div className="scroll-to-hide flex flex-col gap-5 overflow-auto grow">
				<div className="flex justify-between items-center shrink-0">
					<h1 className="text-xl font-semibold text-primary">Chat</h1>
					<IoAddCircle className="fill-primary text-3xl" />
				</div>
				<div>
					<h2 className="mb-5">online</h2>
					<OnlineFriends />
				</div>
				<div className="lg:max-w-[420px]">
					<h2 className="mb-5">conversations</h2>
					<ConversationsList className="shrink-0" />
				</div>
			</div>
			<NavBar className="lg:hidden w-full py-5 bg-bg border-t border-dark flex items-center justify-between shrink-0" />
		</motion.div>
	);
}

export default ChatBar;