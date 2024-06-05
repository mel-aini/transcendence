import { createContext, useState } from "react";
import { friends } from "./__test__/match";
import AllFriends from "./AllFriends";

export const context = createContext<any>({});

const Friends = () => {
	// const [width, setWidth] = useState<number | null>(null);
	const [seeAll, setSeeAll] = useState<boolean>(false);

	return (
		<context.Provider value={{seeAll, setSeeAll}}>
			<div className="w-full">
				<div className="rounded-xl flex justify-center gap-5 items-center border-primary border h-[95px]">
					{friends.map((friend, key) => {
						return (
							<img key={key} className="w-[38px] h-[38px] rounded-full" src={`/${friend.name}.jpeg`}/>
						)
					})}
					<span className="cursor-pointer select-none" onClick={() => setSeeAll(true)}>see all</span>
					<AllFriends />
				</div>
			</div>
		</context.Provider>
	)
}

export default Friends;