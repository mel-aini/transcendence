import { ComponentProps } from "react";
import { useNavigate } from "react-router-dom";
import LayoutHeader from "../../layout/LayoutHeader";

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

function Index() {
	const navigate = useNavigate();

	return (
		<>
			<LayoutHeader>Ping Pong</LayoutHeader>
			<div className="grid gap-5 grid-cols-1 lg:grid-cols-6">
				<PlayChoise
					onClick={() => navigate('match-making')}
					title="Matchmaking" 
					description="Lorem ipsum dolor sit amet consectetur. Interdum maecenas quis porttitor nunc et habitant vestibulum risus facilisis." 
					className="lg:col-start-1 lg:col-end-5"/>
				<PlayChoise 
					title="Vs Bot" 
					description="Lorem ipsum dolor sit amet consectetur. Interdum maecenas quis porttito."
					className="lg:col-start-5 lg:col-end-7" />
				<PlayChoise 
					title="1 vs 1" 
					description="Lorem ipsum dolor sit amet consectetur. Interdum maecenas quis porttito." 
					className="lg:col-start-1 lg:col-end-3" />
				<PlayChoise
					onClick={() => navigate('vs-friend')}
					title="Vs Friend" 
					description="Lorem ipsum dolor sit amet consectetur. Interdum maecenas quis porttitor nunc et habitant vestibulum risus facilisis." 
					className="lg:col-start-3 lg:col-end-7" />
			</div> 
		</>
	);
}

export default Index;