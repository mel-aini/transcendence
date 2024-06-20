import add_icon from "/add_icon.svg"

const AddFriend = () => {
	return (
		<div className="w-[142px] h-[40px] flex justify-center items-center bg-secondary rounded-md gap-2">
			<span>add friend</span>
			<img src={add_icon} alt="" width={20} height={20}/>
		</div>
	)
}

export default AddFriend;