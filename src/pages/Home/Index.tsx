import { Link } from "react-router-dom";
import Button from "../../components/Button";
import NavBar from "../../components/NavBar";
import useOAuth from "../../hooks/useOAuth";
import { ReactNode, useEffect } from "react";

const Polygon = ({children}: {children: ReactNode}) => {
	return (
		<div className="relative w-full h-[42px] bg-primary flex justify-center items-center text-bg font-semibold">
			<div className="absolute top-0 left-[-21px] triangle h-[42px] w-[42px] bg-primary"></div>
			{children}
			<div className="absolute top-0 right-[-21px] triangle h-[42px] w-[42px] bg-primary"></div>
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