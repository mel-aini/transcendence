import { HTMLAttributes, ReactNode, useState } from "react";
import Polygon from "./Polygon";

type Variants = 'primary' | 'secondary'

interface NewButtonProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode,
	className?: string,
	type?: 'submit'
	onClick?: any,
	variant?: Variants
}

const NewButton = ({children, className, onClick, type, variant = 'primary', ...props}: NewButtonProps) => {
	const [clicked, setClicked] = useState(false);
	const primaryStyle = 'bg-primary'
	const secondaryStyle = 'bg-secondary font-[500]' 

	const appliedStyle = variant == 'primary' ? primaryStyle : secondaryStyle

	return (
		<button type={type || 'button'} className={"relative select-none" + (className ? ' ' + className : '')}>
			<Polygon 
				className={"bg-primary duration-200 " + appliedStyle}
				style={{transform: clicked ? 'translate(5px, 8px)' : 'translate(0, 0)'}}
				onClick={(e) => {
					if (!clicked) {
						setClicked(true);
						setTimeout(() => setClicked(false), 200)
					}
					if (onClick) onClick(e);
				}}
				{...props}
			>
				{children}
			</Polygon>
			<div className={"polygon-border absolute top-[8px] left-[5px] w-full px-10 h-[42px] bg-white flex justify-center items-center font-semibold"}></div>
		</button>
	)
}

export default NewButton;