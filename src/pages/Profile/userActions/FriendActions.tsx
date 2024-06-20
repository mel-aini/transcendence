import play_icon from "/play_icon.svg"
import send_icon from "/send_icon.svg"
import more_icon from "/more_icon.svg"

const FriendActions = () => {
	return (
		<div className="w-[140px] h-[40px] flex justify-between items-center">
			<div className="bg-secondary w-[40px] flex justify-center items-center h-full rounded-md">
				<img src={play_icon} alt="" width={20} height={20}/>
			</div>
			{/* <hr className="border-white w-[20px] rotate-90"/> */}
			<div className="bg-secondary w-[40px] flex justify-center items-center h-full rounded-md">
				<img src={send_icon} alt="" width={20} height={20}/>
			</div>
			{/* <hr className="border-white w-[20px] rotate-90"/> */}
			<div className="bg-secondary w-[40px] flex justify-center items-center h-full rounded-md">
				<div className="flex gap-[0.5px]">
					<img src={more_icon} alt="" width={5.36} height={5.36}/>
					<img src={more_icon} alt="" width={5.36} height={5.36}/>
					<img src={more_icon} alt="" width={5.36} height={5.36}/>
				</div>
			</div>
		</div>
	)
}

export default FriendActions;