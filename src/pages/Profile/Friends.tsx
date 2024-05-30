import { useEffect, useRef, useState } from "react";
import Title from "./Title";
import { friends } from "./__test__/match";

const Friends = () => {
	const parentRef = useRef();
	const [width, setWidth] = useState<number | null>(null);
	let n = 0;

	useEffect(() => {
		setWidth(parentRef.current.offsetWidth);
		window.addEventListener('resize', () => {
			setWidth(parentRef.current.offsetWidth);
		})
		// return () => {
		// 	window.removeEventListener('resize')
		// }
	}, [])
	return (
		<div className="w-full">
			{/* <Title width={105} height={30} title="Friends"/> */}
			<div ref={parentRef} className="rounded-xl flex justify-center gap-5 items-center border-primary border h-[95px]">
				{friends.map((friend, key) => {
					return (
						<img key={key} className="w-[38px] h-[38px] rounded-full" src={`/${friend.name}.jpeg`}/>
					)
				})}
				<span className="cursor-pointer">see all</span>
			</div>
		</div>
	)
}

export default Friends;