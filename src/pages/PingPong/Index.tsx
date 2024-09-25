import { ComponentProps, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutHeader from "../../layout/LayoutHeader";
import { useTournamentContext } from "../../contexts/TournamentProvider";
import { ReadyState } from "react-use-websocket";
import { useGlobalContext } from "../../contexts/store";
import { SectionHeader } from "../Settings/Index";
import VsAiChoice from "./VsAiChoise";

interface Props extends ComponentProps<'div'> {
	className?: string,
	title: string,
	description: string
}

function PlayChoise({className, title, description, ...props}: Props) {
	return ( 
		<div 
			className={"bg-secondary h-[370px] rounded-md cursor-pointer" + (className ? ` ${className}` : '')}
			{...props}
			>
			<div className="rounded-md border border-border w-full h-full bg-gradient flex flex-col justify-between p-5">
				<h1 className="text-3xl font-medium">{title}</h1>
				<p className="font-extralight">{description}</p>
			</div>
		</div>
	);
}

function Index() {
	const navigate = useNavigate();
	const { readyState } = useTournamentContext();
	const { dispatch: dispatchGlobal } = useGlobalContext();
	const [display, setDisplay] = useState<boolean>(false);

	const clickHandler = (route: string) => {
		if (readyState != ReadyState.OPEN)
		{
			dispatchGlobal({ type: 'GAME_ID', gameId: null });
			navigate(route);
		}
	}

	return (
		<div className="w-full">
			<LayoutHeader>Ping Pong</LayoutHeader>
			<VsAiChoice display={display} setDisplay={setDisplay} />
			{/* <p>Jump into a fast-paced ping pong match and challenge players or the AI. Play solo or with friends, and refine your skills with every match!</p> */}
			{/* <p>search for a friend and invite it in game, search for a friend and invite it in game search for a friend and invite it in game search for a friend and invite it in game hello search for a friend and invite it in game</p> */}
			<div className="space-y-5">
				<SectionHeader
					onClick={() => clickHandler('match-making')}
					>Matchmaking</SectionHeader>
				<SectionHeader
					onClick={() => setDisplay(true)}
					>Vs AI</SectionHeader>
				<SectionHeader
					onClick={() => clickHandler('1vs1')}
					>1 vs 1</SectionHeader>
				<SectionHeader
					onClick={() => clickHandler('vs-friend')}
					>Vs Friend</SectionHeader>
			</div>
			{/* <div className="grid gap-5 grid-cols-1 lg:grid-cols-6">
				<PlayChoise
					onClick={() => clickHandler('match-making')}
					title="Matchmaking" 
					description="Lorem ipsum dolor sit amet consectetur. Interdum maecenas quis porttitor nunc et habitant vestibulum risus facilisis." 
					className="lg:col-start-1 lg:col-end-5"/>
				<PlayChoise 
					onClick={() => setDisplay(true)}
					title="Vs AI" 
					description="Lorem ipsum dolor sit amet consectetur. Interdum maecenas quis porttito."
					className="lg:col-start-5 lg:col-end-7" />
				<PlayChoise 
					onClick={() => clickHandler('1vs1')}
					title="1 vs 1" 
					description="Lorem ipsum dolor sit amet consectetur. Interdum maecenas quis porttito." 
					className="lg:col-start-1 lg:col-end-3" />
				<PlayChoise
					onClick={() => clickHandler('vs-friend')}
					title="Vs Friend" 
					description="Lorem ipsum dolor sit amet consectetur. Interdum maecenas quis porttitor nunc et habitant vestibulum risus facilisis." 
					className="lg:col-start-3 lg:col-end-7" />
			</div>  */}
		</div>
	);
}

export default Index;