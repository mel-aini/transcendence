import { useEffect } from "react";
import { useGameContext } from "../../../../contexts/gameStore";
import Box from "./Box";

// width = 1.6 * height

const Table = ({width}: {width: number}) => {

	return (
		<div className="relative w-full max-h-[750px]" style={{height: `${width * 1/2}px`}}>
			<div className="absolute first-table-half w-[68.69%] h-full border border-border bg-secondary rounded-l-[10px]">
				<div className="ml-[10px] h-1/5 absolute bg-white translate-y-1/2 bottom-[70%]" style={{width: `${width * 2 / 100}px`}}/>
					<div className="absolute bottom-[70%] left-[20%] rounded-full bg-white" style={{width: `${width * 3 / 100}px`, height: `${width * 3 / 100}px`}} />
			</div>
			<div className="absolute second-table-half w-[68.69%] h-full border border-border bg-secondary rounded-l-[10px] rotate-180 left-full -translate-x-full">
				<div className="ml-[10px] h-1/5 absolute bg-white translate-y-1/2 bottom-[70%]" style={{width: `${width * 2 / 100}px`}}/>
					<div className="absolute bottom-[70%] left-[20%] rounded-full bg-white" style={{width: `${width * 3 / 100}px`, height: `${width * 3 / 100}px`}} />
			</div>
			<svg className="absolute w-[37.38%] h-full left-1/2 -translate-x-1/2">
				<line x1={'100%'} x2={'0%'} y1={'0%'} y2={'100%'} className="stroke-1 stroke-border2" />
			</svg>
			<Box />
		</div>
	)
}

export default Table;
// {/* <div className="absolute top-[30px] w-full h-full">
// <div className="absolute w-[31px] h-[32px] bottom-[70%] left-[20%] rounded-full bg-white" />
// </div> */}





		// <div className="relative w-full max-h-[750px]" style={{height: `${height}px`}}>
		// 	<div className="absolute first-table-half md:w-[68.69%] md:h-full w-full h-[68.69%] border border-border bg-secondary rounded-t-[10px] md:rounded-r-[0px] md:rounded-l-[10px]">
		// 		<div className="mt-[10px] md:mt-0 md:ml-[10px] absolute h-[20px] w-[104px] md:w-[20px] md:h-[104px] bg-white left-[70%] -translate-x-1/2 md:-translate-x-0 md:left-0 md:translate-y-1/2 md:bottom-[70%]"/>
		// 		<div className="absolute md:left-[30px] md:top-0 top-[30px] w-full h-full">
		// 		<div className="absolute w-[31px] h-[32px] bottom-[70%] left-[20%] rounded-full bg-white" />
		// 		</div>
		// 	</div>
		// 	<div className="absolute second-table-half md:w-[68.69%] md:h-full w-full h-[68.69%] border border-border bg-secondary rounded-t-[10px] md:rounded-r-[0px] md:rounded-l-[10px] rotate-180 md:left-full md:-translate-x-full md:top-0 md:-translate-y-0 top-full -translate-y-full">
		// 		<div className="mt-[10px] md:mt-0 md:ml-[10px] absolute h-[20px] w-[104px] md:w-[20px] md:h-[104px] bg-white left-[70%] -translate-x-1/2 md:-translate-x-0 md:left-0 md:translate-y-1/2 md:bottom-[70%]"/>
		// 		<div className="absolute md:left-[30px] md:top-0 top-[30px] w-full h-full">
		// 			<div className="absolute w-[31px] h-[32px] bottom-[70%] left-[20%] rounded-full bg-white" />
		// 		</div>
		// 	</div>
		// 	<svg className="absolute h-[37.38%] w-full md:w-[37.38%] md:h-full top-1/2 -translate-y-1/2 md:top-0 md:-translate-y-0 md:left-1/2 md:-translate-x-1/2">
		// 		<line x1={'100%'} x2={'0%'} y1={'0%'} y2={'100%'} className="stroke-1 stroke-border2" />
		// 	</svg>
		// 	<Box />
		// </div>