import { data } from "./__test__/match";

const HistoryChart = ({width, height}) => {
	let currentX = 0;
	let currentY = height * 50 / 100;
	let currentX2 = 0;
	let currentY2 = height * 50 / 100;
	return (
		<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className=" px-0 sm:px-10 md:px-16 lg:px-24 my-24 md:my-32 lg:my-36">

			{data.map((match, key) => {
				const saveX = currentX;
				const saveY = currentY;
				const n = match.result.you - match.result.player;
				currentX += width * 10 / 100;
				currentY =  (height / 2) - (n * 10);
				return (
						<polygon key={key}
						points={`${saveX} ${saveY}, ${currentX}, ${currentY}`} className="stroke-primary stroke-1"/>
				);
			})}
			<circle cx={`${currentX2}`} cy={`${currentY2}`} r={2} className="fill-white stroke-primary stroke-1" />
			{data.map((match, key) => {
				const n = match.result.you - match.result.player;
				currentX2 += width * 10 / 100;
				currentY2 =  (height / 2) - (n * 10);
				return (
						<circle key={key} cx={currentX2} cy={currentY2} r={2} className="fill-white stroke-primary stroke-1" />
				);
			})}
		</svg>
	)
}

export default HistoryChart;