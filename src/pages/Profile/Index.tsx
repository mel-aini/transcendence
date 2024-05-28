import States from "./States";
import History from "./History";
import Friends from "./Friends";
import ProfileHeader from "./ProfileHeader";

const Index = () => {
	return (
		<div className="flex flex-col justify-center items-center">
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