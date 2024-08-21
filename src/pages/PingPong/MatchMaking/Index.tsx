import User from "../../../components/User";
import { Levels, usePingPongContext } from "../../../contexts/pingPongProvider";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { primaryColor, secondaryColor } from "../../../utils/colors";
import { useGlobalContext } from "../../../contexts/store";
import useWebSocket from "react-use-websocket";
import Customize_icon from "/Customize_icon.svg"
import { IoIosArrowBack ,IoIosArrowForward } from "react-icons/io";
import CustomizeTab from "./CustomizeTab";
import LayoutHeader from "../../../components/LayoutHeader";

export const customizeContext = createContext<any>({});

interface PlayerBarProps {
	username?: string,
	avatar?: string,
	level?: number,
	unknown?: boolean,
	state: Levels
}

function PlayerBar({username, avatar, level, unknown, state}: PlayerBarProps) {
	const styleClass = !unknown ? ' ' : ' animate-pulse flex justify-center';
	let readyClass = state > Levels.FindingOpponent ? 'opacity-100' : 'opacity-0';
	readyClass += state == Levels.WaitingForOpponent ? ' fill-primary' : '';
	return (
		<div className="grow">
			<div className={"flex justify-center sm:justify-between items-center bg-secondary border border-border rounded-md px-3 sm:px-8 h-[80px] select-none" + styleClass}>
				{
					unknown ?
					<span className="w-full text-center">?</span>
					:
					<>
						<div className="flex items-center gap-3 overflow-hidden">
							<User border className="border-primary" url={avatar} />
							<div className="truncate">{username}</div>
						</div>
						<span className="hidden sm:block">Lvl {level}</span>
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
	const {state: profileData} = useGlobalContext();
	const navigate = useNavigate();
	const avatar_link = 'https://images.unsplash.com/photo-1669937401447-7cfc6e9906e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGdhbWluZyUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D';
	const [customize, setCustomize] = useState<boolean>(false);

	const cancelAction = () => {
		if (window.location.pathname == "/ping-pong/match-making")
		{
			dispatch({type: 'CHLEVEL', level: Levels.FindingOpponent})
			navigate("/ping-pong");
		}
		else if (window.location.pathname == "/tournement/match-making")
		{
			dispatch({type: 'CHLEVEL', level: Levels.FindingOpponent})
			navigate("/tournement");
		}
	}

	const handler = () => {
		if (state.timer > 0)
			dispatch({type: "TIMER", timer: state.timer - 1});
	}

	useEffect(() => {
		if (state.level == Levels.OpponentFound)
		{
			if (window.location.pathname == "/ping-pong/match-making")
			{
				dispatch({type: 'CHLEVEL', level: Levels.FindingOpponent})
				navigate("/ping-pong");
			}
			else if (window.location.pathname == "/tournement/match-making")
			{
				dispatch({type: 'CHLEVEL', level: Levels.FindingOpponent})
				navigate("/tournement");
			}
		}
	}, []);

	useEffect(() => {
		if (state.level >= Levels.OpponentFound)
		{
			const id = setInterval(handler, 1000)
			if (state.timer == 0)
			{
				// dispatch({type: 'CHLEVEL', level: Levels.FindingOpponent})
				navigate('../play');
			}
			return () => {
				clearInterval(id)
			}
		}
	}, [state.level, state.timer]);


	return (
		<customizeContext.Provider value={{customize, setCustomize}}>
			<LayoutHeader>Matchmaking</LayoutHeader>
			<div>
				{
					customize ?
					<CustomizeTab />
					:
					<div>
						<div className="flex flex-col gap-5 justify-between">
							<div className="flex items-center justify-between">
								{/* <h1 className="text-xl font-medium">Matchmaking</h1> */}
								{
									state.level == Levels.OpponentFound &&
									<img onClick={() => setCustomize(true)} src={Customize_icon} alt="customize_icon" />
								}
							</div>
							{/* <Title level={state.level} /> */}
						</div>
						<div className="flex justify-center items-center gap-5 select-none">
							<PlayerBar username={profileData.userData?.username} state={state.level} level={profileData.userData?.level.current} avatar={profileData.userData?.profile_image} />
							<span>vs</span>
							{state.level == Levels.FindingOpponent && <PlayerBar state={state.level} unknown/>}
							{state.level >= Levels.OpponentFound && 
								<motion.div
									initial={{x: 10, opacity: 0}}
									animate={{x: 0, opacity: 1}}
									transition={{duration: 0.3}}
									className="grow"
									>
									<PlayerBar state={state.level} username={state.opponent} level={3} avatar={avatar_link} />
								</motion.div>
							}
						</div>
						<div className="w-full flex justify-between items-center">
							<span onClick={cancelAction} className="cursor-pointer hover:underline duration-300 select-none">cancel</span>
							{ state.level >= Levels.OpponentFound && <Loader /> }
						</div>
					</div>
				}
			</div> 
		</customizeContext.Provider>
	);
}


function Loader() {
	const { state } = usePingPongContext();

	return (
		<motion.div
			initial={{background: `conic-gradient(from 0deg, 
				${primaryColor} 0%, 
				${primaryColor} ${'0%'}, 
				${secondaryColor} ${'0%'}, ${secondaryColor} 100%)`}}
			animate={{background: `conic-gradient(from 0deg, 
				${primaryColor} 0%, 
				${primaryColor} ${'100%'}, 
				${secondaryColor} ${'100%'}, ${secondaryColor} 100%)`}}
			transition={{
				duration: state.timer,
				ease: 'easeOut'
			}}
			className="relative size-[40px] self-center rounded-full sm:shrink-0 flex justify-center items-center"
			style={{
				background: `conic-gradient(from 0deg, 
					${primaryColor} 0%, 
					${primaryColor} ${'100%'}, 
					${secondaryColor} ${'100%'}, ${secondaryColor} 100%)`
				}}
			>
			<div className="size-[30px] text-sm bg-secondary rounded-full flex justify-center items-center">
				{state.timer}
			</div>
		</motion.div>
	)
}

export default MatchMaking;