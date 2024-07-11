import { useState } from "react";
import { useProfileContext } from "../../../contexts/profileStore";
import EditBar from "./EditBar";

function TFA() {
	// const {state, dispatchProfile} = useProfileContext();
	const [enableTFA, setEnableTFA] = useState<-1 | 0 | 1>(0); //state.userData?.tfa.status

	const clickHandler = () => {
		if (enableTFA === 0 || enableTFA === -1)
			setEnableTFA(1);
		else if (enableTFA === 1)
			setEnableTFA(0);
	}

	return (
		<div className="flex flex-col gap-[19px]">
			<div className="flex justify-between items-center">
				<span className="font-medium">Two factor authentication</span>
				<div onClick={clickHandler} className={"relative w-[33px] h-[17px] rounded-[60px] border " + ((enableTFA === 1) ? "border-primary" : "")}>
					<span
					className={"absolute w-[19px] h-[19px] rounded-full top-[-2px] border border-secondary duration-300 "
					+ ((enableTFA === 1) ? "left-[13px] bg-primary" : "left-[-1px] bg-white")}
					/>
				</div>
			</div>
			{
				(enableTFA === 1) &&
				<>
					<span className="font-light">Enter an email to enable the 2FA and where we will sent you the otp code</span>
					<EditBar type="tfa"/>
				</>
			}
		</div>
	);
}

export default TFA;