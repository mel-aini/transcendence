import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "../contexts/store";
import { useLocation, useNavigate } from "react-router-dom";

const Alert = () => {
	const { state, dispatch } = useGlobalContext()
	const [isVisbile, setIsVisible] = useState(true)
	const navigate = useNavigate()
	const location = useLocation();

	useEffect(() => {
		if (state.alert) {
			setTimeout(() => {
				setIsVisible(false);
				dispatch({type: 'ALERT', display: false})
				navigate(location.pathname, {state: null})
			}, 1300)
		}
	}, [state.alert])

	return (
		<AnimatePresence>
			{
				state.alert && isVisbile &&
				<motion.div 
					initial={{y: -10, opacity: 0}}
					animate={{y: 0, opacity: 1}}
					exit={{y: 10, opacity: 0}}
					transition={{
						ease: 'easeInOut',
						duration: 0.3,
					}}
					className="hhhhhh relative z-50">
						<div className="fixed w-11/12 top-24 left-1/2 bg-secondary border border-border text-primary text-center py-3 px-3 sm:px-8 md:px-16 rounded-md sm:w-auto -translate-x-1/2">
							{state.alertMessage}
						</div>
				</motion.div>
			}
		</AnimatePresence>
	)
}

export default Alert;