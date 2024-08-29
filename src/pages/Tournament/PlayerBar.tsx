import { forwardRef, useEffect } from "react";
import { Player, useTournamentContext } from "../../contexts/TournamentProvider";
import { useGlobalContext } from "../../contexts/store";
import { GiCrownOfThorns } from "react-icons/gi";
import { GiCrenelCrown } from "react-icons/gi";

interface playerProp {
	player: Player | string,
	isRightSide?: boolean,
	isWinner?: boolean,
}

const PlayerBar = forwardRef((props: playerProp, ref) => {
	const {state} = useTournamentContext();

	return (
		<div ref={ref} className={"h-[61px] w-[163px] " + (props.isRightSide ? "rotate-180" : "")}>
			<div className="h-full w-full bg-secondary rounded-[8px] border flex gap-3 items-center px-4 border-border">
				{
					(props.player != "player") ?
					<>
						<div className="relative shrink-0">
							{ props.isWinner && <GiCrenelCrown className="absolute w-[41px] h-[41px] -translate-x-1/2 -translate-y-1/2 top-[-10%] left-1/2" fill="#14ffec"/> }
							<img src={props.player.image} alt="" className="w-[41px] h-[41px] rounded-full border overflow-hidden shrink-0 border-border" />
						</div>
						<span className={"truncate " + ((state.alias == props.player.username) ? "text-primary" : "")}>{props.player.username}</span>
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
