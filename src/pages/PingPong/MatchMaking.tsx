import User from "../../components/User";
import { Levels, usePingPongContext } from "../../contexts/pingPongStore";
import NewButton from "../../components/NewButton";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface PlayerBarProps {
	username?: string,
	avatar?: string,
	level?: string,
	unknown?: boolean
}

function PlayerBar({username, avatar, level, unknown}: PlayerBarProps) {
	const styleClass = !unknown ? ' sm:w-[300px]' : ' w-[80px] animate-pulse';
	return ( 
		<div className={"flex justify-between items-center bg-secondary border border-border rounded-md px-3 sm:px-8 h-[80px] select-none" + styleClass}>
			{
				unknown && <span>?</span>
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
				className="text-2xl font-medium animate-pulse mb-10">Finding opponent...</motion.h1>}
			{level == Levels.OpponentFound && <motion.h1
				initial="hidden"
				animate="visible"
				variants={TitleVariants}
				transition={{duration: 0.3}}
				className="text-2xl font-medium mb-10">opponent <span className="text-primary">found</span>, confirm to start</motion.h1>}
			{level == Levels.WaitingForOpponent && <motion.h1 
				initial="hidden"
				animate="visible"
				variants={TitleVariants}
				transition={{duration: 0.3}}
				className="text-2xl font-medium mb-10 animate-pulse">waiting for your opponent to confirm...</motion.h1>}
		</div>
	);
}

function MatchMaking() {
	const {state, dispatch} = usePingPongContext();
	const avatar_link = 'https://images.unsplash.com/photo-1669937401447-7cfc6e9906e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGdhbWluZyUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D';
	
	useEffect(() => {
		if (state.level == Levels.FindingOpponent) {
			setTimeout(() => {
				dispatch({type: 'CHLEVEL', level: Levels.OpponentFound})
			}, 1000)
		}
	}, [])

	return ( 
		<div className="grow flex justify-center items-center">
			<div className="flex flex-col items-center justify-start h-[420px]">
				<Title level={state.level} />
				<div className="mb-10 flex justify-center items-center gap-5">
					<PlayerBar username="user1" level="2" avatar={avatar_link} />
					<span>vs</span>
					{state.level == Levels.FindingOpponent && <PlayerBar unknown/>}
					{state.level >= Levels.OpponentFound && 
						<motion.div
							initial={{x: 10, opacity: 0}}
							animate={{x: 0, opacity: 1}}
							transition={{duration: 0.3}}
							>
							<PlayerBar username="user2" level="3" avatar={avatar_link} />
						</motion.div>
					}
				</div>
				<span 
					className="cursor-pointer hover:underline duration-300 mb-5 select-none"
					onClick={() => dispatch({type: 'CHLEVEL', level: Levels.ChoiseGameType})}>
					cancel
				</span>
				{state.level == Levels.OpponentFound && 
					<NewButton 
						onClick={() => dispatch({type: 'CHLEVEL', level: Levels.WaitingForOpponent})} 
						className="w-full max-w-[250px] max-h-[42px] h-full">
							confirm
					</NewButton>}
			</div>
		</div> 
	);
}

export default MatchMaking;