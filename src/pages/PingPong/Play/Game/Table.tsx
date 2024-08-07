import { useEffect, useRef, useState } from "react";
import Box from "./Box";
import { usePingPongContext } from "../../../../contexts/pingPongProvider";

// width = 1.6 * height

const Table = ({width}: {width: number}) => {
	const myPaddle = useRef<HTMLDivElement>(null);
	const sidePaddle = useRef<HTMLDivElement>(null);
	const { sendJsonMessage, state, dispatch } = usePingPongContext();

	function isPointInPolygon(point, polygon) {
		let { x, y } = point;
		let inside = false;
		for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		  let xi = polygon[i][0], yi = polygon[i][1];
		  let xj = polygon[j][0], yj = polygon[j][1];
	  
		  let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
		  if (intersect) inside = !inside;
		}
		return inside;
	  }
	  
	  // Convert percentages to coordinates in the range [0, 100]
	  function convertPercentToCoord(percentX, percentY, range = 100) {
		return [parseFloat(percentX) * range / 100, parseFloat(percentY) * range / 100];
	  }
	  
	  // Define the polygon vertices as percentages and convert them to coordinates
	  let polygonPercentages1 = [
		["0%", "0%"],
		["68.69%", "0%"],
		["31.31%", "100%"],
		["0%", "100%"]
	  ];
	  
	  let polygon1 = polygonPercentages1.map(([x, y]) => convertPercentToCoord(x, y));
	  let polygonPercentages2 = [
		["68.69%", "0%"],
		["100%", "0%"],
		["100%", "100%"],
		["31.31%", "100%"]
	  ];
	  
	  let polygon2 = polygonPercentages2.map(([x, y]) => convertPercentToCoord(x, y));


	const handleKeyDown = (e: KeyboardEvent) => {
		
		if (e.key === 'ArrowUp' || e.key === 'w') {
			const oldPos: string | undefined = myPaddle.current?.style.top;
			let newPos: number = Number(oldPos?.replace('%', '')) - 5;
			newPos = (newPos < 10) ? 10 : newPos;
			(myPaddle.current) && (myPaddle.current.style.top = `${newPos}%`);
			sendJsonMessage({
				type: "update",
				y: newPos,
			});
		}
		else if (e.key === 'ArrowDown' || e.key === 's') {
			const oldPos: string | undefined = myPaddle.current?.style.top;
			let newPos: number = Number(oldPos?.replace('%', '')) + 5;
			newPos = (newPos > 90) ? 90 : newPos;
			(myPaddle.current) && (myPaddle.current.style.top = `${newPos}%`);
			sendJsonMessage({
				type: "update",
				y: newPos,
			});
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		}
	}, [])

	return (
		<div className="relative w-full max-h-[750px]" style={{height: `${width * 1/2}px`}}>
			<div className={"absolute first-table-half w-[68.69%] h-full border bg-secondary rounded-l-[10px] " + (isPointInPolygon(state.ballData, polygon1) ? "border-border2" : "border-border")} />
			<div className={"absolute second-table-half w-[68.69%] h-full border bg-secondary rounded-l-[10px] rotate-180 left-full -translate-x-full " + (isPointInPolygon(state.ballData, polygon2) ? "border-border2" : "border-border")} />

			<div ref={myPaddle} className="h-1/5 absolute -translate-y-1/2 duration-100" style={{backgroundColor: state.custom.paddle, width: `${width * 2 / 100}px`, top: `${state.myPaddleData.y}%`, left: `${state.myPaddleData.x}%`}}/>

			<div ref={sidePaddle} className="h-1/5 absolute -translate-y-1/2 duration-100" style={{backgroundColor: state.custom.paddle, width: `${width * 2 / 100}px`, top: `${state.sidePaddleData.y}%`, left: `${state.sidePaddleData.x}%`}}/>

			<div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full" style={{backgroundColor: state.custom.ball, width: `${width * 3 / 100}px`, height: `${width * 3 / 100}px`, top: `${state.ballData.y}%`, left: `${state.ballData.x}%`}} />

			<svg className="absolute w-[37.38%] h-full left-1/2 -translate-x-1/2">
				<line x1={'100%'} x2={'0%'} y1={'0%'} y2={'100%'} className="stroke-1 stroke-border2" />
			</svg>
			<Box />
		</div>
	)
}

export default Table;
