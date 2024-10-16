import { motion } from "framer-motion";
import Help from "./Help";
import Ready from "./Ready";
import { usePingPongContext } from "../../../../contexts/pingPongProvider";

function Box() {
	const { state } = usePingPongContext();

	return (
			(state.timer >= 0)
			?
			<>
			{
				(state.status == "ready") ?
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{duration: 0.3}}
					className={`flex flex-col justify-between items-center absolute duration-150 bg-gray3 rounded-[10px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[42%] h-[50%]`}>
					<Ready counter={state.timer}/>
					<motion.div
					initial={{width: '100%'}}
					animate={{width: '0%'}}
					transition={{duration: state.timer, ease: 'easeOut'}}
					className="self-start h-[2px] w-full bg-primary" />
				</motion.div>
				:
				<Help />
			}
			</>
			:
			<>
			</>
	);
}

export default Box;