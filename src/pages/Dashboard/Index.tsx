import { useLocation } from "react-router-dom";
import PingPong from "./PingPong";
import Tournaments from "./Tournaments";
import { useEffect } from "react";

const Index = () => {
	const location = useLocation();

	useEffect(() => {
		console.log('location')
		console.log(location)
		location
	}, [])

	return (
		<div className="w-full relative space-y-8">
			<PingPong  />
			<Tournaments />
		</div>
	)
}

export default Index;