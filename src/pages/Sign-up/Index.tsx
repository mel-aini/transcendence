import { useSearchParams } from "react-router-dom";
import useOAuth from "../../hooks/useOAuth";
import SignUpForm from "./SignUpForm";
import SignUpWithOAuth from "./SignUpWithOAuth";
import Welcome from "./Welcome";
import { useEffect, useState } from "react";

const Index = () => {
	// const { state: {isOAuthDone, isUser}, dispatch } = useContext(SignContext);
	const [enterUserName, setEnterUserName] = useState(false);
	const [searchParams] = useSearchParams();
	const [handleOAuth, toggle] = useOAuth();

	useEffect(() => {

		const shouldEnterUserName = searchParams.get('isUser');
		if (shouldEnterUserName) {
			setEnterUserName(true)
		} else {
			handleOAuth()
		}
	
	}, [toggle])

	return (
		<div className="bg-bg smh:h-[100vh] flex">
			{/* Left */}
			<div className="hidden xl:block bg-primary w-full">
				<Welcome />
			</div>
			{/* Right */}
			<div className="flex justify-center items-center p-5 sm:p-20 w-full">
				<div className="relative h-full w-full flex justify-center items-center">
					{!enterUserName && <SignUpForm />}
					{enterUserName && <SignUpWithOAuth />}
					<span className="absolute w-10 h-10 bottom-0 right-0 border-r border-b border-primary lg:block hidden"></span>
				</div>
			</div>
			{/* <OAuth/> */}
		</div>
	);
}

export default Index;