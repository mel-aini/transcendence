import { useEffect, useState } from "react";
import { secondaryColor, thirdColor } from "../../utils/colors";
import Title from "./Title";

const WinsAndLoses = ({total, wins, type}: {total: number, wins: number, type: 'mobile' | 'desktop'}) => {
	const mobileClass = 'self-start sm:hidden';
	const desktopClass = 'hidden sm:block';

	return (
		<div className={type == 'mobile' ? mobileClass : desktopClass}>
			<div className="flex gap-3 text-xl items-center">
				<span className="w-[20px] h-[20px] bg-third"></span>
				<h3>{wins} wins</h3>
			</div>
			<div className="flex gap-3 text-xl items-center mt-3">
				<span className="w-[20px] h-[20px] bg-secondary"></span>
				<h3>{total - wins} loses</h3>
			</div>
		</div>
	)
}

const States = () => {
	const [percentage, setPercentage] = useState('0%') 
	let total = 10;
	let wins = 7;

	useEffect(() => {
		const perc = total != 0 ? parseFloat(((wins / total) * 100).toString()).toFixed(2) : 0;
		setPercentage(perc + '%');
	}, [])
	
	return (
		<div className="w-full">
			{/* <Title width={105} height={30} title={"States"} /> */}
			<div className="rounded-xl w-full p-10 sm:px-16 border border-primary flex flex-col sm:flex-row gap-10 items-center">
				<div className="flex sm:flex-col justify-between w-full self-stretch">
					<h3 className="text-xl font-medium">{total} matches</h3>
					<WinsAndLoses total={total} wins={wins} type="desktop" />
					<span className="text-third text-xl">{percentage}</span>
				</div>
				<div className="relative w-[250px] h-[250px] rounded-full sm:shrink-0"
					style={{
						background: `conic-gradient(from -90deg, 
							${thirdColor} 0%, 
							${thirdColor} ${percentage}, 
							${secondaryColor} ${percentage}, ${secondaryColor} 100%)`
					}}
				>
					<div className="absolute inset-[60px] rounded-full bg-bg"></div>
				</div>
				<WinsAndLoses total={total} wins={wins} type="mobile" />
			</div>
		</div>
	)
}

export default States;