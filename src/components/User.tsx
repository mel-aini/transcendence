import { CSSProperties, HTMLAttributes } from "react";

interface UserProps extends HTMLAttributes<HTMLDivElement> {
	border?: boolean,
	width?: number | string,
	style?: CSSProperties,
	url: string
	className?: string
}

const User = ({border = false, width = 40, style, url, className, ...props}: UserProps) => {
	return (
		<div 
			className={`${border ? 'border': ''} rounded-full bg-cover bg-center` + (className ? ` ${className}` : '')}
			style={{
				backgroundImage: `url(${url})`,
				width,
				height: width
			}}
			{...props}
			>
        </div>
	);
}

export default User;