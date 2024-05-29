import { secondaryColor, thirdColor } from "../../utils/colors";
import { UserData } from "../../types/profile";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
				<h3>{total - wins} losses</h3>
			</div>
		</div>
	)
}

const Nisba = ({percentage}: {percentage: number}) => {
	const [nisba, setNisba] = useState(0)

	useEffect(() => {
		
		if (nisba < percentage) {
			setTimeout(() => {
				setNisba(nisba + 1.00)
			}, 40)
		} else {
			setTimeout(() => {
				setNisba(percentage)
			}, 100)
		}

	}, [nisba])

	return (
		<span className="text-third text-xl">{nisba + '%'}</span>
	)
}

interface Props {
	data: UserData | null
}

const States = ({data}: Props) => {

	if (!data) return (
		<p>loading...</p>
	);

	const percentage = (data.matches.total != 0 ? parseFloat(((data.matches.wins / data.matches.total) * 100).toString()).toFixed(2) : 0) + '%';

	return (
		<div className="w-full">
			{data && <div className="rounded-xl w-full p-10 sm:px-16 border border-primary flex flex-col sm:flex-row gap-10 items-center">
				<div className="flex sm:flex-col justify-between w-full self-stretch">
					<h3 className="text-xl font-medium">{data.matches.total} matches</h3>
					<WinsAndLoses total={data.matches.total} wins={data.matches.wins} type="desktop" />
					<Nisba percentage={parseFloat(percentage)}/>
				</div>
				<motion.div
					initial={{background: `conic-gradient(from -90deg, 
						${thirdColor} 0%, 
						${thirdColor} ${'0%'}, 
						${secondaryColor} ${'0%'}, ${secondaryColor} 100%)`}}
					animate={{background: `conic-gradient(from -90deg, 
						${thirdColor} 0%, 
						${thirdColor} ${percentage}, 
						${secondaryColor} ${percentage}, ${secondaryColor} 100%)`}}
					transition={{
						duration: 2,
						ease: 'easeOut'
					}}
					className="relative w-[250px] h-[250px] rounded-full sm:shrink-0"
					style={{
						background: `conic-gradient(from -90deg, 
							${thirdColor} 0%, 
							${thirdColor} ${percentage}, 
							${secondaryColor} ${percentage}, ${secondaryColor} 100%)`
					}}
				>
					<div className="absolute inset-[60px] rounded-full bg-bg"></div>
				</motion.div>
				<WinsAndLoses total={data.matches.total} wins={data.matches.wins} type="mobile" />
			</div>}
		</div>
	)
}

export default States;