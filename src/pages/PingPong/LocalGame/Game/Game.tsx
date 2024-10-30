import { Dispatch, forwardRef, SetStateAction, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Table from "./Table";
import LayoutHeader from "@/layout/LayoutHeader";

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
	const [width, setWidth] = useState<number>(0);

	useEffect(() => {
		if (refParent.current)
			setWidth((refParent.current as HTMLElement).offsetWidth);
		const handleResize = () => {
			if (refParent.current)
				setWidth((refParent.current as HTMLElement).offsetWidth);
		}
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [])

	return (
		<div className="flex flex-col items-center w-full">
			<LayoutHeader className="w-full">Playing...</LayoutHeader>
			<div ref={refParent} className="flex flex-col h-full max-w-[1200px] w-full justify-between items-center gap-[26px]">
				<Header isAI={props.isAI} counter={props.counter} setCounter={props.setCounter} status={props.status} setStatus={props.setStatus} leftScore={props.leftScore} rightScore={props.rightScore} minutes={props.minutes} seconds={props.seconds} />
				<Table ref={ref} isAI={props.isAI} rightMoves={props.rightMoves} leftMoves={props.leftMoves} status={props.status} counter={props.counter} setCounter={props.setCounter} gameLogic={props.gameLogic} width={width} leftPaddle={props.leftPaddle} rightPaddle={props.rightPaddle} />
			</div>
		</div>
	);
})

export default Game;