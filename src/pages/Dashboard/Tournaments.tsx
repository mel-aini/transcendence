import { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import JoinTournament from "./JoinTournament";
import Title from "../../components/Title";
import { Tournament_WS_URL, useTournamentContext } from "../../contexts/TournamentProvider";
import { useGlobalContext } from "../../contexts/store";
import { ReadyState } from "react-use-websocket";

interface Props {
	className?: string
}

export const displayContext = createContext<any>({});

const Tournaments = ({ className }: Props) => {
	const [display, setDisplay] = useState<boolean>(false);
	const { state, dispatch, readyState } = useTournamentContext();
	const { state: profileData } = useGlobalContext();
	const username: string | undefined = profileData.userData?.username;
	const navigate = useNavigate();

	const clickHandler = () => {
		(readyState != ReadyState.OPEN) ? setDisplay(true) : navigate("/Tournament");
	}

	return (
		// <div className={className}>
		<displayContext.Provider value={{display, setDisplay}}>
			<Container className="sm:h-[109px] h-[160px] w-full" childClassName="flex flex-col sm:flex-row justify-between items-center p-10 gap-5 sm:gap-14">
						<Title 
							firstCharClassName='text-5xl '
							restWordClassName="text-4xl"
								>Tournament
						</Title>
				<div onClick={clickHandler}>
					<Button className="h-full w-full max-w-[340px]">Join Tournament</Button>
				</div>
			</Container>
			<JoinTournament />
		</displayContext.Provider>
		// </div>
	)
}

export default Tournaments;