import { AnimatePresence, motion } from "framer-motion";
import { useProfileContext } from "../../contexts/profileStore";
import edit_icon from "/edit_icon.svg"
import accept from "/accept.svg"

function Settings() {
	const { state, dispatchProfile } = useProfileContext();

	return (
		<AnimatePresence>
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			transition={{duration: 0.3}}
			exit={{ opacity: 0}}
			className="absolute z-10">
			<div className="fixed top-0 start-0 bg-black opacity-70 w-full min-h-[100vh]" onClick={() => dispatchProfile({type: "SETTINGS" , settings: false})}/>
				<div className="z-50 fixed bg-secondary max-h-[663px] max-w-[652px] w-[90%] h-[90%] rounded-[10px] left-[50%] -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-between px-11 pt-16 pb-9">
					<div className="max-w-[132px] w-full h-6 flex justify-between items-center">
						<span className="text-primary">Profile</span>
						<span>Security</span>
					</div>
					<div className="w-full h-[90%] flex flex-col justify-between">
						<div className="flex flex-col gap-[17px]">
							<span>username</span>
							<div className="flex gap-2 justify-between h-12">
								<input type="text" className="w-full border border-border outline-none py-3 px-4 h-full rounded-[5px] bg-transparent" placeholder="username" />
								<span className="w-[48px] h-full border border-border rounded-[5px] flex justify-center items-center">
									<img src={edit_icon} alt="" width={32} height={32}/>
								</span>
							</div>
							<span>email</span>
							<div className="flex gap-2 justify-between h-12">
								<input type="email" className="w-full border border-border outline-none py-3 px-4 h-full rounded-[5px] bg-transparent" placeholder="email" />
								<span className="w-[48px] h-full border border-border rounded-[5px] flex justify-center items-center">
									<img src={accept} alt="" width={24} height={24}/>
								</span>
							</div>
						</div>
						<span onClick={() => dispatchProfile({type: "SETTINGS" , settings: false})}
						onMouseEnter={(e) => {e.currentTarget.classList.replace("opacity-50", "opacity-100");}}
						onMouseLeave={(e) => {e.currentTarget.classList.replace("opacity-100", "opacity-50");}}
						className="opacity-50 self-end cursor-pointer select-none">save and close</span>
					</div>
				</div>
		</motion.div>
		</AnimatePresence>
	);
}

export default Settings;