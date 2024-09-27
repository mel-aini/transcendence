import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Table from "./Table";
import LayoutHeader from "../../../../layout/LayoutHeader";

function Game({isTournament, isAI}: {isTournament: boolean, isAI: boolean}) {
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
	}, [])

	return (
		<div className="flex flex-col items-center w-full">
			<LayoutHeader className="w-full">Playing...</LayoutHeader>
			<div ref={refParent} className="flex flex-col h-full max-w-[1200px] w-full justify-between items-center gap-[26px]">
				<Header isTournament={isTournament} isAI={isAI} />
				<Table width={width} isTournament={isTournament} />
			</div>
		</div>
	);
}

export default Game;