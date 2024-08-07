import { useContext, useState } from "react";
import { usePingPongContext } from "../../../contexts/pingPongProvider";
import { customizeContext } from "./Index";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CustomizeTab() {
	const {state, dispatch} = usePingPongContext();
	const customize = useContext(customizeContext);
	const [ballColor, setBallColor] = useState<string>(state.custom.ball);
	const [paddleColor, setPaddleColor] = useState<string>(state.custom.paddle);
	const [tableColor, setTableColor] = useState<string>(state.custom.table);

	const changeBall = (e: any) => {
		setBallColor(e.currentTarget.style.backgroundColor);
		setPaddleColor(e.currentTarget.style.backgroundColor);
	}

	const saveChanges = () => {
		dispatch({type: "CUSTOM", custom: {...state.custom, ball: ballColor, paddle: paddleColor}});
		customize.setCustomize(false);
	}

	return (
		<div className="w-full max-w-[700px] flex flex-col bg-secondary border border-border rounded-md p-10 gap-14">
			<div className="flex flex-col gap-5 justify-between">
				<h1 className="text-xl text-primary font-medium">Display settings</h1>
				<span className="font-light text-xs">Customize your view which suits for your taste</span>
			</div>
			<div className="flex flex-col sm:flex-row gap-8">
				<div className="flex flex-col gap-3 items-start">
					<h1 className="text-xs">ball:</h1>
					<div className="flex justify-between gap-[7px]">
						<div className="flex justify-center items-center w-[30px] h-[30px] border border-border rounded-md">
							<span className="w-1/2 h-1/2 rounded-full" style={{backgroundColor: ballColor}}/>
						</div>
						<div className="flex justify-center items-center w-[115px] h-[56px] border border-border rounded-md">
							<div className="flex flex-wrap w-[84.5%] gap-[5px]">
								<span onClick={(e) => changeBall(e)} className="w-[15px] h-[15px] rounded-full shrink-0 cursor-pointer" style={{backgroundColor: "#E2A65F"}}/>
								<span onClick={(e) => changeBall(e)} className="w-[15px] h-[15px] rounded-full shrink-0 cursor-pointer" style={{backgroundColor: "#DB5050"}}/>
								<span onClick={(e) => changeBall(e)} className="w-[15px] h-[15px] rounded-full shrink-0 cursor-pointer" style={{backgroundColor: "#14FFEC"}}/>
								<span onClick={(e) => changeBall(e)} className="w-[15px] h-[15px] rounded-full shrink-0 cursor-pointer" style={{backgroundColor: "#C8EB87"}}/>
								<span onClick={(e) => changeBall(e)} className="w-[15px] h-[15px] rounded-full shrink-0 cursor-pointer" style={{backgroundColor: "white"}}/>
								<span onClick={(e) => changeBall(e)} className="w-[15px] h-[15px] rounded-full shrink-0 cursor-pointer" style={{backgroundColor: "#8B6DE2"}}/>
							</div>
						</div>
					</div>
					<h1 className="text-xs">paddle:</h1>
					<div className="flex justify-center items-center w-[110px] h-[30px] border border-border rounded-md">
						<span className="w-[80%] h-1/2 rounded-[7px]" style={{backgroundColor: paddleColor}}/>
					</div>
				</div>
				<div className="flex flex-col gap-3 w-full">
					<div className="relative w-full h-[230px] self-center sm:self-end">
						<div className="absolute first-table-half w-[68.69%] h-full border bg-secondary rounded-l-[10px] border-border" />
						<div className="absolute second-table-half w-[68.69%] h-full border bg-secondary rounded-l-[10px] rotate-180 left-full -translate-x-full border-border" />
						<svg className="absolute w-[37.38%] h-full left-1/2 -translate-x-1/2">
							<line x1={'100%'} x2={'0%'} y1={'0%'} y2={'100%'} className="stroke-1 stroke-border" />
						</svg>
					</div>
					<div className="flex gap-[10px] self-center sm:self-end">
						<div className="flex justify-center items-center w-[25px] h-[25px] border border-border rounded-md cursor-pointer select-none">
							<IoIosArrowBack className="text-xs" />
						</div>
						<div className="flex justify-center items-center w-[25px] h-[25px] border border-border rounded-md cursor-pointer select-none">
							<IoIosArrowForward className="text-xs" />
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-between items-center">
				<span onClick={() => customize.setCustomize(false)} className="font-light text-xs cursor-pointer hover:underline duration-300 select-none">back</span>
				<span onClick={saveChanges} className="text-xs cursor-pointer hover:underline duration-300 select-none">save and go back</span>
			</div>
		</div>
	);
}

export default CustomizeTab;