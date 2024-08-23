import { ComponentProps, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { usePingPongContext } from "../../contexts/pingPongProvider";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { twMerge } from "tailwind-merge";

const paddleColors = [ '#E2A65F', '#DB5050', '#14FFEC', '#C8EB87', '#FFFFFF', '#8B6DE2' ]
const ballColors = [ '#E2A65F', '#DB5050', '#14FFEC', '#C8EB87', '#FFFFFF', '#8B6DE2' ]
const tableColors = [ '#141619', '#1D403D', '#343434' ]

function CustomizeTab() {
	const {state, dispatch} = usePingPongContext();
	const [ ballColor, setBallColor ] = useState<string>(state.custom.ball);
	const [ paddleColor, setPaddleColor ] = useState<string>(state.custom.paddle);
	const [ tableColor, setTableColor ] = useState<string>(state.custom.table);

	const saveChanges = () => {
		dispatch({type: "CUSTOM", custom: {...state.custom, ball: ballColor, paddle: paddleColor, tableColor}});
	}

	useEffect(saveChanges, [tableColor, ballColor, paddleColor])

	return (
		<div>
			<h3 className="mb-8">Customize your view which suits for your taste</h3>
			<div className="space-y-10">
				<div className="flex px-20 gap-10 relative z-10">
					<BallCustomization ballColor={ballColor} setBallColor={setBallColor} />
					<PaddleCustomization paddleColor={paddleColor} setPaddleColor={setPaddleColor}/>
				</div>
				<div className="flex items-center justify-between gap-10">
					<Table tableColor={tableColor} setTableColor={setTableColor} />
				</div>
			</div>
		</div>
	);
}

interface DropMenuProps extends ComponentProps<'div'> {
	children?: ReactNode
	className?: string
	isOpen?: boolean
}

function DropMenu({ children, className, isOpen = false }: DropMenuProps) {
	if (!isOpen) return null;
	return (
		<div className={twMerge("absolute top-full mt-5 p-3 left-0 bg-secondary border border-border rounded-md flex flex-col gap-3", className)}>
			{children}
		</div>
	)
}

interface BallCustomizationProps { 
	ballColor: string, 
	setBallColor: Dispatch<SetStateAction<string>> 
}

function BallCustomization({ ballColor, setBallColor }: BallCustomizationProps) {
	const [dropMenu, setDropMenu] = useState(false);

	return (
		<div className="flex items-center gap-5">
			<span>ball:</span>
			<button className="relative size-10 border border-border hover:border-white duration-300 rounded-md grid place-items-center">
				<span onClick={() => setDropMenu(prev => !prev)} className="size-5 rounded-full" style={{backgroundColor: ballColor}}/>
				<DropMenu isOpen={dropMenu} className="w-[200%] grid grid-cols-2">
					{
						ballColors.map((color, index) => {
							return (
									<span key={index} onClick={() => {
										setDropMenu(false);
										setBallColor(color)
									}
								} className="size-5 rounded-full cursor-pointer" style={{backgroundColor: color}}/>
							)
						})
					}
				</DropMenu>
			</button>
		</div>
	)
}

interface PaddleCustomizationProps { 
	paddleColor: string, 
	setPaddleColor: Dispatch<SetStateAction<string>> 
}

function PaddleCustomization({ paddleColor, setPaddleColor }: PaddleCustomizationProps) {
	const [ dropMenu, setDropMenu ] = useState(false);

	return (
		<div className="flex items-center gap-5">
			<span>paddle:</span>
			<button className="relative h-10 w-36 border border-border hover:border-white duration-300 rounded-md grid place-items-center px-3">
				<span onClick={() => setDropMenu(prev => !prev)} className="w-full h-5 rounded-2xl" style={{backgroundColor: paddleColor}}/>
				<DropMenu isOpen={dropMenu} className="w-full">
					{
						paddleColors.map((color, index) => {
							return (
									<span key={index} onClick={() => {
										setDropMenu(false);
										setPaddleColor(color)
									}
								} className="w-full h-5 rounded-2xl cursor-pointer" style={{backgroundColor: color}}/>
							)
						})
					}
				</DropMenu>
			</button>
		</div>
	)
}

interface TableProps { 
	tableColor: string, 
	setTableColor: Dispatch<SetStateAction<string>> 
}

function Table({ tableColor, setTableColor }: TableProps) {
	const { state } = usePingPongContext();

	return (
		<>
			<button 
				onClick={() => setTableColor(tableColors[Math.floor(Math.random() * 3)])}
				className="size-10 border border-border rounded-md grid place-items-center">
				<IoIosArrowBack className="text-xl" />
			</button>
			<div
				style={{backgroundColor: tableColor}} 
				className="relative flex-1 aspect-video border border-border rounded-md max-w-[1080px]">
					<span
						style={{backgroundColor: state.custom.paddle}} 
						className="absolute top-[10%] left-3 w-[2.5%] max-w-4 aspect-[0.2/1]" />
					<svg className="absolute w-[37.38%] h-full left-1/2 -translate-x-1/2">
					<line x1={'100%'} x2={'0%'} y1={'0%'} y2={'100%'} className="stroke-1 stroke-border" />
					</svg>
					<span
						style={{backgroundColor: state.custom.paddle}} 
						className="absolute top-[60%] right-3 w-[2.5%] max-w-4 aspect-[0.2/1]" />
					<span
						style={{backgroundColor: state.custom.ball}}  
						className="absolute top-[40%] right-[30%] w-[3%] max-w-6 aspect-square rounded-full"></span>
			</div>
			<button 
				onClick={() => setTableColor(tableColors[Math.floor(Math.random() * 3)])}
				className="size-10 border border-border rounded-md grid place-items-center">
				<IoIosArrowForward className="text-xl" />
			</button>
		</>
	)
}

export default CustomizeTab;

