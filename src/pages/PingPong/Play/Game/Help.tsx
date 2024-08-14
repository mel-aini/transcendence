import { FaMobileAlt } from "react-icons/fa";
import { MdComputer } from "react-icons/md"; 
import { PiMouseLeftClickFill } from "react-icons/pi";
import { MdTouchApp } from "react-icons/md";
import { TbArrowsMoveVertical } from "react-icons/tb";
import { motion } from "framer-motion";


const Help = () => {
	return (
		<motion.div
		initial={{opacity: 0}}
		animate={{opacity: 1}}
		exit={{ opacity: 0}}
		transition={{duration: 0.3}}
		className="absolute w-full flex justify-around items-center duration-150 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
			<MdTouchApp className="md:text-7xl text-4xl" fill="#ffffff33" />
			<PiMouseLeftClickFill className="md:text-7xl text-4xl" fill="#ffffff33" />
		</motion.div>
	)
}

export default Help;
{/* <div className="w-full h-full p-3 flex flex-col justify-center items-center gap-1 sm:gap-3">
	<span className="text-primary font-semibold text-center text-base">How to play?</span>
	<div className="w-full flex justify-center items-center duration-150">
		<MdTouchApp className="text-4xl" />
		<span>or</span>
		<PiMouseLeftClickFill className="text-4xl" />
	</div>
</div> */}