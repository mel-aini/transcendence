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
			<PingPong  />
			<Tournaments />
		</div>
	)
}

export default Index;