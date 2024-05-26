import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import useOAuth from "../../hooks/useOAuth";
import { HTMLAttributes, ReactNode, useEffect } from "react";

interface PolygonProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode,
	className?: string
}

const Polygon = ({children, className, ...props}: PolygonProps) => {
	return (
		<div className="relative">
			<div 
				className={"triangle relative px-10 h-[42px] bg-primary flex justify-center items-center text-bg font-semibold z-10" + (className ? ' ' + className : '')}
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
					<Polygon onClick={() => {console.log('clicked')}}>Get Started</Polygon>
				</div>
			</div>
		</>
	);
}

export default Index;