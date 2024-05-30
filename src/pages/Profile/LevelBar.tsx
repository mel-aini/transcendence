import {motion} from 'framer-motion'

interface DataProps {
	data: {
		current: number,
		progress: number
	}
}

const LevelBar = ({data}: DataProps) => {
	return (
		<>
			{!data && <p>loading...</p>}
			{data && <motion.div className="w-full flex flex-col justify-between xl:w-[585px] 2xl:w-[685px] ">
				<div className="flex justify-between mb-2">
					<span className="font-thin">LVL {data.current}</span>
					<span className="font-thin">LVL {data.current + 1}</span>
				</div>
				<div className="level-bar w-full bg-[#2F2F2F] h-[10px]">
					<motion.div 
						initial={{x: `${0 - 100}%`}}
						animate={{x: `${data.progress - 100}%`}}
						transition={{
							duration: 1,
							ease: 'easeOut'
						}}
						className="level-bar w-full bg-primary h-full"
						style={{transform: `translateX(${data.progress - 100}%)`}}
					></motion.div>
				</div>
			</motion.div>}
		</>
	)
}

export default LevelBar;