import { useState } from "react";

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
			{data &&<div className="w-full flex flex-col justify-between xl:w-[585px] 2xl:w-[685px] ">
				<div className="flex justify-between mb-2">
					<span className="font-thin">LVL {data.current}</span>
					<span className="font-thin">LVL {data.current + 1}</span>
				</div>
				<div className="level-bar w-full bg-[#2F2F2F] h-[10px]">
					<div 
						className="level-bar w-full bg-primary h-full"
						style={{transform: `translateX(${data.progress - 100}%)`}}
						></div>
				</div>
			</div>}
		</>
	)
}

export default LevelBar;