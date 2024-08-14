const Ready = ({counter}: {counter:number}) => {
	return (
		<div className="w-full h-full px-3 flex flex-col justify-around items-center p-3">
			<span className="text-primary font-semibold text-center" style={{fontSize:"1.5vw"}}>Get ready, the game will start after</span>
			<span className="font-semibold text-center" style={{fontSize:"4.5vw"}}>{counter}</span>
		</div>
	)
}

export default Ready;