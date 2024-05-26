import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Milliseconds = number;

const Alert = ({children, condition, time}: {children : ReactNode, condition: boolean | null, time: Milliseconds}) => {
	const [visible, setVisible] = useState(false);
	
	useEffect(() => {
		if (condition) {
			setTimeout(() => {
				setVisible(false);
			}, time)
		}
	}, [condition])

	return (
		<AnimatePresence>
			{
				condition && visible &&
				<motion.div 
					initial={{y: -5}}
					animate={{y: 0}}
					exit={{y: -5}}
					transition={{
						ease: 'easeOut',
						duration: 0.6,
					}}
					className="fixed top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-sm py-2 px-4">
					{children}
				</motion.div>
			}
		</AnimatePresence>
	)
}

export default Alert;