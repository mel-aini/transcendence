import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Table from "./Table";
import { Levels, usePingPongContext } from "../../../../contexts/pingPongProvider";
import { useNavigate } from "react-router-dom";

function Game() {
	const refParent = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState<number>(0);
	const navigate = useNavigate();
	const { state } = usePingPongContext();

	useEffect(() => {
		if (state.level != Levels.OpponentFound)
			navigate(-1);
		if (refParent.current)
			setWidth((refParent.current as HTMLElement).offsetWidth);
		const handleResize = () =>{
			if (refParent.current)
				setWidth((refParent.current as HTMLElement).offsetWidth);
		}
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [])

	return (
		<div ref={refParent} className="flex flex-col h-full max-w-[1200px] w-4/5 justify-between items-center gap-[26px]">
			<Header />
			<Table width={width} />
		</div>
	);
}

export default Game;