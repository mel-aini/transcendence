import { useProfileContext } from "../../contexts/profileStore";
import { UserData } from "../../types/profile";
import LevelBar from "./LevelBar";
import UserActions from "./UserActions";
import { useContext, useEffect, useRef, useState } from "react";
import { profileContext } from "./Index";
import api from "../../api/axios";
import { useParams } from "react-router-dom";
import Settings from "../Settings/Index";
import edit_icon from "/edit_icon.svg"

const ProfileHeader = () => {
	const { state, dispatchProfile } = useProfileContext();
	// const user = window.location.pathname.substring(1);
	const { id } = useParams();
	const formRef = useRef();

	const changehandler = async (e: any) => {
		const newImage = e.currentTarget.files[0];
		if (!newImage) return ;
		const formData = new FormData(formRef.current);
		const res = await api.post("api/upload-avatar/", formData);
		if (res.status === 200)
			dispatchProfile({type: "USER_DATA", userData: {...state.userData, profile_image: res.data.url}});
	}

	return (
		<>
			{!state.userData && <div>Loading...</div>}
			{
			state.userData &&
			<>
				<div className="relative mb-[200px] xl:mb-[50px] flex flex-col w-full">
					<div
						style={{backgroundImage: `url(${state.userData.bg_image})`}}
						className="w-full h-[209px] rounded-md bg-cover bg-center">
					</div>
					<div className="absolute left-1/2 xl:left-[15%] top-full translate-y-[-60px] -translate-x-1/2 flex flex-col justify-center items-center">
						<div style={{backgroundImage: `url(${state.userData?.profile_image})`}} className="relative rounded-full border-2 border-primary w-[120px] h-[120px] mb-3 bg-cover overflow-hidden">
							{
								(!id) &&
								<form ref={formRef} className="duration-300 hover:opacity-100 opacity-0 w-full h-full bg-[#000000CC]">
									<label htmlFor="avatar_link" className="absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 cursor-pointer"><img src={edit_icon} alt="" width={32} height={32} /></label>
									<input onChange={(e) => changehandler(e)} type="file" name="avatar_link" accept="image/*" id="avatar_link" className="hidden" />
								</form>
							}
						</div>
						<div className="flex flex-col mb-5">
							<span className="text-center">{state.userData.username}</span>
							{
								(id && state.userData.relation !== 'you') &&
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
						<UserActions isProfile={id === undefined} />
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