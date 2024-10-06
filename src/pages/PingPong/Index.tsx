import { ComponentProps, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutHeader from "../../layout/LayoutHeader";
import { useTournamentContext } from "../../contexts/TournamentProvider";
import { ReadyState } from "react-use-websocket";
import { useGlobalContext } from "../../contexts/store";
import { SectionHeader } from "../Settings/Index";
import LocalGameChoise from "./LocalGameChoise";

function Index() {
	const navigate = useNavigate();
	const { readyState } = useTournamentContext();
	const { dispatch: dispatchGlobal } = useGlobalContext();
	const [displayAI, setDisplayAI] = useState<boolean>(false);
	const [displayLocal, setDisplayLocal] = useState<boolean>(false);

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
			<LocalGameChoise display={displayAI} setDisplay={setDisplayAI} isAI={true} />
			<LocalGameChoise display={displayLocal} setDisplay={setDisplayLocal} isAI={false} />
			{/* <LocalGameChoise display={display} setDisplay={setDisplay} /> */}
			{/* <p>Jump into a fast-paced ping pong match and challenge players or the AI. Play solo or with friends, and refine your skills with every match!</p> */}
			{/* <p>search for a friend and invite it in game, search for a friend and invite it in game search for a friend and invite it in game search for a friend and invite it in game hello search for a friend and invite it in game</p> */}
			<div className="space-y-5">
				<SectionHeader
					onClick={() => clickHandler('match-making')}
					>Matchmaking</SectionHeader>
				<SectionHeader
					onClick={() => setDisplayAI(true)}
					>Vs AI</SectionHeader>
				<SectionHeader
					onClick={() => setDisplayLocal(true)}
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