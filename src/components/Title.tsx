import { twMerge } from "tailwind-merge";

interface Props {
	children: string
	firstCharClassName: string
	restWordClassName: string
}

function Title({ children, firstCharClassName, restWordClassName }: Props) {
	const words = children.split(' ');
	return ( 
		<div>
			{
				words.map((word, index) => {
					const firstChar = word.charAt(0);
					const restWord = word.slice(1);
					return (
						<>
							<div key={index} className="inline">
								<span className={twMerge('font-semibold italic uppercase', firstCharClassName)}>{firstChar}</span>
								<span className={twMerge('font-semibold italic uppercase', restWordClassName)}>{restWord}</span>
							</div>
							{index != words.length - 1 && <span>{' '}</span>}
						</>
					)
				})
			}
		</div>
	 );
}

export default Title;