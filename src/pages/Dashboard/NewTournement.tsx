import { AnimatePresence, motion } from "framer-motion";
import trophy from "/trophy.svg"
import NewButton from "../../components/NewButton";
import { useContext } from "react";
import { displayContext } from "./Tournements";

function TournementFrom() {
	return (
		<div className="flex flex-col gap-8 items-center w-full">
			<div className="flex flex-col gap-4 items-center w-full">
				<input type="text" placeholder="Tournement title" className="border border-border rounded-md max-w-[344px] w-full h-[50px] px-4 bg-transparent focus:border-primary outline-none duration-200" />
				<input type="text" placeholder="nickname" className="border border-border rounded-md max-w-[344px] w-full h-[50px] px-4 bg-transparent focus:border-primary outline-none duration-200" />
			</div>
			<div className="w-full flex justify-center">
				<NewButton className="h-[52px] w-full max-w-[344px]">Start</NewButton>
			</div>
		</div>
	);
}

function NewTournement() {
	const display = useContext(displayContext);

	return (
		<AnimatePresence>
		{
			display.display &&
			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{duration: 0.3}}
				exit={{ opacity: 0}}
				className="absolute z-10">
				<div className="fixed top-0 start-0 bg-black opacity-70 w-full min-h-[100vh] px-5" onClick={() => display.setDisplay(false)}/>
				<motion.div
				initial={{top: 0}}
				animate={{top: "50%"}}
				transition={{duration: 0.1}}
				exit={{ top: 0}}
				className="z-50 fixed bg-secondary max-h-[600px] min-h-[450px] max-w-[521px] w-[90%] h-[90%] border border-border rounded-[10px] left-[50%] -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-5 duration-300 px-5">
					<div onClick={() => display.setDisplay(false)} className="absolute w-5 h-5 bg-[#DD1B1B] left-full top-[4.25rem] cursor-pointer">
						<span className="absolute w-[13px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[0.5px] rotate-45" />
						<span className="absolute w-[13px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[0.5px] rotate-[135deg]" />
					</div>
					<img src={trophy} alt="" className="w-[150px] h-[150px]"/>
					<span className="text-2xl text-center">New Tournement</span>
					<TournementFrom />
				</motion.div>
			</motion.div>
		}
		</AnimatePresence>
	);
}

export default NewTournement;