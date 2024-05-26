import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/store";
import { AnimatePresence, motion } from "framer-motion"

const Loading = () => {
	const { state } = useGlobalContext();

	return (
			<AnimatePresence>
				{ state.isLoading && 
					<motion.div
						initial={{ x: '-100%' }}
						animate={{ x: '-75%' }}
						transition={{
							ease: 'easeIn',
							duration: 0.3,
						}}
						exit={{ x: '0' }}
						className="fixed top-0 w-[100vw] h-1 bg-primary">
					</motion.div> }
			</AnimatePresence>
	)
}

export default Loading;