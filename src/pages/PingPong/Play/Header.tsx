import pause from "/pause_icon.svg"
import help from "/Help_icon.svg"
import { useGameContext } from "../../../contexts/gameStore";

const Header = () => {
	const {state, dispatch} = useGameContext();
	const clickHandler = () => {
		dispatch({type: "STATUS", status: "help"});
		if (state.counter > 0)
			return ;
		dispatch({type: "COUNTER", counter: 1});
	}

	return (
		<div className="w-full grid grid-cols-4 gap-1 items-center">
			<div className="flex gap-1 col-start-1 col-end-2">
				<div className="relative bg-secondary w-[40px] h-[40px]">
					<div className="absolute w-[2px] h-[70%] top-full -translate-y-full bg-primary"/> {/* height will be dynamic */}
					<span className="absolute text-primary content-center text-center w-full h-full">7</span>
				</div>
				<div className="relative bg-secondary w-[40px] h-[40px]">
					<div className="absolute w-[2px] h-[50%] top-full -translate-y-full bg-white"/> {/* height will be dynamic */}
					<span className="absolute content-center text-center w-full h-full">5</span>
				</div>
				<div className="bg-secondary sm:w-[133px] h-[40px] flex items-center justify-between gap-1 px-2">
					<img src="/ebennamr.jpeg" alt="" className="w-[26px] h-[26px] border rounded-full overflow-hidden shrink-0"/>
					<span className="shrink overflow-hidden text-ellipsis hidden sm:block">ebennamer</span>
				</div>
			</div>
			<span className="text-primary col-start-3">Goooooooooooal!</span>
			<div className="flex gap-1 col-start-5">
				<div className="bg-secondary w-[40px] h-[40px] flex justify-center items-center">
					<img src={pause} alt="pause" />
				</div>
				<div onClick={clickHandler} className="bg-secondary w-[40px] h-[40px] flex justify-center items-center">
					<img src={help} alt="help" />
				</div>
			</div>
		</div>
	)
}

export default Header;
		// <div className="w-full flex justify-between items-center gap-1">
		// 	<div className="flex gap-1">
		// 		<div className="relative bg-secondary w-[40px] h-[40px]">
		// 			<div className="absolute w-[2px] h-[70%] top-full -translate-y-full bg-primary"/> {/* height will be dynamic */}
		// 			<span className="absolute text-primary content-center text-center w-full h-full">7</span>
		// 		</div>
		// 		<div className="relative bg-secondary w-[40px] h-[40px]">
		// 			<div className="absolute w-[2px] h-[50%] top-full -translate-y-full bg-white"/> {/* height will be dynamic */}
		// 			<span className="absolute content-center text-center w-full h-full">5</span>
		// 		</div>
		// 		<div className="bg-secondary sm:w-[133px] h-[40px] flex items-center justify-between gap-1 px-2">
		// 			<img src="/ebennamr.jpeg" alt="" className="w-[26px] h-[26px] border rounded-full overflow-hidden shrink-0"/>
		// 			<span className="shrink overflow-hidden text-ellipsis hidden sm:block">ebennamer</span>
		// 		</div>
		// 	</div>
		// 	{/* <span className="text-primary">Goooooooooooal!</span> */}
		// 	<div className="flex gap-1">
		// 		<div className="bg-secondary w-[40px] h-[40px] flex justify-center items-center">
		// 			<img src={pause} alt="pause" />
		// 		</div>
		// 		<div onClick={clickHandler} className="bg-secondary w-[40px] h-[40px] flex justify-center items-center">
		// 			<img src={help} alt="help" />
		// 		</div>
		// 	</div>
		// </div>