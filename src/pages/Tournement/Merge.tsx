import { useEffect } from "react";

function Merge({height}: {height: number}) {

	useEffect(() => {
		console.log(height);
	}, []);

	return (
		<div className="flex items-center w-[54px]" style={{height: `${height}px`}}>
			<span className="w-1/2 border-t border-b h-full border-r" />
			<span className="w-1/2 border-t" />
		</div>
	);
}

export default Merge;