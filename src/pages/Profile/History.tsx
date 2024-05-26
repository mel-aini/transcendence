import { useEffect, useRef, useState } from "react";
import HistoryChart from "./HistoryChart";
import Title from "./Title";
import { data } from "./__test__/match";

const History = () => {
	const parentRef = useRef();
	const [width, setWidth] = useState<number | null>(null);

	useEffect(() => {
		setWidth(parentRef.current.offsetWidth);
		window.addEventListener('resize', () => {
			setWidth(parentRef.current.offsetWidth);
		})
		// return () => {
		// 	window.removeEventListener('resize')
		// }
	}, [])

	return (
		<div className="w-full flex flex-col">
			<Title width={105} height={30} title="History"/>
			<div ref={parentRef} className="w-full flex flex-col justify-around items-center border border-primary bg-[#222222]">
				<h1 className="text-2xl m-8">last 10 matches</h1>
				<HistoryChart width={width * 90 / 100} height={200}/>
				<div className="flex flex-col m-8 gap-3">
					{data.map((match, key) => {
						let status;
						let color;
						if (match.result.you > match.result.player) {
							status = "win";
							color = "#1ED947";
						}
						else if (match.result.you < match.result.player) {
							status = "lose";
							color = "#DD1B1B";
						}
						else {
							status = "draw";
							color = "#FFFFFF";
						}
						return (
							<div key={key} className="flex justify-around items-center border-primary border-2 h-[56px]" style={{width:`${width * 90 / 100}px`}}>
								{(status == "win") && <img className="w-[25px] h-[25px]" src="./src/assets/win.png"/>}
								{(status == "lose") && <img className="w-[25px] h-[25px]" src="./src/assets/lose.png"/>}
								{(status == "draw") && <img className="w-[25px] h-[25px]" src="./src/assets/draw.png"/>}
								<span>{(width < 500 && match.username.length) > 4 ? (match.username.substring(0, 4) + '...') : match.username}</span>
								<span style={{color:`${color}`}}>{match.result.you + ' - ' + match.result.player}</span>
								<span>{(width < 500 && match.playerName.length) > 4 ? (match.playerName.substring(0, 4) + '...') : match.playerName}</span>
								<img className="w-[25px] h-[25px] border-white rounded-full border" src="./src/assets/ebennamr.jpeg"/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	)
}

export default History;