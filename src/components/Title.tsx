import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<'div'> {
	children: string
	firstCharClassName?: string
	restWordClassName?: string
	className?: string
}

function Title({ children, className, firstCharClassName, restWordClassName }: Props) {
	const words = children.split(' ');
	return ( 
		<div className={className}>
			{
				words.map((word, index) => {
					const firstChar = word.charAt(0);
					const restWord = word.slice(1);
					return (
						<div key={index} className="inline">
							<span className={twMerge('font-semibold italic uppercase', firstCharClassName)}>{firstChar}</span>
							<span className={twMerge('font-semibold italic uppercase', restWordClassName)}>{restWord}</span>
							{index != words.length - 1 && <span className={twMerge('font-semibold italic uppercase', restWordClassName)}>{' '}</span>}
						</div>
					)
				})
			}
		</div>
	 );
}

export default Title;