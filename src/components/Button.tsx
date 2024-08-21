import { HTMLAttributes, ReactNode } from "react";
import Polygon from "./Polygon";

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode,
	className?: string,
	type?: 'submit'
	disabled?: boolean
}

const Button = ({children, className, type, disabled = false, ...props}: ButtonProps) => {
	return (
		<button
			disabled={disabled}
			type={type || 'button'} className={"relative group select-none" + (className ? ' ' + className : '') + (disabled ? 'pointer-events-none opacity-50' : '')}>
			<Polygon 
				className={"bg-primary duration-200 italic overflow-hidden"}
				{...props}
			>
				<Polygon
					className={"bg-white absolute -z-10 top-0 -left-full group-hover:left-full duration-300 w-full italic"}
					{...props}
				/>
				{children}
			</Polygon>
			<div className={"polygon-border absolute top-[8px] left-[5px] w-full px-10 h-[42px] bg-white font-semibold"}></div>
		</button>
	)
}

export default Button;