import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/store";
import States from "./States";
import History from "./History";
import Friends from "./Friends";
import ProfileHeader from "./ProfileHeader";

const Index = () => {
	const navigate = useNavigate();
	const {dispatch} = useGlobalContext();

	return (
		<div className="bg-bg w-11/12 mx-auto max-w-[1500px] min-h-[100vh] flex flex-col justify-center items-center">
			<ProfileHeader />
			<div className="w-full 2xl:px-0 ">
				<div className="flex flex-col xl:flex-row pt-20 xl:mt-[75px] gap-5">
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