import { AnimatePresence, Variants, motion } from "framer-motion";
import Input from "../../../components/Input";
import { IoClose } from "react-icons/io5";

const transition = {
	duration: 0.3
}

const variants: Variants = {
	hidden: {
		opacity: 1,
		y: '100%',
		transition: transition
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: transition
	}
}

interface Props {
	isOpen: boolean
	onClose: () => void
}

function SearchFriends({isOpen, onClose}: Props) {
	return (
		<>
			{isOpen && <div 
				onClick={onClose}
				className="absolute z-10 bottom-0 left-0 right-0 top-0 bg-[rgba(0,0,0,0.7)]">
			</div>}
			<AnimatePresence>
				{isOpen && <motion.div 
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={variants}
					className="absolute z-10 bottom-0 left-0 space-y-3 w-full h-[400px] bg-bg border-t border-t-border rounded-xl p-5">
					<div className="flex justify-between items-center">
						<h1 className="text-xl font-medium">Friends</h1>
						<button onClick={onClose} className="size-10 flex justify-center items-center rounded-md self-end">
							<IoClose className="text-3xl fill-border" />
						</button>
					</div>
					<Input type="text" placeholder="search for a friend" className="bg-bg border border-border w-full" />
				</motion.div>}
			</AnimatePresence>
		</>
	);
}

export default SearchFriends;