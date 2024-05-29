import { UserData } from "../../types/profile";
import EditProfile from "./EditProfile";
import FriendActions from "./FriendActions";
import LevelBar from "./LevelBar";

interface DataProps {
	data: UserData | null
}

const ProfileHeader = ({data}: DataProps) => {
	// console.log(data);
	return (
		<>
			{!data && <div>Loading...</div>}
			{data && <>
				<div className="relative mb-[200px] xl:mb-[50px] flex flex-col w-full">
					<div
						style={{backgroundImage: `url(${data.bg_image})`}}  
						className="w-full h-[209px] rounded-md bg-cover bg-center">
					</div>
					<div className="absolute left-1/2 xl:left-[15%] top-full translate-y-[-60px] -translate-x-1/2 flex flex-col justify-center items-center">
						<div
							style={{backgroundImage: `url(${data.profile_image})`}} 
							className="rounded-full border-2 border-primary w-[120px] h-[120px] mb-3 bg-cover">
						</div>
						<div className="mb-5">
							<span>{data.username}</span>
							<div className="flex justify-center items-center gap-1">
								<span className="font-thin text-[12px]">online</span>
								{data.online && <span className="w-[8px] h-[8px] rounded-full bg-[#1ED947]"></span>}
							</div>
						</div>
						<EditProfile />
					</div>
					<div className="absolute left-[90%] top-full translate-y-[-37px] -translate-x-1/2 bg-[#14FF67] w-[39px] h-[74px] xl:w-[67.5px] xl:h-[128px]
					xl:translate-y-[-64px] duration-100"></div>
				</div>
				<LevelBar data={data.level} />
			</>}
		</>
	)
}

export default ProfileHeader;