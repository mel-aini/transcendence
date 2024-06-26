import User from "../../../components/User";
import { Levels, PingPongStateProps, usePingPongContext } from "../../../contexts/pingPongStore";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";

interface PlayerBarProps {
	username?: string,
	avatar?: string,
	level?: string,
	unknown?: boolean,
	state: Levels
}

function PlayerBar({username, avatar, level, unknown, state}: PlayerBarProps) {
	const styleClass = !unknown ? ' sm:w-[300px]' : ' sm:w-[300px] animate-pulse flex justify-center';
	let readyClass = state > Levels.FindingOpponent ? 'opacity-100' : 'opacity-0';
	readyClass += state == Levels.WaitingForOpponent ? ' fill-primary' : '';
	return (
		<div>
			<div className={"flex justify-end items-center gap-2 text-sm mb-2" + ` ${readyClass}`}>
				<span className="opacity-50">ready</span>
				<CiCircleCheck />
			</div>
			<div className={"flex justify-between items-center bg-secondary border border-border rounded-md px-3 sm:px-8 h-[80px] select-none" + styleClass}>
				{
					unknown && <span className="w-full text-center">?</span>
				}
				{username && avatar && level &&
				<>
					<div className="flex items-center gap-3">
						<User border className="border-primary" url={avatar} />
						<div>{username}</div>
					</div>
					<span>Lvl {level}</span>
				</>
				}
			</div>
		</div>
	 );
}

const TitleVariants = {
	visible: { y: 0, opacity: 1},
	hidden: {y: -10, opacity: 0}
  }

function Title({level}: {level: Levels}) {

	return ( 
		<div
			>
			{level == Levels.FindingOpponent && <motion.h1 
				initial="hidden"
				animate="visible"
				variants={TitleVariants}
				transition={{duration: 0.3}}
				className="font-light animate-pulse">Finding opponent...</motion.h1>}
			{level == Levels.OpponentFound && <motion.h1
				initial="hidden"
				animate="visible"
				variants={TitleVariants}
				transition={{duration: 0.3}}
				className="font-light">your game is scheduled, please confirm to start</motion.h1>}
			{level == Levels.OpponentIsReady && <motion.h1
				initial="hidden"
				animate="visible"
				variants={TitleVariants}
				transition={{duration: 0.3}}
				className="font-light">your opponent is <span className="text-primary">ready</span>, confirm to start</motion.h1>}
			{level == Levels.WaitingForOpponent && <motion.h1 
				initial="hidden"
				animate="visible"
				variants={TitleVariants}
				transition={{duration: 0.3}}
				className="font-light animate-pulse">waiting for your opponent to confirm...</motion.h1>}
		</div>
	);
}

function MatchMaking() {
	const {state, dispatch} = usePingPongContext();
	const navigate = useNavigate();
	const avatar_link = 'https://images.unsplash.com/photo-1669937401447-7cfc6e9906e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGdhbWluZyUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D';
	
	useEffect(() => {
		if (state.level == Levels.FindingOpponent) {
			setTimeout(() => {
				dispatch({type: 'CHLEVEL', level: Levels.OpponentFound})
			}, 3000)
		}
	}, [])

	const cancelAction = () => {
		dispatch({type: 'CHLEVEL', level: Levels.FindingOpponent})
		navigate('/ping-pong')
	}
	return ( 
		<div className="min-h-[90vh] flex justify-center items-center">
			<div className="flex flex-col bg-secondary border border-border rounded-md p-10 gap-14">
				<div>
					<h1 className="text-xl mb-5 font-medium">Matchmaking</h1>
					<Title level={state.level} />
				</div>
				<div className="flex justify-center items-center gap-5 select-none">
					<PlayerBar username="user1" state={state.level} level="2" avatar={avatar_link} />
					<span>vs</span>
					{state.level == Levels.FindingOpponent && <PlayerBar state={state.level} unknown/>}
					{state.level >= Levels.OpponentFound && 
						<motion.div
							initial={{x: 10, opacity: 0}}
							animate={{x: 0, opacity: 1}}
							transition={{duration: 0.3}}
							>
							<PlayerBar state={state.level} username="user2" level="3" avatar={avatar_link} />
						</motion.div>
					}
				</div>
				<div className="w-full flex justify-between">
					<span onClick={cancelAction} className="cursor-pointer hover:underline duration-300 select-none">cancel</span>
					<span
						className={"text-primary duration-300 select-none" + (state.level == Levels.OpponentFound ? ' hover:underline cursor-pointer' : ' cursor-default opacity-50' )}
						onClick={() => {
							if (state.level != Levels.OpponentFound) return;
							dispatch({type: 'CHLEVEL', level: Levels.WaitingForOpponent});
						}}>
							confirm
					</span>
				</div>
			</div>
		</div> 
	);
}

export default MatchMaking;