import { Dispatch, forwardRef, SetStateAction, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Table from "./Table";

interface Props {
	rightPaddle: any,
	leftPaddle: any,
	leftScore: number,
	rightScore: number,
	gameLogic: any,
	minutes: number,
	seconds: number,
	counter: number,
	setCounter: Dispatch<SetStateAction<number>>,
	status: "ready" | "help",
	setStatus: Dispatch<SetStateAction<"ready" | "help">>,
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
		<div ref={refParent} className="flex flex-col h-full max-w-[1200px] w-4/5 justify-between items-center gap-[26px]">
			<Header counter={props.counter} setCounter={props.setCounter} status={props.status} setStatus={props.setStatus} leftScore={props.leftScore} rightScore={props.rightScore} minutes={props.minutes} seconds={props.seconds} />
			<Table ref={ref} status={props.status} counter={props.counter} setCounter={props.setCounter} gameLogic={props.gameLogic} width={width} leftPaddle={props.leftPaddle} rightPaddle={props.rightPaddle} />
		</div>
	);
})

export default Game;