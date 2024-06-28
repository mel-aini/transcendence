import { AnimatePresence, motion } from "framer-motion";
import Help from "./Help";
import Ready from "./Ready";
import { useEffect } from "react";
import { useGameContext } from "../../../contexts/gameStore";

function Box() {
	const {state, dispatch} = useGameContext();

	useEffect(() => {
		setTimeout(() => {
			if (state.counter > 0)
				dispatch({type: "COUNTER", counter: state.counter - 1})
		}, 1000);
	}, [state.counter]);

	return (
		<>
		{
			(state.counter > 0) &&
			<AnimatePresence>
			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				exit={{ opacity: 0}}
				transition={{duration: 0.3}}
				className={`flex flex-col justify-between items-center absolute duration-150 bg-gray3 rounded-[10px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[95%] ` + (state.status == "ready" ? "md:w-[42%] h-[41%]" : "sm:w-[42%] lg:h-[41%] h-[60%]")}>
				{
					(state.status == "ready") ?
					<Ready counter={state.counter}/>
					:
					<Help />
				}
				<motion.div
				initial={{width: '100%'}}
				animate={{width: '0%'}}
				transition={{duration: state.counter, ease: 'easeOut'}}
				className="self-start h-[2px] w-full bg-primary"></motion.div>
			</motion.div>
			</AnimatePresence>
			}
		</>
	);
}

export default Box;