import { useState } from "react";

const LevelBar = () => {
	const [level, setLevel] = useState(30);
	const currentLevel = 0;
	const nextLevel = currentLevel + 1;

	return (
		<div className="w-full flex flex-col justify-between">
			<div className="flex justify-between">
				<span>LVL {currentLevel}</span>
				<span>LVL {nextLevel}</span>
			</div>
			<div className="level-bar w-full bg-[#2F2F2F] h-[10px]">
				<div 
					className="level-bar w-full bg-primary h-full"
					style={{transform: `translateX(${level - 100}%)`}}
					></div>
			</div>
		</div>
	)
}

export default LevelBar;