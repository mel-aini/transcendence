import { forwardRef, useEffect } from "react";
import { Player } from "../../contexts/TournementProvider";

interface playerProp {
	player: Player | string,
	isRightSide?: boolean
}

const PlayerBar = forwardRef((props: playerProp, ref) => {

	useEffect(() => {
		console.log("here");
	}, []);

	return (
		<div ref={ref} className={"relative h-[61px] max-w-[163px] min-w-[53px] " + (props.isRightSide && "rotate-180")}>
			<div className="h-full w-full bg-secondary rounded-[8px] border border-border flex gap-3 items-center justify-center md:justify-start md:px-4">
				{
					(props.player != "player") &&
					<>
						<img src={props.player.image} alt="" className="w-[41px] h-[41px] rounded-full border border-border overflow-hidden shrink-0"/>
						<span className="md:block hidden truncate">{props.player.username}</span>
					</>
				}
			</div>
		</div>
	);
})

export default PlayerBar;