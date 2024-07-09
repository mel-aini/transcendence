import { useEffect, useLayoutEffect, useRef, useState } from "react";
import edit_icon from "/edit_icon.svg"
import accept from "/accept.svg"
import { useProfileContext } from "../../../contexts/profileStore";
import { validate } from "../../../utils/validation";
import { AnimatePresence, motion } from "framer-motion";
import { ring } from 'ldrs'

ring.register()

function EditBar({type}: {type: "username" | "email"}) {
	const { state, dispatchProfile } = useProfileContext();
	let newValue: string | undefined = (type === "username") ? state.userData?.username : state.userData?.matches.email;
	const [editStatus, setEditStatus] = useState<"edit" | "wait" | "save">("edit");
	const [Error, setError] = useState<boolean>(false);
	const inputRef = useRef();
	const buttRef = useRef();

	const changehandler = (e: any) => {
		newValue = e.currentTarget.value;
		if (!validate("username", newValue))
			setError(true);
		else
			setError(false);
	}

	const clickHandler = async () => {
		if (editStatus === "edit" && !Error)
		{
			setEditStatus("save");
			inputRef.current.disabled = false;
		}
		if (editStatus === "save"  && !Error)
		{
			// setEditStatus("wait");
			// inputRef.current.disabled = false;
			// if (type === "username" && newValue !== state.userData?.username)
			// {
			// 	setEditStatus("edit");
			// }
			// else if (type === "email" && newValue !== state.userData?.matches.email)
			// {
			// 	setEditStatus("edit");
			// }
			// else
				setEditStatus("save");
			// if (editStatus === "save")
				inputRef.current.disabled = true;
		}
	}

	useLayoutEffect(() => {
		inputRef.current.value = newValue;
	}, [])

	return (
		<div className="flex gap-2 justify-between h-12">
			<div className="relative w-full h-full">
				<input ref={inputRef} disabled onChange={(e) => changehandler(e)} type="text" className={"w-full border outline-none py-3 px-4 h-full rounded-[5px] bg-transparent " + ((editStatus === "edit") ? "opacity-50 " : " ") + ((Error) ? "border-red-600" : "border-border")} placeholder={type} />
				{Error && <motion.span
				initial={{left: '0%'}}
				animate={{left: '5%'}}
				transition={{duration: 0.3}}
				className="absolute -top-[21%] left-[5%] text-red-600 text-sm bg-secondary px-2">invalid {type}</motion.span>}
			</div>
			<span ref={buttRef} onClick={() => clickHandler()} className="w-[48px] h-full border border-border rounded-[5px] flex justify-center items-center select-none cursor-pointer">
			{
				(editStatus === "edit") && <img src={edit_icon} alt="" width={32} height={32}/>
			}
			{
				(editStatus === "wait") && 
				<l-ring
				size="24"
				stroke="2"
				bg-opacity="0"
				speed="2" 
				color="white"
				/>
			}
			{
				(editStatus === "save") && <img src={accept} alt="" width={24} height={24}/>
			}
			</span>
		</div>
	);
}

export default EditBar;