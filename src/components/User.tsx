import { CSSProperties, HTMLAttributes } from "react";

interface UserProps extends HTMLAttributes<HTMLDivElement> {
	border?: boolean,
	width?: number | string,
	height?: number | string,
	style?: CSSProperties,
	className?: string
}

const User = ({border = false, width = 40, height = 40, style, className, ...props}: UserProps) => {
	return (
		<div 
			className={`${border ? 'border': ''} rounded-full bg-cover bg-center`}
			style={{
				backgroundImage: 'url(https://cdn.intra.42.fr/users/310f20caa8f2fff044bda72e14f997ea/ochouikh.jpg)',
				width,
				height
			}}
			{...props}
			>
        </div>
	);
}

export default User;