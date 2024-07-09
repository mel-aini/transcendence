import pause from "/pause_icon.svg"
import help from "/Help_icon.svg"
import { useGameContext } from "../../../../contexts/gameStore";

const Header = () => {
	const {state, dispatch} = useGameContext();
	const clickHandler = () => {
		dispatch({type: "STATUS", status: "help"});
		if (state.counter > 0)
			return ;
		dispatch({type: "COUNTER", counter: 1});
	}

	// <div className="w-full flex justify-between gap-1 items-center">
	return (
		<div className="w-full gap-1 items-center grid grid-cols-3 grid-rows-2 lg:grid-rows-1">
			<div className="flex gap-1 col-start-1 col-end-2 w-full">
				<div className="relative bg-secondary w-[40px] h-[40px] shrink-0">
					<div className="absolute w-[2px] h-[70%] top-full -translate-y-full bg-primary"/> {/* height will be dynamic */}
					<span className="absolute text-primary content-center text-center w-full h-full">7</span>
				</div>
				<div className="relative bg-secondary w-[40px] h-[40px] shrink-0">
					<div className="absolute w-[2px] h-[50%] top-full -translate-y-full bg-white"/> {/* height will be dynamic */}
					<span className="absolute content-center text-center w-full h-full">5</span>
				</div>
				<div className="bg-secondary lg:w-full lg:max-w-[133px] h-[40px] flex items-center px-2 shrink-0 sm:shrink">
					<img src="/ebennamr.jpeg" alt="" className="w-[26px] h-[26px] border rounded-full overflow-hidden shrink-0"/>
					<span className="shrink overflow-hidden text-ellipsis text-xs hidden sm:block pl-3">ebennamer</span>
				</div>
			</div>
			<span className="w-full text-primary text-center text-base col-start-1 col-end-4 row-start-1 lg:col-start-2 lg:col-end-3">Goooooooooooal!</span>
			<div className="flex gap-1 shrink-0 justify-self-end col-start-3 col-end-4">
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