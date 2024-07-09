import NewButton from "../../../../components/NewButton";
import UserBox from "./UserBox";

function Result({xp}: {xp: number}) {

	return (
		<div className="w-full flex flex-col justify-between items-center">
			{
				(xp > 0) ?
				<h1 className="text-third text-center text-4xl pb-11">Congratulations, you win</h1>
				:
				<h1 className="text-[#DD1B1B] text-center text-4xl pb-11">oops, You Lose</h1>
			}
			<span className="text-[#FFD214] text-center text-xl pb-11">+{xp} XP</span>
			<span className="text-center text-2xl pb-[53px]">Final score:</span>
			<div className="flex flex-col md:flex-row w-full justify-center items-center gap-4 pb-[53px]">
				<UserBox username="user1" level={3} userImage="" />
				<div className={"w-[86px] h-[86px] flex justify-center items-center rounded-[10px] border-border bg-secondary shrink-0 text-[32px] " + ((xp > 0) ? "text-primary" : "")}>
					10
				</div>
				<div className={"w-[86px] h-[86px] flex justify-center items-center rounded-[10px] border-border bg-secondary shrink-0 text-[32px] " + ((xp == 0) ? "text-primary" : "")}>
					8
				</div>
				<UserBox username="user2" level={10} userImage="" />
			</div>
			<NewButton className="max-w-[344px] h-full w-full">continue</NewButton>
		</div>
	);
}

export default Result;