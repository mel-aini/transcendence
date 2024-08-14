import { AnimatePresence, motion } from "framer-motion";
import Help from "./Help";
import Ready from "./Ready";
import { useEffect } from "react";
import { usePingPongContext } from "../../../../contexts/pingPongProvider";
import { useTournementContext } from "../../../../contexts/TournementProvider";

import { PiMouseLeftClickFill } from "react-icons/pi";
import { MdTouchApp } from "react-icons/md";

function Box() {
	const { sendJsonMessage, state, dispatch } = usePingPongContext();
	const {sendJsonMessage: sendInTournament} = useTournementContext();

	useEffect(() => {
		const id = setInterval(() => {
			if (state.counter > 0)
				dispatch({type: "COUNTER", counter: state.counter - 1})
		}, 1000);
		if ((state.counter == 0) && (state.status == "ready"))
		{
			state.isTournament ?
			sendInTournament({
				type: "start",
			})
			:
			sendJsonMessage({
				type: "start",
			});
		}
		return () => {
			clearInterval(id)
		}
	}, [state.counter]);

	return (
			(state.counter > 0)
			?
			<>
			{
				(state.status == "ready") ?
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{duration: 0.3}}
					className={`flex flex-col justify-between items-center absolute duration-150 bg-gray3 rounded-[10px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[42%] h-[50%]`}>
					{/* {
						(state.status == "ready") ?
						<Ready counter={state.counter}/>
						:
						<Help />
					} */}
						<Ready counter={state.counter}/>
					<motion.div
					initial={{width: '100%'}}
					animate={{width: '0%'}}
					transition={{duration: state.counter, ease: 'easeOut'}}
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