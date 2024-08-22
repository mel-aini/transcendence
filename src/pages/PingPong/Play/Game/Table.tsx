import { useEffect, useRef, useState } from "react";
import Box from "./Box";
import { Levels, usePingPongContext } from "../../../../contexts/pingPongProvider";
import { useNavigate } from "react-router-dom";
import { useTournamentContext } from "../../../../contexts/TournamentProvider";

// width = 1.6 * height

const Table = ({width}: {width: number}) => {
	const myPaddle = useRef<HTMLDivElement>(null);
	const sidePaddle = useRef<HTMLDivElement>(null);
	const table = useRef<HTMLDivElement>(null);
	const { sendJsonMessage, state } = usePingPongContext();
	const {sendJsonMessage: sendInTournament} = useTournamentContext();
	const navigate = useNavigate();

	const movePaddle = (e: any) => {
		const tableDim: any = table.current;
		let newPos: number = ((e.clientY - tableDim.getBoundingClientRect().top) / tableDim.getBoundingClientRect().height) * 100;

		newPos = (newPos < 10) ? 10 : newPos;
		newPos = (newPos > 90) ? 90 : newPos;
		(myPaddle.current) && (myPaddle.current.style.top = `${newPos}%`);
		state.isTournament ?
		sendInTournament({
			type: "update",
			y: newPos,
		})
		:
		sendJsonMessage({
			type: "update",
			y: newPos,
		});
	}

	const handlePointerStart = (e: any) => {
		
		myPaddle.current?.setPointerCapture(e.pointerId);
		movePaddle(e);
		myPaddle.current?.addEventListener("pointermove", movePaddle);
		myPaddle.current?.addEventListener("pointerup", () => {
			myPaddle.current?.removeEventListener("pointermove", movePaddle);
		}, { once: true });
	}

	useEffect(() => {
		// if (state.level != Levels.OpponentFound)
		// 	navigate(-1);
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
	}, [])

	return (
		<div ref={table} className="touch-none relative w-full max-h-[750px]" style={{height: `${width * 1/2}px`}}>
			<div className="absolute first-table-half w-[68.69%] h-full border bg-secondary rounded-l-[10px] border-border" />
			<div className="absolute second-table-half w-[68.69%] h-full border bg-secondary rounded-l-[10px] rotate-180 left-full -translate-x-full border-border" />

			<div onPointerDown={(e) => handlePointerStart(e)} ref={myPaddle} className="h-1/5 absolute -translate-y-1/2" style={{backgroundColor: state.custom.paddle, width: `${width * 2 / 100}px`, top: `${state.myPaddleData.y}%`, left: `${state.myPaddleData.x}%`}}/>

			<div ref={sidePaddle} className="h-1/5 absolute -translate-y-1/2" style={{backgroundColor: state.custom.paddle, width: `${width * 2 / 100}px`, top: `${state.sidePaddleData.y}%`, left: `${state.sidePaddleData.x}%`}}/>

			<div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full" style={{backgroundColor: state.custom.ball, width: `${width * 3 / 100}px`, height: `${width * 3 / 100}px`, top: `${state.ballData.y}%`, left: `${state.ballData.x}%`}} />

			<svg className="absolute w-[37.38%] h-full left-1/2 -translate-x-1/2">
				<line x1={'100%'} x2={'0%'} y1={'0%'} y2={'100%'} className="stroke-1 stroke-border2" />
			</svg>
			<Box />
		</div>
	)
}

export default Table;