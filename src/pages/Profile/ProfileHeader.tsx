import { useProfileContext } from "../../contexts/profileStore";
import { UserData } from "../../types/profile";
import LevelBar from "./LevelBar";
import UserActions from "./UserActions";
import { useContext } from "react";
import { profileContext } from "./Index";

// interface DataProps {
// 	user: string,
// 	data: UserData | null
// }

const ProfileHeader = () => {
	// const userData = useContext(profileContext);
	const { state } = useProfileContext();
	const user = window.location.pathname.substring(1);

	return (
		<>
			{!state.userData && <div>Loading...</div>}
			{
			state.userData && <>
				<div className="relative mb-[200px] xl:mb-[50px] flex flex-col w-full">
					<div
						style={{backgroundImage: `url(${state.userData.bg_image})`}}
						className="w-full h-[209px] rounded-md bg-cover bg-center">
					</div>
					<div className="absolute left-1/2 xl:left-[15%] top-full translate-y-[-60px] -translate-x-1/2 flex flex-col justify-center items-center">
						<div
							style={{backgroundImage: `url(${state.userData.profile_image})`}} 
							className="rounded-full border-2 border-primary w-[120px] h-[120px] mb-3 bg-cover">
						</div>
						<div className="flex flex-col mb-5">
							<span className="text-center">{state.userData.username}</span>
							{
								(user != 'profile') &&
								<div className="flex justify-center items-center gap-1">
									{
										state.userData.online &&
										<>
											<span className="font-thin text-[12px]">online</span>
											<span className="w-[8px] h-[8px] rounded-full bg-[#1ED947]"></span>
										</>
									}
								</div>
							}
						</div>
						<UserActions isProfile={user == 'profile'} />
					</div>
					<div className="absolute left-[90%] top-full translate-y-[-37px] -translate-x-1/2 bg-[#14FF67] w-[39px] h-[74px] xl:w-[67.5px] xl:h-[128px]
					xl:translate-y-[-64px] duration-100"></div>
				</div>
				<LevelBar data={state.userData.level} />
			</>
			}
		</>
	)
}

export default ProfileHeader;