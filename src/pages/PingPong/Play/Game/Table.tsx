import { useGameContext } from "../../../../contexts/gameStore";
import Box from "./Box";

const Table = () => {
	return (
		<div className="relative w-full h-[585px]">
			<div className="absolute first-table-half md:w-[68.69%] md:h-full w-full h-[68.69%] border border-border bg-secondary rounded-t-[10px] md:rounded-r-[0px] md:rounded-l-[10px]">
				<div className="mt-[10px] md:mt-0 md:ml-[10px] absolute h-[20px] w-[104px] md:w-[20px] md:h-[104px] bg-white left-[70%] -translate-x-1/2 md:-translate-x-0 md:left-0 md:translate-y-1/2 md:bottom-[70%]"/>
				<div className="absolute md:left-[30px] md:top-0 top-[30px] w-full h-full">
				<div className="absolute w-[31px] h-[32px] bottom-[70%] left-[20%] rounded-full bg-white" />
				</div>
			</div>
			<div className="absolute second-table-half md:w-[68.69%] md:h-full w-full h-[68.69%] border border-border bg-secondary rounded-t-[10px] md:rounded-r-[0px] md:rounded-l-[10px] rotate-180 md:left-full md:-translate-x-full md:top-0 md:-translate-y-0 top-full -translate-y-full">
				<div className="mt-[10px] md:mt-0 md:ml-[10px] absolute h-[20px] w-[104px] md:w-[20px] md:h-[104px] bg-white left-[70%] -translate-x-1/2 md:-translate-x-0 md:left-0 md:translate-y-1/2 md:bottom-[70%]"/>
				<div className="absolute md:left-[30px] md:top-0 top-[30px] w-full h-full">
					<div className="absolute w-[31px] h-[32px] bottom-[70%] left-[20%] rounded-full bg-white" />
				</div>
			</div>
			<svg className="absolute h-[37.38%] w-full md:w-[37.38%] md:h-full top-1/2 -translate-y-1/2 md:top-0 md:-translate-y-0 md:left-1/2 md:-translate-x-1/2">
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