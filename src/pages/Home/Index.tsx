import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import useOAuth from "../../hooks/useOAuth";
import { HTMLAttributes, ReactNode, useEffect, useState } from "react";

interface PolygonProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode,
	className?: string,
	onClick?: () => {}
}

const Polygon = ({children, className, onClick, ...props}: PolygonProps) => {
	const [clicked, setClicked] = useState(false);

	return (
		<div className="relative select-none">
			<div
				onClick={() => {
					if (!clicked) {
						setClicked(true);
						setTimeout(() => setClicked(false), 200)
					}
					if (onClick) onClick();
				}}
				className={"triangle duration-200 px-10 h-[42px] bg-primary flex justify-center items-center text-bg font-semibold relative z-10 cursor-pointer" + (className ? ' ' + className : '')}
				style={{transform: clicked ? 'translate(5px, 8px)' : 'translate(0, 0)'}}
				{...props}
				>
				{children}
			</div>
			<div className="button-border absolute top-[8px] left-[5px] w-full px-10 h-[42px] bg-white flex justify-center items-center text-bg font-semibold"></div>
		</div>
	)
}

const Index = () => {

	const [ handleOAuth ] = useOAuth();

	useEffect(() => {
		handleOAuth()
	}, [])

	return (
		<>
			<NavBar />
			<div className="bg-bg w-full h-[100vh] px-10 flex justify-center items-center">
				<div className="flex flex-col gap-6 items-end absolute bottom-20 right-20">
					<h1 className=" text-7xl">SOON...</h1>
					<Link to="/signup">
						{/* <Button>Get Started</Button> */}
					</Link>
					<Polygon>Get Started</Polygon>
				</div>
			</div>
		</>
	);
}

export default Index;