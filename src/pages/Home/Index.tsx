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
			<div className="flex flex-col items-center gap-10">
				<p className=" text-7xl text-center leading-normal">Lorem ipsum dolor sit amet consectetur.</p>
				<Link to="/signup">
					<NewButton>Get Started</NewButton>
				</Link>
			</div>
		</div>
	);
}

export default Index;