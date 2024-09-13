import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import { usePingPongContext } from "../../../../contexts/pingPongProvider";
import UserBox from "./UserBox";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTournamentContext } from "../../../../contexts/TournamentProvider";
import { useGlobalContext } from "../../../../contexts/store";

function Result() {
	const { state, dispatch } = usePingPongContext();
	const { dispatch: dispatchGlobal } = useGlobalContext();
	const navigate = useNavigate();
	const [xp, setXp] = useState<number>(0);
	const { sendJsonMessage } = useTournamentContext();

	const clickHandler = () => {
		// if (window.location.pathname == "/ping-pong/play")
		if (state.isTournament)
		{
			if (state.result.status != "lose" && state.result.status != "eliminated")
				sendJsonMessage({ type: 'qualifyboard' });
			dispatch({ type: 'RESET' });
			navigate("/Tournament");
		}
		else
		{
			dispatchGlobal({ type: 'GAME_ID', gameId: null });
			navigate("/ping-pong");
		}
	}

	useEffect(() => {
		const id = setTimeout(() => {
			if (xp < state.result.xp)
				setXp((prev) => prev + 1);
		}, 10);
		return () => clearTimeout(id);
	}, [xp]);

	return (
		<motion.div className="w-full flex flex-col justify-between items-center"
		initial="hidden"
		animate="visible"
		>
			{
				(state.result.status == "win") && <motion.h1 initial={{opacity: 0, top: '-5rem'}} animate={{opacity: 1, top: '0rem'}} transition={{duration: 0.3}}
				className="relative top-0 text-third text-center text-4xl pb-11 italic font-montserrat">Congratulations, you win</motion.h1>
			}
			{
				(state.result.status == "qualified") && <motion.h1 initial={{opacity: 0, top: '-5rem'}} animate={{opacity: 1, top: '0rem'}} transition={{duration: 0.3}}
				className="relative top-0 text-third text-center text-4xl pb-11 italic font-montserrat">Qualified</motion.h1>
			}
			{
				(state.result.status == "lose") && <motion.h1 initial={{opacity: 0, top: '-5rem'}} animate={{opacity: 1, top: '0rem'}} transition={{duration: 0.3}}
				className="relative top-0 text-[#DD1B1B] text-center text-4xl pb-11 italic font-montserrat">oops, You Lose</motion.h1>
			}
			{
				(state.result.status == "eliminated") && <motion.h1 initial={{opacity: 0, top: '-5rem'}} animate={{opacity: 1, top: '0rem'}} transition={{duration: 0.3}}
				className="relative top-0 text-[#DD1B1B] text-center text-4xl pb-11 italic font-montserrat">Eliminated</motion.h1>
			}
			{
				(state.result.status == "equal") && <motion.h1 initial={{opacity: 0, top: '-5rem'}} animate={{opacity: 1, top: '0rem'}} transition={{duration: 0.3}}
				className="relative top-0 text-gray1 text-center text-4xl pb-11 italic font-montserrat">Null</motion.h1>
			}
			{
				!state.isTournament &&
				<motion.span
				initial={{opacity: 0, top: '-5rem'}}
				animate={{opacity: 1, top: '0rem'}}
				transition={{duration: 0.3, delay: 0.5}}
				className="relative top-0 text-[#FFD214] text-center text-xl pb-11">+{xp} XP</motion.span>
			}
			<motion.span
			initial={{opacity: 0, top: '-5rem'}}
			animate={{opacity: 1, top: '0rem'}}
			transition={{duration: 0.3, delay: 1}}
			className="relative top-0 text-center text-2xl pb-[53px]">Final score:</motion.span>
			<motion.div
			initial={{opacity: 0, top: '-5rem'}}
			animate={{opacity: 1, top: '0rem'}}
			transition={{duration: 0.3, delay: 1.5}}
			className="relative top-0 flex w-full justify-center items-center gap-4 pb-[53px]">
				<UserBox username="user1" level={3} userImage="" />
				<div className={"max-w-[86px] w-full h-[86px] flex justify-center items-center rounded-[10px] border border-border bg-secondary text-[32px] " + ((state.result.status == "win") ? "text-primary" : "")}>
					{state.score.my}
				</div>
				<div className={"max-w-[86px] w-full h-[86px] flex justify-center items-center rounded-[10px] border border-border bg-secondary text-[32px] " + ((state.result.status == "lose") ? "text-primary" : "")}>
					{state.score.side}
				</div>
				<UserBox username="user2" level={10} userImage="" />
			</motion.div>
			<motion.div
			initial={{opacity: 0, top: '-5rem'}}
			animate={{opacity: 1, top: '0rem'}}
			transition={{duration: 0.3, delay: 2}}
			onClick={clickHandler}
			className="relative top-0 max-w-[344px] h-full w-full">
				<Button className="h-full w-full">continue</Button>
			</motion.div>
		</motion.div>
	);
}

export default Result;