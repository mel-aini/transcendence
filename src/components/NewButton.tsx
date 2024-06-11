import { HTMLAttributes, ReactNode } from "react";
import Polygon from "./Polygon";

type Variants = 'primary' | 'secondary'

interface NewButtonProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode,
	className?: string,
	type?: 'submit'
	disabled?: boolean
	variant?: Variants
}

const NewButton = ({children, className, type, disabled, variant = 'primary', ...props}: NewButtonProps) => {
	const primaryStyle = 'bg-primary'
	const secondaryStyle = 'bg-secondary font-[500]' 
	const appliedStyle = variant == 'primary' ? primaryStyle : secondaryStyle

	return (
		<button type={type || 'button'} className={"relative select-none" + (className ? ' ' + className : '') + (disabled ? 'pointer-events-none opacity-50' : '')}>
			<Polygon 
				className={"bg-primary duration-200 " + appliedStyle}
				{...props}
			>
				{children}
			</Polygon>
			<div className={"polygon-border absolute top-[8px] left-[5px] w-full px-10 h-[42px] bg-white flex justify-center items-center font-semibold"}></div>
		</button>
	)
}

export default NewButton;