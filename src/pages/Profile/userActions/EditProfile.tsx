import { useProfileContext } from "../../../contexts/profileStore";
import edit_icon from "/edit_icon.svg"

const EditProfile = () => {
	const { dispatchProfile } = useProfileContext();
	return (
		<div onClick={() => dispatchProfile({type: "SETTINGS" , settings: true})}className="w-[142px] h-[40px] bg-secondary rounded-md flex justify-center items-center gap-1 cursor-pointer select-none">
			<span>edit profile</span>
			<img src={edit_icon} alt="" width={22} height={22}/>
		</div>
	)
}

export default EditProfile;