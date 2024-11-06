const Ready = ({counter}: {counter:number}) => {
	return (
		<div className="w-full h-full px-3 flex flex-col justify-around items-center p-3">
			<span className="text-primary font-semibold text-center text-[1.5vw] 2xl:text-[35px]">Get ready, the game will start after</span>
			<span className="font-semibold text-center text-[4.5vw] 2xl:text-[80px]">{counter}</span>
		</div>
	)
}

export default Ready;