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
		<div className="w-full flex flex-col sm:min-w-[560px]">
			{/* <Title width={105} height={30} title="History"/> */}
			<div ref={parentRef} className="rounded-xl w-full flex flex-col justify-around pt-16 pb-6 items-center border border-primary">
				<h1 className="text-2xl">last 10 matches</h1>
				<HistoryChart width={width * 90 / 100} height={200}/>
				<div className="w-full px-6 flex flex-col gap-3">
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
							<div key={key} className="flex justify-between items-center border-primary border rounded-md h-[56px] w-full px-3">
								{(status == "win") && <img className="w-[30px] h-[30px] mr-1" src="/win.png"/>}
								{(status == "lose") && <img className="w-[30px] h-[30px] mr-1" src="/lose.png"/>}
								{(status == "draw") && <img className="w-[30px] h-[30px] mr-1" src="/draw.png"/>}
								<span className="shrink overflow-hidden text-ellipsis">{match.username}</span>
								<span className="shrink-0 px-2" style={{color:`${color}`}}>{match.result.you + ' - ' + match.result.player}</span>
								<span className="shrink overflow-hidden text-ellipsis">{match.playerName}</span>
								<img className="shrink-0 w-[30px] h-[30px] rounded-full ml-1" src="/ebennamr.jpeg"/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	)
}

export default History;