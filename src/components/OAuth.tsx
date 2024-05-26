import GoogleSvg from "/google.svg";
import IntraSvg from "/42.svg";
import { HTMLAttributes } from "react";

type Intra = "42";
type Google = "google"

interface OAuthProps extends HTMLAttributes<HTMLDivElement> {
	type: Intra | Google,
	className?: string
}

const OAuth = ({type, className,...props}: OAuthProps) => {
	return (
		<div
			className={"w-[35px] h-[35px] border border-primary rounded-full flex items-center justify-center cursor-pointer" + (className ? (" " + className) : '')}
			{...props}
			>
			<img
				src={type == '42' ? IntraSvg : GoogleSvg}
				width={16}
			/>
		</div>
	)
}

export default OAuth;