import { useEffect, useRef, useState } from "react";

const Bar = ({percentage}) => {
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
		<div ref={parentRef} className="w-[384px] xl:w-[585px] h-[33px]">
			<svg width={width} height={9} viewBox={`0 0 ${width} 9`} className={"fill-none"}>
				<polygon points={`0 0, ${width * 97 / 100} 0, ${width} 9, 0 9`} className="fill-[#2F2F2F]"/>
				<polygon points={`0 0, ${(width * percentage / 100) * 97 / 100} 0, ${(width * percentage / 100)} 9, 0 9`} className="fill-primary"/>
			</svg>
		</div>
	)
}

const LevelBar = () => {
	const currentLevel = 0;

	return (
		<div className="w-[384px] xl:w-[585px] h-[33px] flex flex-col justify-between">
			<div className="flex justify-between opacity-70">
				<span className="font-[275]">LVL {currentLevel}</span>
				<span className="font-[275]">LVL {currentLevel + 1}</span>
			</div>
			<Bar percentage={60}/>
		</div>
	)
}

export default LevelBar;