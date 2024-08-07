import { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import Container from "../../components/Container";
import NewButton from "../../components/NewButton";
import { Link, useNavigate } from "react-router-dom";
import NewTournement from "./NewTournement";

interface Props {
	className?: string
}

export const displayContext = createContext<any>({});

const Tournements = ({ className }: Props) => {
	const [display, setDisplay] = useState<boolean>(false);

	const clickHandler = () => {
		setDisplay(true);
	}

	return (
		// <div className={className}>
		<displayContext.Provider value={{display, setDisplay}}>
			<Container className="sm:h-[109px] h-[160px] w-full" childClassName="flex flex-col sm:flex-row justify-between items-center p-10 gap-5 sm:gap-14">
				<h1 className="text-4xl md:text-5xl font-semibold">Tournements</h1>
				{/* <div onClick={clickHandler}> */}
					<Link to="/tournement">
						<NewButton className="h-[46px] w-full max-w-[340px]">Create New Tournement</NewButton>
					</Link>
				{/* </div> */}
			</Container>
			<NewTournement />
		</displayContext.Provider>
		// </div>
	)
}

export default Tournements;