import { Dispatch, forwardRef, SetStateAction, useEffect } from "react";
import Box from "./Box";

interface Props {
	width: number,
	rightPaddle: any,
	leftPaddle: any,
	gameLogic: any,
	counter: number,
	setCounter: Dispatch<SetStateAction<number>>
	status: "ready" | "help",
}

const Table = forwardRef((props: Props, ref: any) => {

	const handleKeyDown = (e: KeyboardEvent) => {
		
		if (e.key === 'ArrowUp') {
			const oldPos: string | undefined = props.rightPaddle.current?.style.top;
			let newPos: number = Number(oldPos?.replace('%', '')) - 5;
			newPos = (newPos < 10) ? 10 : newPos;
			(props.gameLogic.current.getRightPaddle) && (props.gameLogic.current.getRightPaddle.y = newPos);
		}
		if (e.key === 'w') {
			const oldPos: string | undefined = props.leftPaddle.current?.style.top;
			let newPos: number = Number(oldPos?.replace('%', '')) - 5;
			newPos = (newPos < 10) ? 10 : newPos;
			(props.gameLogic.current.getLeftPaddle) && (props.gameLogic.current.getLeftPaddle.y = newPos);
		}
		if (e.key === 'ArrowDown') {
			const oldPos: string | undefined = props.rightPaddle.current?.style.top;
			let newPos: number = Number(oldPos?.replace('%', '')) + 5;
			newPos = (newPos > 90) ? 90 : newPos;
			(props.gameLogic.current.getRightPaddle) && (props.gameLogic.current.getRightPaddle.y = newPos);
		}
		if (e.key === 's') {
			const oldPos: string | undefined = props.leftPaddle.current?.style.top;
			let newPos: number = Number(oldPos?.replace('%', '')) + 5;
			newPos = (newPos > 90) ? 90 : newPos;
			(props.gameLogic.current.getLeftPaddle) && (props.gameLogic.current.getLeftPaddle.y = newPos);
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		console.log(ref);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		}
	}, [])

	return (
		<div className="touch-none relative w-full max-h-[750px]" style={{height: `${props.width / 1.6}px`}}>
			<div className="absolute first-table-half w-[68.69%] h-full border rounded-l-[10px] border-border bg-secondary" />
			<div className="absolute second-table-half w-[68.69%] h-full border rounded-l-[10px] rotate-180 left-full -translate-x-full border-border bg-secondary" />

			<div ref={props.leftPaddle} className="h-1/5 absolute -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-[2%]" style={{width: `${props.width * 2 / 100}px`}}/>

			<div ref={props.rightPaddle} className="h-1/5 absolute -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-[98%]" style={{width: `${props.width * 2 / 100}px`}}/>

			<div ref={ref} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white top-1/2 left-1/2" style={{width: `${props.width * 3 / 100}px`, height: `${props.width * 3 / 100}px`}} />

			<svg className="absolute w-[37.38%] h-full left-1/2 -translate-x-1/2">
				<line x1={'100%'} x2={'0%'} y1={'0%'} y2={'100%'} className="stroke-1 stroke-border2" />
			</svg>
			<Box status={props.status} counter={props.counter} setCounter={props.setCounter} />
		</div>
	)
})

export default Table;