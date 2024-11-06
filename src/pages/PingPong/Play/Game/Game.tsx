import { useEffect, useRef } from "react";
import Header from "./Header";
import Table from "./Table";
import LayoutHeader from "@/layout/LayoutHeader";
import { useGlobalContext } from "@/contexts/store";
import { twMerge } from "tailwind-merge";

function Game({isTournament}: {isTournament: boolean}) {
	const refParent = useRef<HTMLDivElement>(null);
	const {state, dispatch}  = useGlobalContext();

	useEffect(() => {
		const handleOrientationChange = () => {
			const orientation = window.screen.orientation.type;
			dispatch({type: 'ORIENTATION', isOrientation: orientation == "landscape-primary"})
		}
		window.addEventListener('orientationchange', handleOrientationChange);
		return () => {
			window.removeEventListener('orientationchange', handleOrientationChange);
		};
	}, [])

	return (
		<div className="flex flex-col items-center w-full">
			{!state.isOrientation && <LayoutHeader className="w-full">Playing...</LayoutHeader>}
			<div ref={refParent} className={twMerge("flex flex-col h-full max-w-[1200px] w-full justify-between items-center gap-[26px]", !state.isOrientation ? 'w-[60%]' : 'w-full')}>
				<Header isTournament={isTournament} />
				<Table isTournament={isTournament} />
			</div>
		</div>
	);
}

export default Game;