import { delay, motion } from "framer-motion";
import { data } from "./__test__/match";

interface Match {
	username: string,
	playerName: string,
	result: {
		you :number ,
		player: number
	}
}

const HistoryChart = ({width, height}: {width: number, height: number}) => {
	let currentX = 0;
	let currentY = height * 50 / 100;
	let currentX2 = 0;
	let currentY2 = height * 50 / 100;


	return (
		<motion.svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className=" px-0 sm:px-10 md:px-16 lg:px-24 my-24 md:my-32 lg:my-36"
			initial="hidden"
			animate="visible">

			<motion.circle
				cx={currentX}
				cy={currentY}
				r={2}
				className="fill-white stroke-primary stroke-1"
				// variants={variantCircle}
			/>
			{data.map((match: Match, key: number) => {
				const saveX = currentX;
				const saveY = currentY;
				const n = match.result.you - match.result.player;
				currentX += width * 10 / 100;
				currentY = (height / 2) - (n * 10);
				const variant = {
					hidden: { pathLength: 0, opacity: 0 },
					visible: { pathLength: 1, opacity: 1 ,
						transition: { duration: 0.3, delay: key * 0.3},
						ease: "easeInOut"
					}
				}

				return (
					<motion.line
						key={key}
						x1={saveX}
						y1={saveY}
						x2={currentX}
						y2={currentY}
						className="stroke-primary stroke-1"
						variants={variant}
					/>
				);
			})}
			{data.map((match: Match, key: number) => {
				const n = match.result.you - match.result.player;
				currentX2 += width * 10 / 100;
				currentY2 = (height / 2) - (n * 10);
				const variantCircle = {
					hidden: { pathLength: 0, opacity: 0 },
					visible: { pathLength: 1, opacity: 1 ,
						transition: { duration: 0.4, delay: key * 0.3},
					}
				}

				return (
					<motion.circle
						key={key}
						cx={currentX2}
						cy={currentY2}
						r={2}
						className="fill-white stroke-primary stroke-1"
						variants={variantCircle}
					/>
				);
			})}
		</motion.svg>
	)
}

export default HistoryChart;