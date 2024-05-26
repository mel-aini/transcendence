import { SVGProps } from "react";

interface ButtonProps extends SVGProps<SVGGElement> {
	children: string,
	width?: number,
	height?: number | string
	className?: string,
	svgClassName?: string
}

const Button = ( { 
	children, 
	width = 200, 
	height = 35,
	className, 
	svgClassName, 
	...props } : ButtonProps) => {

	return (
		<button
			className={"select-none" + (className ? (" " + className) : '')}
			style={{ width, height }}>
			<svg
				width={ width }
				height={ height }
				viewBox={`0 0 ${ width } ${ height }`}
			>
				<g 
					className={"cursor-pointer hover:opacity-90 duration-300" + (svgClassName ? (" " + svgClassName) : '')}
					{...props}
					>
					<polygon
						points={`25, 0 ${width}, 0 ${width}, ${height} 0,${height}`}
						className="fill-primary"
					/>
					<text x={`${width - 12}`} y="65%" textAnchor="end" className="font-semibold fill-white">{children}</text>
				</g>
			</svg>
		</button>
	);
}

export default Button;

// Documentation:

/*



*/