import SearchBar from "../../components/SearchBar";
import ConversationsList from "./ChatBar/ConversationsList";
import NavBar from "./ChatBar/NavBar";
import { AnimatePresence, motion } from 'framer-motion'
import { IoAddCircle } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import OnlineFriends from "./ChatBar/OnlineFriends";
import { FiSearch } from "react-icons/fi";
import { FormEvent, useRef, useState } from "react";
import useLog from "../../hooks/useLog";
import SearchFriends from "./ChatBar/SearchFriends";
import { useChatContext } from "../../contexts/chatProvider";
import { useAuthContext } from "../../contexts/authProvider";
import { isEmpty } from "../../utils/validation";
import Input from "../../components/Input";

function ChatBar() {
	const [toggleSearch, setToggleSearch] = useState(false);
	const [toggleMore, setToggleMore] = useState(false);
	const [searchFriends, setSearchFriends] = useState(false);
	const action = useLog();
	const { sendJsonMessage } = useChatContext();
	const { state } = useAuthContext();
	
	const inputRef = useRef('');

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (isEmpty(inputRef.current)) return;
		sendJsonMessage({
			user_id: state.user_id,
			type: 'search_conversation',
			search: inputRef.current,
			offset: 0,
			limit: 10
		})
		inputRef.current = '';
	}

	return ( 
		<motion.div
			initial={{opacity: 1}}
			exit={{opacity: 1}}
			transition={{duration: 0.5}}
			className="w-full lg:pr-5 pt-5 h-full relative flex flex-col z-0 lg:max-w-[400px] bg-bg lg:border-r lg:border-r-dark">
			<div className="scroll-to-hide flex flex-col overflow-auto grow">
				{/* Chat header */}
				<div className="flex justify-between items-center pb-10 shrink-0">
					<h1></h1>
					<div className="relative flex gap-3 items-center">
						<IoAddCircle onClick={() => setSearchFriends(true)} className="fill-primary text-3xl cursor-pointer" />
						<BsThreeDots onClick={() => setToggleMore(prev => !prev)} className="fill-white text-2xl cursor-pointer" />
						{toggleMore && <div className="absolute top-full right-0 py-2 rounded-md border border-dark bg-bg flex flex-col gap-2">
							<h2 onClick={() => action('LOGOUT')} className="px-10">logout</h2>
						</div>}
					</div>
				</div>
				{/* online friends */}
				<div>
					<h2 className="mb-5">online</h2>
					<OnlineFriends />
				</div>
				{/* conversations */}
				<div className="lg:max-w-[420px] pt-10">
					<div className="flex justify-between items-center mb-5 relative z-10">
						<h2>conversations</h2>
						<FiSearch onClick={() => setToggleSearch(prev => !prev)} className="text-xl cursor-pointer hover:stroke-primary duration-300" />
					</div>
					<AnimatePresence>
						{toggleSearch &&
							<motion.div
								initial={{marginTop: '-48px', opacity: 0}}
								animate={{marginTop: 0, opacity: 1}}
								exit={{marginTop: '-48px', opacity: 0}}
								transition={{duration: 0.3}}
								className="pb-5"
								>
								<form onSubmit={onSubmit} className="flex justify-between gap-2">
									<Input onChange={(e) => inputRef.current = e.target.value} type="text" placeholder="search" className='w-full bg-transparent border border-border h-[48px] px-3 rounded-md outline-none' />
									<button type="submit" className="shrink-0 size-[48px] flex justify-center items-center border border-border rounded-md">
										<FiSearch />
									</button>
								</form>
							</motion.div>
						}
					</AnimatePresence>
					<ConversationsList className="shrink-0" />
				</div>
				{/* search friends */}
				<SearchFriends isOpen={searchFriends} onClose={() => setSearchFriends(false)} />
			</div>
			{/* <NavBar className="lg:hidden w-full py-5 bg-bg border-t border-dark flex items-center justify-between shrink-0" /> */}
		</motion.div>
	);
}

export default ChatBar;