import { useState } from "react";
import { useGlobalWebSocketContext } from "@/contexts/globalWebSokcketStore";
import "react-color-palette/css";
import { useGlobalContext } from "@/contexts/store";
import Table from "./Display/Table";
import BallCustomization from "./Display/BallCustomization";
import PaddleCustomization from "./Display/PaddleCustomization";

export const paddleColors = [ '#E2A65F', '#DB5050', '#14FFEC', '#C8EB87', '#FFFFFF', '#8B6DE2' ]
export const ballColors = [ '#E2A65F', '#DB5050', '#14FFEC', '#C8EB87', '#FFFFFF', '#8B6DE2' ]
export const tableColors = [ '#141619', '#1D403D', '#343434' ]

function CustomizeTab() {
	const { state } = useGlobalContext();
	const { sendJsonMessage } = useGlobalWebSocketContext();
	const [ ballColor, setBallColor ] = useState<string | undefined>(state.userData?.game_settings?.ball);
	const [ paddleColor, setPaddleColor ] = useState<string | undefined>(state.userData?.game_settings?.paddle);
	const [ tableColor, setTableColor ] = useState<string | undefined>(state.userData?.game_settings?.background);
	
	const saveChanges = () => {
		if ((ballColor == state.userData?.game_settings?.ball)
			&& (paddleColor == state.userData?.game_settings?.paddle)
				&& (tableColor == state.userData?.game_settings?.background))
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
				<div className="flex flex-col sm:flex-row md:px-20 gap-3 sm:gap-10 relative z-10">
					<BallCustomization ballColor={ballColor} setBallColor={setBallColor} />
					<PaddleCustomization paddleColor={paddleColor} setPaddleColor={setPaddleColor}/>
				</div>
				<Table tableColor={tableColor} setTableColor={setTableColor} ballColor={ballColor} paddleColor={paddleColor} />
			</div>
			<span onClick={saveChanges} className="cursor-pointer hover:underline duration-300 select-none self-end">save changes</span>
		</div>
	);
}

export default CustomizeTab;

