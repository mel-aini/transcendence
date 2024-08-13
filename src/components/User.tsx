import { CSSProperties, HTMLAttributes, ReactNode } from "react";

interface UserProps extends HTMLAttributes<HTMLDivElement> {
	border?: boolean,
	width?: number | string,
	style?: CSSProperties,
	url: string
	online?: boolean
	className?: string
	children?: ReactNode
}

const User = ({border = false, width = 40, style, url, online, className, children, ...props}: UserProps) => {
	return (
		<div 
			className={`${border ? 'border': ''} relative rounded-full bg-cover bg-center` + (className ? ` ${className}` : '')}
			style={{
				backgroundImage: `url(${url})`,
				width,
				height: width
			}}
			{...props}
			>
				{online && <span className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-green-500 rounded-lg"></span>}
				{children}
        </div>
	);
}

export default User;