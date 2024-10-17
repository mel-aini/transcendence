import User from "../../../components/User";
import { Levels, usePingPongContext } from "../../../contexts/pingPongProvider";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { primaryColor, secondaryColor } from "../../../utils/colors";
import { useGlobalContext } from "../../../contexts/store";
import useWebSocket from "react-use-websocket";
import Customize_icon from "/Customize_icon.svg"
import { IoIosArrowBack ,IoIosArrowForward } from "react-icons/io";
import CustomizeTab from "../../Settings/CustomizeTab";
import { Section, SectionContent, SectionHeader } from "../../Settings/Index";
import LayoutHeader from "../../../layout/LayoutHeader";
import { useTournamentContext } from "../../../contexts/TournamentProvider";

export const customizeContext = createContext<any>({});

function MatchMaking({isTournament}: {isTournament: boolean}) {
	const {state, dispatch} = isTournament ? useTournamentContext() : usePingPongContext();
	// const {state: tournState} = 
	const {state: profileData} = useGlobalContext();
	const navigate = useNavigate();

	const cancelAction = () => {
		!isTournament && navigate("/ping-pong");
	}

	useEffect(() => {
		if (isTournament && state.level !== Levels.OpponentFound)
			navigate("/tournament", { replace: true });
		else if (isTournament && state.level === Levels.UNINSTANTIATED) {
			navigate("/dashboard", { replace: true });
		}
	}, []);

	useEffect(() => {
		if (state.level === Levels.OpponentFound)
		{	
			if (state.timer <= 3)
			{
				navigate('../play', { replace: true });
			}
		}
	}, [state.level, state.timer]);

	return (
		<>
			<LayoutHeader>Matchmaking</LayoutHeader>
			<div className="space-y-5">
			<div className="w-full flex justify-end mb-5">
				{
					state.level === Levels.OpponentFound ?
					<Loader isTournament={isTournament} />
					:
					( isTournament ? <></> : <span onClick={cancelAction} className="cursor-pointer hover:underline duration-300 select-none">cancel</span> )
				}
			</div>
			<div>
				<div className="flex justify-between items-center sm:flex-row flex-col gap-5 select-none py-4 border border-border rounded-lg px-10">
					<div className="flex items-center gap-5 flex-1 justify-start self-start">
						<User className="size-28 border-primary" border url={profileData.userData?.profile_image} />
						<div>
							<h3>{ isTournament ? state.alias : profileData.userData?.username }</h3>
							<h4>{ 'Lvl ' + profileData.userData?.level.current }</h4>
						</div>
					</div>
					<span>vs</span>
					{state.level === Levels.FindingOpponent &&
						<div className="flex-1 flex justify-end items-center gap-5 self-end">
							<div className="flex flex-col gap-2 items-end">
								<div className="w-20 h-4 bg-gray2 animate-pulse rounded-lg"></div>
								<div className="w-12 h-4 bg-gray2 animate-pulse rounded-lg"></div>
							</div>
							<div className="size-28 rounded-full bg-gray2 animate-pulse"></div>
						</div>
					}
					{state.level === Levels.OpponentFound && 
						<motion.div
							initial={{x: 10, opacity: 0}}
							animate={{x: 0, opacity: 1}}
							transition={{duration: 0.3}}
							className="flex-1 flex justify-end items-center gap-5 self-end"
							>
							<div>
								<h3>{ isTournament ? state.opponentAlias : state.opponent?.username }</h3>
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


function Loader({isTournament}: {isTournament: boolean}) {
	const { state } = isTournament ? useTournamentContext() : usePingPongContext();

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
				duration: state.timer - 3,
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
				{state.timer - 3}
			</div>
		</motion.div>
	)
}

export default MatchMaking;