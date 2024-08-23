import { useLocation, useNavigate } from "react-router-dom";
import Incoming from "./Incoming";
import PingPong from "./PingPong";
import Tournaments from "./Tournaments";
import { useGlobalContext } from "../../contexts/store";
import { createContext, useEffect, useState } from "react";
import NewTournament from "./JoinTournament";
import AllTournaments from "./AllTournaments";
import { FiSearch } from "react-icons/fi";

{/* <div className="w-full relative z-0 mt-10 mb-52"> */}
const Index = () => {

	return (
		<div className="w-full relative space-y-8">
			<div className="flex flex-col gap-10 lg:flex-row lg:items-end w-full">
				<PingPong className="w-full grow order-2 lg:order-1" />
				{/* <Incoming className=" w-auto lg:order-2" /> */}
			</div>
			<Tournaments />
			<div className="place-content-end flex items-center h-[50px] gap-3 w-full">
				<input type="text" placeholder="search for a tournament" className="max-w-[602px] w-[90%] h-full px-3 bg-transparent border border-border focus:border-primary outline-none duration-200 rounded-md" />
				<div  className="w-[50px] shrink-0 h-full flex justify-center items-center border border-border rounded-md cursor-pointer">
					<FiSearch className='text-2xl' />
				</div>
			</div>
			<AllTournaments />
		</div>
	)
}

export default Index;