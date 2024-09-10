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
import CustomizeTab from "../../Settings/CustomizeTab";
import { Section, SectionContent, SectionHeader } from "../../Settings/Index";
import LayoutHeader from "../../../layout/LayoutHeader";

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

	const cancelAction = () => {
		// if (window.location.pathname == "/ping-pong/match-making")
		// {
		// 	dispatch({type: 'CHLEVEL', level: Levels.FindingOpponent})
		// 	navigate("/ping-pong");
		// }
		// else if (window.location.pathname == "/Tournament/match-making")
		// {
		// 	dispatch({type: 'CHLEVEL', level: Levels.FindingOpponent})
		// 	navigate("/Tournament");
		// }
		if (state.isTournament)
		{
			dispatch({type: 'CHLEVEL', level: Levels.FindingOpponent});
			navigate("/Tournament");
		}
		else
		{
			// dispatch({type: 'CHLEVEL', level: Levels.FindingOpponent});
			navigate("/ping-pong");
		}
	}

	const handler = () => {
		if (state.timer > 0)
			dispatch({type: "TIMER", timer: state.timer - 1});
	}

	useEffect(() => {
		if (state.isTournament && state.level != Levels.OpponentFound)
			navigate("/Tournament");
	}, []);

	useEffect(() => {
		if (state.level >= Levels.OpponentFound)
		{
			const id = setInterval(handler, 1000)
			if (state.timer == 0)
			{
				// dispatch({type: 'CHLEVEL', level: Levels.FindingOpponent})
				navigate('../play', { replace: true });
			}
			return () => {
				clearInterval(id)
			}
		}
	}, [state.level, state.timer]);


	return (
		<>
			<LayoutHeader>Matchmaking</LayoutHeader>
			<div className="space-y-5">
			<div className="w-full flex justify-end mb-5">
				<span onClick={cancelAction} className="cursor-pointer hover:underline duration-300 select-none">cancel</span>
				{ state.level >= Levels.OpponentFound && <Loader /> }
			</div>
			<div>
				<div className="flex justify-between items-center gap-5 select-none h-44 border border-border rounded-lg px-10">
					<div className="flex items-center gap-5 flex-1 justify-start">
						<User className="size-28 border-primary" border url={profileData.userData?.profile_image} />
						<div>
							<h3>{profileData.userData?.username || 'mel-aini'}</h3>
							<h4>{'Lvl ' + profileData.userData?.level.current || 'Lvl 5'}</h4>
						</div>
					</div>
					{/* <PlayerBar username={profileData.userData?.username} state={state.level} level={profileData.userData?.level.current} avatar={profileData.userData?.profile_image} /> */}
					<span>vs</span>
					{state.level == Levels.FindingOpponent &&
						<div className="flex-1 flex justify-end items-center gap-5">
							<div className="flex flex-col gap-2 items-end">
								<div className="w-20 h-4 bg-gray2 animate-pulse rounded-lg"></div>
								<div className="w-12 h-4 bg-gray2 animate-pulse rounded-lg"></div>
							</div>
							<div className="size-28 rounded-full bg-gray2 animate-pulse"></div>
						</div>
					}
					{state.level >= Levels.OpponentFound && 
						<motion.div
							initial={{x: 10, opacity: 0}}
							animate={{x: 0, opacity: 1}}
							transition={{duration: 0.3}}
							className="flex-1 flex justify-end items-center gap-5"
							>
							<div>
								<h3>{ state.opponent?.username }</h3>
								<h4>{ 'Lvl ' + state.opponent?.level.current }</h4>
							</div>
							<User className="size-28 border-primary" border url={state.opponent?.profile_image} />
						</motion.div>
					}
				</div>
			</div>
			<Section activated={true}>
				<SectionHeader>Display Settings</SectionHeader>
				{true && 
					<SectionContent>
						<CustomizeTab />
					</SectionContent>}
			</Section>
			</div>
		</>
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