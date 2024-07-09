import { AnimatePresence, motion } from "framer-motion";
import { useProfileContext } from "../../../contexts/profileStore";
import { useRef, useState } from "react";
import { primaryColor, whiteColor } from "../../../utils/colors";
import EditBar from "./EditBar";

function Settings() {
	const { dispatchProfile } = useProfileContext();
	const [section, setSection] = useState<"Profile" | "Security">("Profile");

	const clickHandler = (type: "Profile" | "Security" | "save") => {
		if (type === "save")
			dispatchProfile({type: "SETTINGS" , settings: false});
		if (type === "Profile" && section !== "Profile")
			setSection("Profile");
		if (type === "Security" && section !== "Security")
			setSection("Security");
	}

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
					<motion.div className="max-w-[132px] w-full h-6 flex justify-between items-center">
						<motion.span
						initial={{opacity:(section === "Profile") ? 0.5 : 1, color: (section === "Profile") ? whiteColor : primaryColor}}
						animate={{opacity:(section === "Profile") ? 1 : 0.5, color: (section === "Profile") ? primaryColor : whiteColor}}
						transition={{duration: 0.2, ease: "linear"}}
						onClick={() => clickHandler("Profile")} className={"select-none cursor-pointer "}>Profile</motion.span>
						<motion.span
						initial={{opacity:(section === "Security") ? 0.5 : 1, color: (section === "Security") ? whiteColor : primaryColor}}
						animate={{opacity:(section === "Security") ? 1 : 0.5, color: (section === "Security") ? primaryColor : whiteColor}}
						transition={{duration: 0.2, ease: "linear"}}
						onClick={() => clickHandler("Security")} className={"select-none cursor-pointer "}>Security</motion.span>
					</motion.div>
						<div className="w-full h-[90%] flex flex-col justify-between">

							{
								(section === "Profile") &&
								<div className="flex flex-col gap-[17px]">
									<span>username</span>
									<EditBar type="username" />
									<span>email</span>
									<EditBar type="email" />
								</div>
							}
							{
								(section === "Security") &&
								<div>Loading...</div>
							}
							<span onClick={() => clickHandler("save")}
							onMouseEnter={(e) => {e.currentTarget.classList.replace("opacity-50", "opacity-100");}}
							onMouseLeave={(e) => {e.currentTarget.classList.replace("opacity-100", "opacity-50");}}
							className="opacity-50 self-end cursor-pointer select-none">close</span>
						</div>
				</div>
		</motion.div>
		</AnimatePresence>
	);
}

export default Settings;