import { darkColor, primaryColor, secondaryColor, thirdColor } from "../../utils/colors";
import { UserData } from "../../types/profile";
import { motion } from "framer-motion";
import { ComponentProps, useEffect, useState } from "react";
import Container from "../../components/Container";
import { useProfileContext } from "../../contexts/profileStore";

const Skeleton = () => {
	return (
		<div className="row-span-3 row-start-2 xl:row-span-1 xl:row-start-1 xl:col-start-1 xl:col-end-4 animate-pulse">
			<Container className="h-full" childClassName="flex flex-col justify-between p-5 sm:p-10 gap-20">
				<div className="">
					<h1 className="self-start text-2xl font-semibold mb-3">States</h1>
					<div className="flex flex-col sm:flex-row gap-3 sm:justify-between w-full">
						<span className="w-[90px] h-[28px] rounded-full bg-[#2F2F2F]" />
						<div className='flex flex-col sm:flex-row sm:items-center gap-5'>
							<div className="flex gap-3 text-xl items-center">
								<span className="w-[20px] h-[20px] bg-primary"></span>
								<span className="w-[66px] h-[28px] bg-[#2F2F2F] rounded-full" />
							</div>
							<div className="flex gap-3 text-xl items-center">
								<span className="w-[20px] h-[20px] bg-dark"></span>
								<span className="w-[66px] h-[28px] bg-[#2F2F2F] rounded-full" />
							</div>
						</div>
					</div>
				</div>
				<div className="relative w-full aspect-square max-w-[300px] self-center rounded-full sm:shrink-0"
					style={{ background: `conic-gradient(from -90deg, #2F2F2F 0%, #2F2F2F 100%)` }}>
					<div className="absolute inset-[20%] sm:inset-[60px] rounded-full bg-bg"></div>
				</div>
			</Container>
		</div>
	)
}

const WinsAndLoses = ({total, wins}: {total?: number, wins?: number}) => {
	const loss: number = (total ? total : 0) - (wins ? wins : 0);

	return (
		<div className='flex flex-col sm:flex-row sm:items-center gap-5'>
			<div className="flex gap-3 text-xl items-center">
				<span className="w-[20px] h-[20px] bg-primary"></span>
				<h3>{wins} wins</h3>
			</div>
			<div className="flex gap-3 text-xl items-center">
				<span className="w-[20px] h-[20px] bg-dark"></span>
				<h3>{loss} losses</h3>
			</div>
		</div>
	)
}
interface NisbaProps extends ComponentProps<'span'> {
	percentage: number,
	className: string
}

const Nisba = ({percentage, className, ...props}: NisbaProps) => {
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
		<span {...props} className={"text-primary text-3xl " + className}>{nisba + '%'}</span>
	)
}

const States = ({isLoading}: {isLoading: boolean}) => {
	const { state } = useProfileContext();

	
	if (isLoading) return (
		<Skeleton />
	);

	
	const percentage: string = state.userData ? (state.userData.matches.total != 0 ? parseFloat(((state.userData.matches.wins / state.userData.matches.total) * 100).toString()).toFixed(0) : 0) + '%' : '0%';

	return (
		<div className="row-span-3 row-start-2 xl:row-span-1 xl:row-start-1 xl:col-start-1 xl:col-end-4">
			<Container className="h-full" childClassName="flex flex-col justify-between p-5 sm:p-10 gap-20">
				<div className="">
					<h1 className="self-start text-2xl font-semibold mb-3">States</h1>
					<div className="flex flex-col sm:flex-row gap-3 sm:justify-between w-full">
						<h3 className="text-xl">games: {state.userData?.matches.total}</h3>
						<WinsAndLoses total={state.userData?.matches.total} wins={state.userData?.matches.wins} />
					</div>
				</div>
				<motion.div
					initial={{background: `conic-gradient(from -90deg, 
						${primaryColor} 0%, 
						${primaryColor} ${'0%'}, 
						${darkColor} ${'0%'}, ${darkColor} 100%)`}}
						animate={{background: `conic-gradient(from -90deg, 
							${primaryColor} 0%, 
							${primaryColor} ${percentage}, 
							${darkColor} ${percentage}, ${darkColor} 100%)`}}
							transition={{
								duration: 2,
								ease: 'easeOut'
							}}
							className="relative w-full aspect-square max-w-[300px] self-center rounded-full sm:shrink-0"
							style={{
								background: `conic-gradient(from -90deg, 
									${primaryColor} 0%, 
									${primaryColor} ${percentage}, 
									${darkColor} ${percentage}, ${darkColor} 100%)`
								}}
								>
					<div className="absolute inset-[20%] sm:inset-[60px] rounded-full bg-bg"></div>
					<Nisba className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" percentage={parseFloat(percentage)}/>
				</motion.div>
			</Container>
		</div>
	)
}

export default States;