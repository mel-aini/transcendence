import { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import JoinTournament from "./JoinTournament";
import Title from "../../components/Title";
import { useTournamentContext } from "../../contexts/TournamentProvider";
import { useGlobalContext } from "../../contexts/store";
import { ReadyState } from "react-use-websocket";

export const displayContext = createContext<any>({});

const Tournaments = () => {
	const [display, setDisplay] = useState<boolean>(false);
	const { state, dispatch, readyState } = useTournamentContext();
	const { state: profileData } = useGlobalContext();
	const username: string | undefined = profileData.userData?.username;
	const navigate = useNavigate();

	const clickHandler = () => {
		(readyState != ReadyState.OPEN) ? setDisplay(true) : navigate("/Tournament");
	}

	return (
		<displayContext.Provider value={{display, setDisplay}}>
				<div className="grid grid-cols-1 sm:grid-cols-2 h-[400px] bg-secondary rounded-md border-white">
					<div className="flex flex-col justify-between p-10">
						<div className='space-y-8'>
							<Title 
								firstCharClassName='md:text-5xl sm:text-4xl text-3xl'
								restWordClassName="md:text-4xl sm:text-3xl text-2xl"
									>Tournament
							</Title>
							<p>Lorem ipsum dolor sit amet consectetur. Interdum maecenas quis porttitor nunc et habitant vestibulum risus facilisis.</p>
						</div>
						<div onClick={clickHandler}>
							<Button className="h-full w-full max-w-[340px]">Join Tournament</Button>
						</div>
					</div>
					<div className="hidden sm:block grow shrink-0 bg-login bg-no-repeat bg-cover bg-top">
						<div className="w-full h-full bg-gradient-to-l from-transparent to-secondary"></div>
					</div>
				</div>
			<JoinTournament />
		</displayContext.Provider>
	)
}

export default Tournaments;