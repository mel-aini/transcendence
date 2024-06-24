import edit_icon from "/edit_icon.svg"

const EditProfile = () => {
	return (
		<div className="w-[142px] h-[40px] bg-secondary rounded-md flex justify-center items-center gap-1 cursor-pointer select-none">
			<span>edit profile</span>
			<img src={edit_icon} alt="" width={22} height={22}/>
		</div>
	)
}

export default EditProfile;