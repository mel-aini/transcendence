import { useEffect, useRef } from "react";
import Box from "./Box";
import { usePingPongContext } from "@/contexts/pingPongProvider";
import { useTournamentContext } from "@/contexts/TournamentProvider";
import { useGlobalContext } from "@/contexts/store";

// width = 1.6 * height

const Table = ({isTournament}: {isTournament: boolean}) => {
	const myPaddle = useRef<HTMLDivElement>(null);
	const sidePaddle = useRef<HTMLDivElement>(null);
	const move = useRef<-1 | 0 | 1>(0);
	const table = useRef<HTMLDivElement>(null);
	const { state: profileState } = useGlobalContext();
	// const { state, sendJsonMessage } = usePingPongContext();
	// const {sendJsonMessage: sendInTournament} = useTournamentContext();
	const { state, sendJsonMessage } = isTournament ? useTournamentContext() : usePingPongContext();

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp' || e.key === 'w') {
			move.current = -1;
		}
		if (e.key === 'ArrowDown' || e.key === 's') {
			move.current = 1;
		}
	}

	const handleKeyUp = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'ArrowDown' || e.key === 's')
			move.current = 0;
	}

	useEffect(() => {
		const interval = setInterval(() => {
			if (move.current === 0) return ;
			sendJsonMessage({
				type: "update",
				y: move.current,
			});
		}, 50);

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
			clearInterval(interval);
		}
	}, [])

	return (
		<div ref={table} className="select-none relative w-full aspect-video">
			<div className="absolute first-table-half w-[68.69%] h-full border rounded-l-[10px] border-border" style={{ backgroundColor: profileState.userData?.game_settings.background + "1a" }} />
			<div className="absolute second-table-half w-[68.69%] h-full border rounded-l-[10px] rotate-180 left-full -translate-x-full border-border" style={{ backgroundColor: profileState.userData?.game_settings.background + "1a" }} />

			<div ref={myPaddle} className="h-1/5 absolute -translate-y-1/2 rounded-full w-[3%]" style={{backgroundColor: profileState.userData?.game_settings.paddle, top: `${state.myPaddleData.y}%`, left: `${state.myPaddleData.x}%`}}/>

			<div ref={sidePaddle} className="h-1/5 absolute -translate-y-1/2 rounded-full w-[3%]" style={{backgroundColor: profileState.userData?.game_settings.paddle, top: `${state.sidePaddleData.y}%`, left: `${state.sidePaddleData.x}%`}}/>

			<div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full w-[3%] aspect-square" style={{backgroundColor: profileState.userData?.game_settings.ball, top: `${state.ballData.y}%`, left: `${state.ballData.x}%`}} />

			<svg className="absolute w-[37.38%] h-full left-1/2 -translate-x-1/2">
				<line x1={'100%'} x2={'0%'} y1={'0%'} y2={'100%'} className="stroke-1 stroke-border2" />
			</svg>
			<Box isTournament={isTournament}/>
		</div>
	)
}

export default Table;
// state.userData?.game_settings.paddle
// state.userData?.game_settings.background