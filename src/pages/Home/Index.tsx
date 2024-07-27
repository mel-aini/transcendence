import { Link } from "react-router-dom";
import useOAuth from "../../hooks/useOAuth";
import { useEffect } from "react";
import NewButton from "../../components/NewButton";
import { useGlobalContext } from "../../contexts/store";

const Index = () => {
	const { dispatch} = useGlobalContext();
	const [ handleOAuth ] = useOAuth();

	useEffect(() => {
		dispatch({type: 'LOADING', state: false})
		handleOAuth()
	}, [])

	return (
		<div className="bg-bg w-full h-[100vh] px-10 flex justify-center items-center">
			<div className="flex flex-col items-center gap-16">
				<h1 className="font-myFont text-7xl">
					<span className="font-myFont text-primary">T</span>RAnSEnDEnCE</h1>
				<p 
					className="max-w-[800px] text-center leading-normal bg-[rgba(20,22,25, 0.5)] p-5 border border-border rounded-md"
					>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum, quia sapiente sunt amet, odit vitae atque esse minima soluta, nemo dolorem architecto sed quos cum expedita magnam fugit velit. Quia!
				</p>
				<Link to="/signup">
					<NewButton className="w-[300px]">Get Started</NewButton>
				</Link>
			</div>
		</div>
	);
}

export default Index;