import SearchBar from "../../components/SearchBar";
import ConversationsList from "./ChatBar/ConversationsList";
import NavBar from "./ChatBar/NavBar";
import { AnimatePresence, motion } from 'framer-motion'
import { IoAddCircle } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import OnlineFriends from "./ChatBar/OnlineFriends";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import useLog from "../../hooks/useLog";

function ChatBar() {
	const [toggleSearch, setToggleSearch] = useState(false);
	const [toggleMore, setToggleMore] = useState(false);
	const action = useLog();

	return ( 
		<motion.div
			initial={{opacity: 1}}
			exit={{opacity: 1}}
			transition={{duration: 0.5}}
			className="w-full px-5 pt-5 h-full relative flex flex-col z-0 lg:max-w-[400px] lg:border-r lg:border-r-dark">
			<div className="scroll-to-hide flex flex-col overflow-auto grow">
				<div className="flex justify-between items-center pb-10 shrink-0 sticky top-0 left-0 bg-bg">
					<h1 className="text-xl font-semibold text-primary">Chat</h1>
					<div className="relative flex gap-3 items-center">
						<IoAddCircle className="fill-primary text-3xl cursor-pointer" />
						<BsThreeDots onClick={() => setToggleMore(prev => !prev)} className="fill-white text-2xl cursor-pointer" />
						{toggleMore && <div className="absolute top-full right-0 py-2 rounded-md border border-dark bg-bg flex flex-col gap-2">
							<h2 onClick={() => action('LOGOUT')} className="px-10">logout</h2>
						</div>}
					</div>
				</div>
				<div>
					<h2 className="mb-5">online</h2>
					<OnlineFriends />
				</div>
				<div className="lg:max-w-[420px] pt-10">
					<div className="flex justify-between items-center mb-5 relative z-10 bg-bg">
						<h2>conversations</h2>
						<FiSearch onClick={() => setToggleSearch(prev => !prev)} className="text-xl cursor-pointer hover:stroke-primary duration-300" />
					</div>
					<AnimatePresence>
						{toggleSearch &&
							<motion.div
								initial={{marginTop: '-40px', opacity: 0}}
								animate={{marginTop: 0, opacity: 1}}
								exit={{marginTop: '-40px', opacity: 0}}
								transition={{duration: 0.3}}
								className="pb-5"
								>
								<SearchBar />
							</motion.div>
						}
					</AnimatePresence>
					<ConversationsList className="shrink-0" />
				</div>
			</div>
			<NavBar className="lg:hidden w-full py-5 bg-bg border-t border-dark flex items-center justify-between shrink-0" />
		</motion.div>
	);
}

export default ChatBar;