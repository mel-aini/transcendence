import { AnimatePresence, motion } from "framer-motion";
import AI from "/AI.svg"
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useGlobalContext } from "../../contexts/store";

const timeData: number[] = [3, 5, 7];
const goalsData: number[] = [5, 7, 10];
const difficultyData: string[] = ["easy", "medium", "hard"];

function Chose({type, data}: {type: "min" | "goals" | "difficulty", data: string[] | number[]}) {
	const { state, dispatch } = useGlobalContext();
	const value: number = data.indexOf((type === "min") ? state.AIdata.time : ((type === "goals") ? state.AIdata.goals : state.AIdata.difficulty));

	const clickHandler = (value: number) => {
        if (type === "min")
            dispatch({type: "AI_DATA", AIdata: {...state.AIdata, time: timeData[value]}});
        else if (type === "goals")
            dispatch({type: "AI_DATA", AIdata: {...state.AIdata, goals: goalsData[value]}});
        else if (type === "difficulty")
            dispatch({type: "AI_DATA", AIdata: {...state.AIdata, difficulty: difficultyData[value]}});
	}
// input range
	return (
            <div className="flex flex-col items-center max-w-[344px] w-full h-[50px] bg-transparent gap-2">
				<input className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-border" type="range" min="0" max="2" defaultValue={value} onInput={(e) => clickHandler(e.target.value)} />
				<div className="flex justify-between w-full">
				{
                    data.map((value: string | number, key: number) => {
                        return (
						<span key={key} className="text-sm text-gray-400 select-none">{value + (type !== "difficulty" ? ' ' + type : '')}</span>
					)})
				}
				</div>
            </div>
	);
}

function AIFrom() {
	const navigate = useNavigate();

	const clickHandler = () => {
		navigate("vs-ai/match-making");
	}

	return (
		<div className="flex flex-col gap-8 items-center w-full">
			<div className="relative flex flex-col gap-4 items-center w-full">
				<Chose type="min" data={timeData} />
				<Chose type="goals" data={goalsData} />
				<Chose type="difficulty" data={difficultyData} />
			</div>
			<div onClick={clickHandler} className="w-full flex justify-center">
				<Button className="w-full max-w-[344px]">Start</Button>
			</div>
		</div>
	);
}

const VsAiChoice = ({display, setDisplay}: {display: boolean, setDisplay: Dispatch<SetStateAction<boolean>>}) => {

	return (
		<AnimatePresence>
		{
            display &&
			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{duration: 0.3}}
				exit={{ opacity: 0}}
				className="absolute z-10">
				<div className="fixed top-0 start-0 bg-black opacity-70 w-full min-h-[100vh] px-5" onClick={() => setDisplay(false)}/>
				<motion.div
				initial={{top: 0}}
				animate={{top: "50%"}}
				transition={{duration: 0.1}}
				exit={{ top: 0}}
				className="z-50 fixed bg-secondary max-h-[600px] min-h-[450px] max-w-[521px] w-[90%] h-[90%] border border-border rounded-[10px] left-[50%] -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-5 duration-300 px-5">
					<div onClick={() => setDisplay(false)} className="absolute w-5 h-5 bg-[#DD1B1B] left-full top-[4.25rem] cursor-pointer">
						<span className="absolute w-[13px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[0.5px] rotate-45" />
						<span className="absolute w-[13px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[0.5px] rotate-[135deg]" />
					</div>
					<span className="text-3xl text-center">Vs AI</span>
					<img src={AI} alt="" className="w-[150px] h-[150px]"/>
					<AIFrom />
				</motion.div>
			</motion.div>
		}
		</AnimatePresence>
	);
}

export default VsAiChoice;