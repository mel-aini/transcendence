import { Dispatch, forwardRef, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import Box from "./Box";
import { useGlobalContext } from "@/contexts/store";

interface Props {
	rightPaddle: any,
	leftPaddle: any,
	gameLogic: any,
	counter: number,
	rightMoves: any,
	leftMoves: any,
	setCounter: Dispatch<SetStateAction<number>>
	status: "ready" | "help",
	isAI: boolean,
}

const Table = forwardRef((props: Props, ref: any) => {
	const { state } = useGlobalContext();
	const handleKeyDown = (e: KeyboardEvent) => {
		
		if (e.key === 'ArrowUp') {
			props.rightMoves.current = -1;
		}
		if (!props.isAI && e.key === 'w') {
			props.leftMoves.current = -1;
		}
		if (e.key === 'ArrowDown') {
			props.rightMoves.current = 1;
		}
		if (!props.isAI && e.key === 's') {
			props.leftMoves.current = 1;
		}
	}

	const handleKeyUp = (e: KeyboardEvent) => {
		
		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			props.rightMoves.current = 0;
		}
		if (!props.isAI && (e.key === 'w' || e.key === 's')) {
			props.leftMoves.current = 0;
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		}
	}, [])

	return (
		<div className="select-none relative w-full aspect-video">
			<div className="absolute first-table-half w-[68.69%] h-full border rounded-l-[10px] border-border"  style={{backgroundColor: state.userData?.game_settings.background + "1a"}} />
			<div className="absolute second-table-half w-[68.69%] h-full border rounded-l-[10px] rotate-180 left-full -translate-x-full border-border"  style={{backgroundColor: state.userData?.game_settings.background + "1a"}} />

			<div ref={props.leftPaddle} className="h-1/5 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-[2%] rounded-full w-[2%]" style={{backgroundColor: state.userData?.game_settings.paddle}}/>

			<div ref={props.rightPaddle} className="h-1/5 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-[98%] rounded-full w-[2%]" style={{backgroundColor: state.userData?.game_settings.paddle}}/>

			<div ref={ref} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-[3%] aspect-square" style={{backgroundColor: state.userData?.game_settings.ball}} />

			<svg className="absolute w-[37.38%] h-full left-1/2 -translate-x-1/2">
				<line x1={'100%'} x2={'0%'} y1={'0%'} y2={'100%'} className="stroke-1 stroke-border2" />
			</svg>
			<Box isAI={props.isAI} status={props.status} counter={props.counter} setCounter={props.setCounter} />
		</div>
	)
})

export default Table;