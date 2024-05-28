import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/store";
import States from "./States";
import History from "./History";
import Friends from "./Friends";
import LevelBar from "./LevelBar";
import NavBar from "../../components/NavBar";

const Index = () => {
	const navigate = useNavigate();
	const {dispatch} = useGlobalContext();

	return (
		<div className="bg-bg w-11/12 max-w-[1500px] m-auto min-h-[100vh] flex flex-col py-20 justify-center items-center">
			<LevelBar />
			<div className="w-full 2xl:px-0">
				<div className="flex flex-col xl:flex-row pt-20 gap-5">
					<div className="sm:min-w-[560px] flex flex-col-reverse xl:flex-col gap-5">
						<States />
						<Friends />
					</div>
					<History />
				</div>
			</div>
				{/* <div>
					<a onClick={() => {
						dispatch({type: 'LOGOUT'})
						navigate('/')
					}} className="cursor-pointer hover:underline">logout</a>
				</div> */}
		</div>
	);
}

export default Index;