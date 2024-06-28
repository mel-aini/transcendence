import { useEffect, useState } from "react";

const Ready = ({counter}: {counter:number}) => {
	return (
		<div className="w-full h-full px-3 flex flex-col justify-around items-center">
			<span className="text-primary font-semibold text-center text-base">Get ready, the game will start after</span>
			<span className="font-semibold text-center text-9xl">{counter}</span>
		</div>
	)
}

export default Ready;