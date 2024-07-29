import { useEffect, useState } from "react";

const Ready = ({counter}: {counter:number}) => {
	return (
		<div className="w-full h-full px-3 flex flex-col justify-around items-center">
			<span className="text-primary font-semibold text-center md:text-base sm:text-xs text-[6px]">Get ready, the game will start after</span>
			<span className="font-semibold text-center md:text-9xl sm:text-7xl text-2xl">{counter}</span>
		</div>
	)
}

export default Ready;