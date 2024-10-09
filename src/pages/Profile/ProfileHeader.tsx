import { useProfileContext } from "../../contexts/profileStore";
import LevelBar from "./LevelBar";
import UserActions from "./UserActions";
import {  useEffect, useRef } from "react";
import api from "../../api/axios";
import { useParams } from "react-router-dom";
import edit_icon from "/edit_icon.svg"
import { useGlobalWebSocketContext } from "../../contexts/globalWebSokcketStore";
import { useGlobalContext } from "../../contexts/store";

const ProfileHeader = () => {
	const { dispatch } = useGlobalContext();
	const { state, dispatchProfile } = useProfileContext();
	const { sendJsonMessage } = useGlobalWebSocketContext();
	const { id } = useParams();
	const formRef = useRef<HTMLFormElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const changehandler = async (e: any) => {
		try {
			console.log("here image");
			
			const newImage = e.currentTarget.files[0];
			if (!newImage) return ;
			else if (newImage.size > 1048576) {
				dispatch({type: 'ALERT', content: "failed: Maximum file size is 1MB."});
				return ;
			}
			const formData = new FormData(formRef.current);
			const res = await api.post("upload-avatar/", formData);
			console.log(res);
			
			if (res.status === 200)
			{
				dispatch({type: 'ALERT', content: "Profile image changed successfuly."});
				dispatchProfile({type: "USER_DATA", userData: {...state.userData, profile_image: res.data.url}});
			}
		} catch (err: any) {
			dispatch({type: 'ALERT', content: err.response.data.error});
		} finally {
			inputRef.current && (inputRef.current.value = '');
		}
	}

	// useEffect(() => {
	// 	if (id)
	// 	{
	// 		const checkOnline = setInterval(() => sendJsonMessage( { type: "online", identifier: state.userData?.username } ), 10000);
	// 		return () => clearInterval(checkOnline);
	// 	}
	// }, [state.userData]);

	return (
		<>
			{!state.userData && <div>Loading...</div>}
			{
			state.userData &&
			<>
				<div className="relative mb-[200px] xl:mb-[50px] flex flex-col w-full">
					<div
						style={{backgroundImage: `url(${state.userData.level.image})`}}
						className="w-full h-[209px] rounded-md bg-cover bg-center">
					</div>
					<div className="absolute left-1/2 xl:left-[15%] top-full translate-y-[-60px] -translate-x-1/2 flex flex-col justify-center items-center">
						<div style={{backgroundImage: `url(${state.userData?.profile_image})`}} className="relative rounded-full border-2 border-primary w-[120px] h-[120px] mb-3 bg-cover overflow-hidden">
							{
								(!id) &&
								<form ref={formRef} className="duration-300 hover:opacity-100 opacity-0 w-full h-full bg-[#000000CC]">
									<label htmlFor="avatar_link" className="absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 cursor-pointer"><img src={edit_icon} alt="" width={32} height={32} /></label>
									<input ref={inputRef} onChange={(e) => changehandler(e)} type="file" name="avatar_link" accept="image/*" id="avatar_link" className="hidden" />
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
				</div>
				<LevelBar data={state.userData.level} />
			</>
			}
		</>
	)
}

export default ProfileHeader;