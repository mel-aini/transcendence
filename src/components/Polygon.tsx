import { HTMLAttributes, ReactNode } from "react";

interface PolygonProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode,
	className?: string
}

const Polygon = ({children, className, ...props}: PolygonProps) => {
	return (
		<div 
			className={
				"polygon px-10 h-[42px] flex justify-center items-center text-bg font-semibold relative z-10 cursor-pointer" + (className ? ' ' + className : '')
			}
			{...props}
		>
			{children}
		</div>
	)
}

export default Polygon;