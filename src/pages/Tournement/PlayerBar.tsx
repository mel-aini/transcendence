import { forwardRef, useEffect } from "react";
import { Player } from "../../contexts/TournementProvider";

interface playerProp {
	player: Player | string,
	isRightSide?: boolean
}

const PlayerBar = forwardRef((props: playerProp, ref) => {

	return (
		<div ref={ref} className={"h-[61px] w-[163px] " + (props.isRightSide ? "rotate-180" : "")}>
			<div className="h-full w-full bg-secondary rounded-[8px] border border-border flex gap-3 items-center px-4">
				{
					(props.player != "player") ?
					<>
						<img src={props.player.image} alt="" className="w-[41px] h-[41px] rounded-full border border-border overflow-hidden shrink-0"/>
						<span className="truncate">{props.player.username}</span>
					</>
					:
					<>
						<span className="animate-pulse w-[41px] h-[41px] rounded-full bg-border shrink-0"/>
						<span className="animate-pulse w-full h-[20px] bg-border rounded-lg"/>
					</>
				}
			</div>
		</div>
	);
})

export default PlayerBar;
		// <div ref={ref} className={"h-[61px] xl:w-[163px] sm:w-[73px] w-full min-w-[61px] " + (props.isRightSide ? "rotate-180" : "")}>
		// 	<div className="h-full w-full bg-secondary rounded-[8px] border border-border flex gap-3 items-center justify-center md:justify-start md:px-4 px-1">
		// 		{
		// 			(props.player != "player") ?
		// 			<>
		// 				<img src={props.player.image} alt="" className="w-[41px] h-[41px] rounded-full border border-border overflow-hidden shrink-0"/>
		// 				<span className="xl:block hidden truncate">{props.player.username}</span>
		// 			</>
		// 			:
		// 			<>
		// 				<span className="animate-pulse w-[41px] h-[41px] rounded-full bg-border shrink-0"/>
		// 				<span className="animate-pulse xl:block hidden w-full h-[20px] bg-border rounded-lg"/>
		// 			</>
		// 		}
		// 	</div>
		// </div>