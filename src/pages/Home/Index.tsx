import { Link } from "react-router-dom";
import useOAuth from "../../hooks/useOAuth";
import { useEffect } from "react";
import Button from "../../components/Button";
import { useGlobalContext } from "../../contexts/store";
import Logo from "../../components/Logo";
import '../../assets/homeAnimation.css'

const Index = () => {
	const { dispatch} = useGlobalContext();
	const [ handleOAuth ] = useOAuth();

	useEffect(() => {
		dispatch({type: 'LOADING', state: false})
		handleOAuth()
	}, [])

	return (
		<div
			className="relative w-full h-[100vh] px-10 flex justify-center items-center overflow-hidden">
			<div
				style={{backgroundImage: 'url(/images/bg-image.png)'}}  
				className="absolute -z-30 top-0 left-0 bottom-0 right-0 bg-cover bg-center" />
			<div
				className="absolute -z-10 top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-black" />
			<img
				src="/images/avatar.png"
				className="avatar absolute -z-20 bottom-0 left-1/2 h-[70%]" />
			<div className="flex flex-col justify-between items-center gap-16 h-full py-40">
				 <div>		
					<Logo animate className="text-7xl" />
					<h2 
						className="max-w-[800px] text-center font-medium text-2xl mt-5"
						>Lorem ipsum dolor sit amet consectetu
					</h2>
				 </div>
				<Link to="/signup">
					<Button className="w-[300px]">Get Started</Button>
				</Link>
			</div>
		</div>
	);
}

export default Index;