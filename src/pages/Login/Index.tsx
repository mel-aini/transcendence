import SignInForm from "./SignInForm";
import Welcome from "./Welcome";
import SignIn2FA from "./SingIn2FA";
import { useState } from "react";

const Index = () => {
	const [isTwoFA, setIsTwoFA] = useState(false);

	return (
		<div className="bg-bg smh:h-[100vh] flex">
			{/* Left */}
			<div className=" hidden xl:block w-full">
				<Welcome />
			</div>
			{/* Right */}
			<div className=" flex justify-center items-center p-5 sm:p-20 w-full">
				<div className="relative h-full w-full flex justify-center items-center">
					{!isTwoFA && <SignInForm setIsTwoFA={setIsTwoFA} />}
					{isTwoFA && <SignIn2FA />}
					<span className="absolute w-10 h-10 bottom-0 right-0 border-r border-b border-primary lg:block hidden"></span>
				</div>
			</div>
			{/* <OAuth/> */}
		</div>
	);
}

export default Index;