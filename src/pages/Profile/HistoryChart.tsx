import { motion } from "framer-motion";
import { data } from "./__test__/match";

const HistoryChart = ({width, height}) => {
	let currentX = 0;
	let currentY = height * 50 / 100;
	let currentX2 = 0;
	let currentY2 = height * 50 / 100;


	return (
		<motion.svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className=" px-0 sm:px-10 md:px-16 lg:px-24 my-24 md:my-32 lg:my-36"
			initial="hidden"
			animate="visible"
						>

			<motion.circle
				cx={currentX}
				cy={currentY}
				r={2}
				className="fill-white stroke-primary stroke-1"
			/>
			{data.map((match, key) => {
				const saveX = currentX;
				const saveY = currentY;
				const n = match.result.you - match.result.player;
				currentX += width * 10 / 100;
				currentY = (height / 2) - (n * 10);

				return (
					<motion.polygon
						key={key}
						points={`${saveX},${saveY} ${currentX},${currentY}`}
						className="stroke-primary stroke-1"
						// initial="hidden"
						// animate="visible"
						// variants={{ ...lineVariants }}
						initial={{ points: `${saveX},${saveY} ${saveX},${saveY}`, opacity: 0 }}
						animate={{ points: `${saveX},${saveY} ${currentX},${currentY}`, opacity: 1 }}
						transition={{ duration: 0.5, delay: key * 0.5 }}
					/>
				);
			})}
			{data.map((match, key) => {
				const n = match.result.you - match.result.player;
				currentX2 += width * 10 / 100;
				currentY2 = (height / 2) - (n * 10);
				return (
					<motion.circle
						key={key}
						cx={currentX2}
						cy={currentY2}
						r={2}
						className="fill-white stroke-primary stroke-1"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: key * 0.5 }}
					/>
				);
			})}
		</motion.svg>
	)
}

// initial={{ opacity: 0, scale: 0.5 }}
// animate={{ opacity: 1, scale: 1 }}
// transition={{
// 	duration: 1,
// 	delay: 0.5,
// 	staggerChildren: 0.2,
// 	ease: [0, 0.71, 0.2, 1.01]
// }}
export default HistoryChart;