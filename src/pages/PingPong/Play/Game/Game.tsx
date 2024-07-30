import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Table from "./Table";
import { usePingPongContext } from "../../../../contexts/pingPongProvider";

function Game() {
	const refParent = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState<number>(0);

	useEffect(() => {
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
	}, []);

	return (
		<div ref={refParent} className="flex flex-col h-full max-w-[1200px] w-4/5 justify-between items-center gap-[26px]">
			<Header />
			<Table width={width} />
		</div>
	);
}

export default Game;