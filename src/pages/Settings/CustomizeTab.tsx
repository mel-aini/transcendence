import { ComponentProps, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { useGlobalWebSocketContext } from "../../contexts/globalWebSokcketStore";
import "react-color-palette/css";
import { useGlobalContext } from "../../contexts/store";

const paddleColors = [ '#E2A65F', '#DB5050', '#14FFEC', '#C8EB87', '#FFFFFF', '#8B6DE2' ]
const ballColors = [ '#E2A65F', '#DB5050', '#14FFEC', '#C8EB87', '#FFFFFF', '#8B6DE2' ]
const tableColors = [ '#141619', '#1D403D', '#343434' ]

function CustomizeTab() {
	// const { state } = usePingPongContext();
	// const { state } = useProfileContext();
	const { state } = useGlobalContext();
	const { sendJsonMessage } = useGlobalWebSocketContext();
	const [ ballColor, setBallColor ] = useState<string | undefined>(state.userData?.game_settings.ball);
	const [ paddleColor, setPaddleColor ] = useState<string | undefined>(state.userData?.game_settings.paddle);
	const [ tableColor, setTableColor ] = useState<string | undefined>(state.userData?.game_settings.background);
	const saveChanges = () => {
		if ((ballColor == state.userData?.game_settings.ball)
			&& (paddleColor == state.userData?.game_settings.paddle)
				&& (tableColor == state.userData?.game_settings.background))
				return ;
		sendJsonMessage(
			{
				type: "update",
				identifier: "game_settings",
				data:
				{
					paddle : paddleColor,
					ball : ballColor,
					background : tableColor
				}
			}
		);
	}

	return (
		<div className="flex flex-col justify-between gap-5">
			<h3>Customize your view which suits for your taste</h3>
			<div className="space-y-10">
				<div className="flex px-20 gap-10 relative z-10">
					<BallCustomization ballColor={ballColor} setBallColor={setBallColor} />
					<PaddleCustomization paddleColor={paddleColor} setPaddleColor={setPaddleColor}/>
				</div>
				<div className="flex items-center justify-between gap-10">
					<Table tableColor={tableColor} setTableColor={setTableColor} ballColor={ballColor} paddleColor={paddleColor} />
				</div>
			</div>
			<span onClick={saveChanges} className="cursor-pointer hover:underline duration-300 select-none self-end">save changes</span>
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
	ballColor?: string, 
	setBallColor: Dispatch<SetStateAction<string | undefined>> 
}

function BallCustomization({ ballColor, setBallColor }: BallCustomizationProps) {
	const [dropMenu, setDropMenu] = useState(false);
	// const [color, setColor] = useColor(ballColor);

	return (
		<div className="flex items-center gap-5">
			<span>ball:</span>
			<button className="relative size-10 border border-border hover:border-white duration-300 rounded-md grid place-items-center">
				<span onClick={() => setDropMenu(prev => !prev)} className="size-5 rounded-full" style={{backgroundColor: (ballColor ? ballColor : "#FFFFFF")}}/>
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
	paddleColor?: string, 
	setPaddleColor: Dispatch<SetStateAction<string | undefined>> 
}

function PaddleCustomization({ paddleColor, setPaddleColor }: PaddleCustomizationProps) {
	const [ dropMenu, setDropMenu ] = useState(false);

	return (
		<div className="flex items-center gap-5">
			<span>paddle:</span>
			<button className="relative h-10 w-36 border border-border hover:border-white duration-300 rounded-md grid place-items-center px-3">
				<span onClick={() => setDropMenu(prev => !prev)} className="w-full h-5 rounded-2xl" style={{backgroundColor: (paddleColor ? paddleColor : "#FFFFFF")}}/>
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
	tableColor?: string, 
	setTableColor: Dispatch<SetStateAction<string | undefined>> 
	ballColor?: string, 
	paddleColor?: string, 
}

function Table({ tableColor, setTableColor, ballColor, paddleColor }: TableProps) {

	return (
		<>
			<button 
				onClick={() => setTableColor(tableColors[Math.floor(Math.random() * 3)])}
				className="size-10 border border-border rounded-md grid place-items-center">
				<IoIosArrowBack className="text-xl" />
			</button>
			<div
				style={{backgroundColor: tableColor + "1a"}} 
				className="relative flex-1 aspect-video border border-border rounded-md max-w-[1080px]">
					<span
						style={{backgroundColor: (paddleColor ? paddleColor : "#FFFFFF")}} 
						className="absolute top-[10%] left-3 w-[2.5%] max-w-4 aspect-[0.2/1]" />
					<svg className="absolute w-[37.38%] h-full left-1/2 -translate-x-1/2">
					<line x1={'100%'} x2={'0%'} y1={'0%'} y2={'100%'} className="stroke-1 stroke-border" />
					</svg>
					<span
						style={{backgroundColor: (paddleColor ? paddleColor : "#FFFFFF")}} 
						className="absolute top-[60%] right-3 w-[2.5%] max-w-4 aspect-[0.2/1]" />
					<span
						style={{backgroundColor: (ballColor ? ballColor : "#FFFFFF")}}  
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

