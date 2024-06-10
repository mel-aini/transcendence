import { ComponentProps } from "react";
import { Levels, usePingPongContext } from "../../contexts/pingPongStore";

interface Props extends ComponentProps<'div'> {
	className?: string,
	title: string,
	description: string
}

function PlayChoise({className, title, description, ...props}: Props) {
	return ( 
		<div 
			className={"bg-secondary h-[370px] rounded-md cursor-pointer" + (className ? ` ${className}` : '')}
			{...props}
			>
			<div className="rounded-md border border-border w-full h-full bg-gradient flex flex-col justify-between p-5">
				<h1 className="text-3xl font-medium">{title}</h1>
				<p className="font-extralight">{description}</p>
			</div>
		</div>
	);
}

function PlayChoises() {
	const {dispatch} = usePingPongContext();

	return ( 
		<div className="grid gap-5 grid-cols-1 lg:grid-cols-6 my-20">
			<PlayChoise
					onClick={(e) => dispatch({type: 'CHLEVEL', level: Levels.FindingOpponent})}
					title="Matchmaking" 
					description="Lorem ipsum dolor sit amet consectetur. Interdum maecenas quis porttitor nunc et habitant vestibulum risus facilisis." 
					className="lg:col-start-1 lg:col-end-5" />
				<PlayChoise 
					title="Vs Bot" 
					description="Lorem ipsum dolor sit amet consectetur. Interdum maecenas quis porttito." 
					className="lg:col-start-5 lg:col-end-7" />
				<PlayChoise 
					title="1 vs 1" 
					description="Lorem ipsum dolor sit amet consectetur. Interdum maecenas quis porttito." 
					className="lg:col-start-1 lg:col-end-3" />
				<PlayChoise 
					title="Vs Friend" 
					description="Lorem ipsum dolor sit amet consectetur. Interdum maecenas quis porttitor nunc et habitant vestibulum risus facilisis." 
					className="lg:col-start-3 lg:col-end-7" />
		</div> 
	);
}

export default PlayChoises;