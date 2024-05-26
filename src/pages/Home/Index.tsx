import { Link } from "react-router-dom";
import Button from "../../components/Button";
import NavBar from "../../components/NavBar";
import useOAuth from "../../hooks/useOAuth";
import { useEffect } from "react";

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
						<Button>Get Started</Button>
					</Link>
				</div>
			</div>
		</>
	);
}

export default Index;