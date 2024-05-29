import play_icon from "/play_icon.svg"
import send_icon from "/send_icon.svg"
import more_icon from "/more_icon.svg"

const FriendActions = () => {
	return (
		<div className="w-[144.36px] h-[20px] flex justify-between items-center">
			<img src={play_icon} alt="" width={20} height={20}/>
			<hr className="border-white w-[20px] rotate-90"/>
			<img src={send_icon} alt="" width={20} height={20}/>
			<hr className="border-white w-[20px] rotate-90"/>
			<div className="flex gap-[0.5px]">
				<img src={more_icon} alt="" width={5.36} height={5.36}/>
				<img src={more_icon} alt="" width={5.36} height={5.36}/>
				<img src={more_icon} alt="" width={5.36} height={5.36}/>
			</div>
		</div>
	)
}

export default FriendActions;