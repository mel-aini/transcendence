import { Dispatch, forwardRef, SetStateAction, useEffect, useRef } from "react";
import Header from "./Header";
import Table from "./Table";
import LayoutHeader from "@/layout/LayoutHeader";
import { twMerge } from "tailwind-merge";
import { STORE_OPTS, useGlobalContext } from "@/contexts/store";

interface Props {
	rightPaddle: any,
	leftPaddle: any,
	leftScore: number,
	rightScore: number,
	gameLogic: any,
	minutes: number,
	seconds: number,
	counter: number,
	rightMoves: any,
	leftMoves: any,
	setCounter: Dispatch<SetStateAction<number>>,
	status: "ready" | "help",
	setStatus: Dispatch<SetStateAction<"ready" | "help">>,
	isAI: boolean,
}

const Game = forwardRef((props: Props, ref: any) => {
	const refParent = useRef<HTMLDivElement>(null);
	const {state, dispatch}  = useGlobalContext();

	useEffect(() => {
		const handleOrientationChange = () => {
			const orientation = window.screen.orientation.type;
			dispatch({type: STORE_OPTS.ORIENTATION, isOrientation: orientation == "landscape-primary"})
		}
		handleOrientationChange();
		window.addEventListener('orientationchange', handleOrientationChange);
		return () => {
			dispatch({type: STORE_OPTS.ORIENTATION, isOrientation: false});
			window.removeEventListener('orientationchange', handleOrientationChange);
		};
	}, [])

	return (
		<div className="flex flex-col items-center w-full">
			{!state.isOrientation && <LayoutHeader className="w-full">Playing...</LayoutHeader>}
			<div ref={refParent} className={twMerge("min-h-[calc(100vh-80px-40px)] max-w-[1200px] space-y-2", state.isOrientation ? 'w-[60%]' : 'w-full')}>
				<Header isAI={props.isAI} counter={props.counter} setCounter={props.setCounter} status={props.status} setStatus={props.setStatus} leftScore={props.leftScore} rightScore={props.rightScore} minutes={props.minutes} seconds={props.seconds} />
				<Table ref={ref} isAI={props.isAI} leftScore={props.leftScore} rightScore={props.rightScore} rightMoves={props.rightMoves} leftMoves={props.leftMoves} status={props.status} counter={props.counter} setCounter={props.setCounter} gameLogic={props.gameLogic} leftPaddle={props.leftPaddle} rightPaddle={props.rightPaddle} />
			</div>
		</div>
	);
})

export default Game;