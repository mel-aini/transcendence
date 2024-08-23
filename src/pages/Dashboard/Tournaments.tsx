import { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import JoinTournament from "./JoinTournament";
import Title from "../../components/Title";

interface Props {
	className?: string
}

export const displayContext = createContext<any>({});

const Tournaments = ({ className }: Props) => {
	const [display, setDisplay] = useState<boolean>(false);

	const clickHandler = () => {
		setDisplay(true);
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
				{/* <div onClick={clickHandler}> */}
					<Link to="/tournament">
						<Button className="h-[46px] w-full max-w-[340px]">Create New Tournament</Button>
					</Link>
				{/* </div> */}
			</Container>
			<JoinTournament />
		</displayContext.Provider>
		// </div>
	)
}

export default Tournaments;