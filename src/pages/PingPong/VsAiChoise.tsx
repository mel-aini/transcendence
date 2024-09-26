import { AnimatePresence, motion } from "framer-motion";
import AI from "/AI.svg"
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useGlobalContext } from "../../contexts/store";
import Modal from "../../components/Modal";

const timeData: number[] = [3, 5, 7];
const goalsData: number[] = [5, 7, 10];
const difficultyData: string[] = ["easy", "medium", "hard"];

function Chose({type, data}: {type: "min" | "goals" | "difficulty", data: string[] | number[]}) {
	const { state, dispatch } = useGlobalContext();
	const index: number = data.indexOf((type === "min") ? state.AIdata.time : ((type === "goals") ? state.AIdata.goals : state.AIdata.difficulty));

	const clickHandler = (e: any) => {
		const value = e.target.value;
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
				<input className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-border" type="range" min="0" max="2" defaultValue={index} onInput={(e) => clickHandler(e)} />
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
		<Modal isOpen={display} onClose={() => setDisplay(false)}>
			<AnimatePresence>
			{
				display &&
					<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{duration: 0.3}}
					exit={{ opacity: 0}}
					className="bg-secondary max-w-[521px] w-[90vw] rounded-md flex flex-col justify-center items-center gap-5 p-10">
						<span className="text-3xl text-center">Vs AI</span>
						<img src={AI} alt="" className="w-[150px] h-[150px]"/>
						<AIFrom />
					</motion.div>
			}
			</AnimatePresence>
		</Modal>
	);
}

export default VsAiChoice;