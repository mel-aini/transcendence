import help from "/Help_icon.svg"
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGlobalContext } from "../../../../contexts/store";

interface Props {
	rightScore: number,
	leftScore: number,
	minutes: number,
	seconds: number,
	counter: number,
	setCounter: Dispatch<SetStateAction<number>>,
	status: "ready" | "help",
	setStatus: Dispatch<SetStateAction<"ready" | "help">>,
	isAI: boolean,
}

const Goal = ({rightScore, leftScore}: {rightScore: number, leftScore: number}) => {
	const [goal, setGoal] = useState<string>('');

	useEffect(() => {
		if (rightScore !== 0 || leftScore !== 0)
		{
			setTimeout(() => {
				setGoal("");
			}, 1000);
			setGoal("Goooooooooooal!");
		}
	}, [rightScore, leftScore]);

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

const Header = (props: Props) => {
	const { state } = useGlobalContext();

	const clickHandler = () => {
		if (props.counter > 0)
			return ;
		props.setStatus("help");
		props.setCounter(2);
	}

	return (
		<div className="w-full gap-1 items-center grid grid-cols-3 grid-rows-2 lg:grid-rows-1">
			<div className="flex col-start-1 col-end-2 ">
				<div className={"flex gap-1"}>
					<div className="relative bg-secondary w-[40px] h-[40px] shrink-0">
						<div className="absolute w-[2px] top-full -translate-y-full bg-white" style={{height: `${props.leftScore * 100 / state.localGameData.goals}%`}}/>
						<span className="absolute inline-flex items-center justify-center w-full h-full">{props.leftScore}</span>
					</div>
					<div className="relative bg-secondary w-[40px] h-[40px] shrink-0">
						<div className={"absolute w-[2px] top-full -translate-y-full " + (props.isAI ? 'bg-primary' : 'bg-white')} style={{height: `${props.rightScore * 100 / state.localGameData.goals}%`}}/>
						<span className={"absolute inline-flex items-center justify-center w-full h-full " + (props.isAI ? 'text-primary' : '')}>{props.rightScore}</span>
					</div>
				</div>
			</div>
			<Goal rightScore={props.rightScore} leftScore={props.leftScore} />
			<div className="flex gap-1 shrink-0 justify-self-end col-start-3 col-end-4">
				<div className="bg-secondary px-1 h-[40px] w-[61px] flex justify-center items-center">
					<span className="w-[44px]">
						{String(props.minutes).padStart(2, '0')}
						:
						{String(props.seconds).padStart(2, '0')}
					</span>
				</div>
				<div onClick={clickHandler} className="bg-secondary w-[40px] h-[40px] flex justify-center items-center">
					<img src={help} alt="help" />
				</div>
			</div>
		</div>
	)
}

export default Header;