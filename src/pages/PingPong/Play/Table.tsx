import { useGameContext } from "../../../contexts/gameStore";
import Box from "./Box";

const Table = () => {
	return (
		<div className="relative w-full h-[585px] md:rotate-0 rotate-90">
			<div className="absolute first-table-half w-[68.69%] h-full border border-border bg-secondary rounded-l-[10px]">
				<div className="ml-[10px] absolute w-[20px] h-[104px] bg-white bottom-[70%]"/>
				<div className="absolute left-[30px] w-full h-full">
					<div className="absolute w-[31px] h-[32px] bottom-[70%] left-[20%] rounded-full bg-white" />
				</div>
			</div>
			<div className="absolute second-table-half w-[68.69%] h-full border border-border bg-secondary rounded-l-[10px] rotate-180 left-full -translate-x-full">
				<div className="ml-[10px] absolute w-[20px] h-[104px] bg-white bottom-[70%]"/>
				<div className="absolute left-[30px] w-full h-full">
					<div className="absolute w-[31px] h-[32px] bottom-[70%] left-[20%] rounded-full bg-white" />
				</div>
			</div>
			<svg className="absolute w-[37.38%] h-full left-1/2 -translate-x-1/2">
				<line x1={'100%'} x2={'0%'} y1={'0%'} y2={'100%'} className="stroke-1 stroke-border2" />
			</svg>
			<Box />
		</div>
	)
}

export default Table;