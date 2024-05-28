import pen_icon from "../../../public/pen_icon.svg"

const EditProfile = () => {
	return (
		<div className="w-[144px] h-[22px] flex justify-center items-center gap-1">
			<span className="text-primary">edit profile</span>
			<img src={pen_icon} alt="" width={28.04} height={22}/>
		</div>
	)
}

export default EditProfile;