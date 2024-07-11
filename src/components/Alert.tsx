import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "../contexts/store";

type Milliseconds = number;

interface Props {
	time?: Milliseconds
}

const Alert = ({ time }: Props) => {
	const {state, dispatch} = useGlobalContext()

	// useEffect(() => {
	// 	if (condition) {
	// 		setTimeout(() => {
	// 			setVisible(false);
	// 		}, time)
	// 	}
	// }, [condition])

	return (
		<AnimatePresence>
			{
				state.alert && 
				<motion.div 
					initial={{y: -5, x: '-50%'}}
					animate={{y: 0, x: '-50%'}}
					exit={{y: -5}}
					transition={{
						ease: 'easeOut',
						duration: 0.3,
					}}
					className="fixed z-50 top-18 left-1/2 bg-secondary border border-border text-primary py-3 px-16 rounded-md">
					{state.alertMessage}
				</motion.div>
			}
		</AnimatePresence>
	)
}

export default Alert;