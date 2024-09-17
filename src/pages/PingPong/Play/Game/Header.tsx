import pause from "/pause_icon.svg"
import help from "/Help_icon.svg"
import { GiDuration } from "react-icons/gi";
import { usePingPongContext } from "../../../../contexts/pingPongProvider";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTimer } from 'react-timer-hook';
import { useTournamentContext } from "../../../../contexts/TournamentProvider";

const Goal = () => {
	const {state} = usePingPongContext();
	const [goal, setGoal] = useState<string>('');

	useEffect(() => {
		setTimeout(() => {
			setGoal("");
		}, 1000);
		setGoal("Goooooooooooal!");
	}, [state.score.my]);

	return (
			<motion.span
				className="w-full col-start-1 col-end-4 row-start-1 lg:col-start-2 lg:col-end-3 flex justify-center items-center"
				>
					<AnimatePresence>
				{
					(goal != "") &&
						<motion.span
							initial={{top: "1.5rem", opacity: 0}}
							animate={{top: "0rem", opacity: 1}}
							transition={{duration: 0.1}}
							exit={{top: "1.5rem", opacity: 0}}
							className="relative top-6 w-full text-primary text-center text-base">
							{goal}
						</motion.span>
				}
					</AnimatePresence>
			</motion.span>
	)
}

const timeConverter = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	// console.log(minutes, seconds);
	const finalSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
	const finalMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
	return { finalMinutes, finalSeconds }
}

const Header = () => {
	const {state, dispatch} = usePingPongContext();
	const { finalMinutes, finalSeconds } = timeConverter(state.time);

	const clickHandler = () => {
		if (state.counter > 0)
			return ;
		dispatch({type: "STATUS", status: "help"});
		dispatch({type: "COUNTER", counter: 2});
	}

	useEffect(() => {
		
		
	}, []);

	return (
		<div className="w-full gap-1 items-center grid grid-cols-3 grid-rows-2 lg:grid-rows-1">
			<div className="flex col-start-1 col-end-2 ">
				<div className={"flex gap-1 " + ((state.directions.my == "right") ? "flex-row-reverse" : "flex-row")}>
					<div className="relative bg-secondary w-[40px] h-[40px] shrink-0">
						<div className="absolute w-[2px] top-full -translate-y-full bg-primary" style={{height: `${state.score.my * 10}%`}}/>
						<span className="absolute inline-flex items-center justify-center text-primary w-full h-full">{state.score.my}</span>
					</div>
					<div className="relative bg-secondary w-[40px] h-[40px] shrink-0">
						<div className="absolute w-[2px] top-full -translate-y-full bg-white" style={{height: `${state.score.side * 10}%`}}/>
						<span className="absolute inline-flex items-center justify-center w-full h-full">{state.score.side}</span>
					</div>
					<div className="bg-secondary lg:w-full lg:max-w-[133px] h-[40px] flex md:justify-start justify-center items-center px-2 shrink-0 sm:shrink">
						<img src={state.opponent?.profile_image} alt="" className="w-[26px] h-[26px] border rounded-full overflow-hidden shrink-0"/>
						<span className="shrink truncate text-xs hidden sm:block pl-3">{state.isTournament ? state.alias : state.opponent?.username}</span>
					</div>
				</div>
			</div>
			<Goal />
			<div className="flex gap-1 shrink-0 justify-self-end col-start-3 col-end-4">
				{/* <div className="bg-secondary w-[40px] h-[40px] flex justify-center items-center">
					<img src={pause} alt="pause" />
				</div> */}
				{
					!state.isTournament &&
					<div className="bg-secondary px-1 h-[40px] w-[61px] flex justify-center items-center">
						<span className="w-[44px]">
							{finalMinutes}
							:
							{finalSeconds}
						</span>
					</div>
				}
				<div onClick={clickHandler} className="bg-secondary w-[40px] h-[40px] flex justify-center items-center">
					<img src={help} alt="help" />
				</div>
			</div>
		</div>
	)
}

export default Header;