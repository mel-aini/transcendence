import { useSearchParams } from "react-router-dom";
import useOAuth from "../../hooks/useOAuth";
import Welcome from "./Welcome";
import { useEffect, useState } from "react";
import EmailForm from "./EmailForm";
import UsernameForm from "./UsernameForm";
import RemainForm from "./RemainForm";
import OAuthBar from "./OAuthBar";

enum Level {
	Email,
	RemainFromEmail,
	Username
}

const Index = () => {
	// const { state: {isOAuthDone, isUser}, dispatch } = useContext(SignContext);
	// const [enterUserName, setEnterUserName] = useState(false);
	const [registerLevel, setRegisterLevel] = useState<number>(Level.Email);
	const [email, setEmail] = useState('');
	const [searchParams] = useSearchParams();
	const [handleOAuth, toggle] = useOAuth();

	useEffect(() => {
		const shouldEnterUserName = searchParams.get('isUser');
		if (shouldEnterUserName) {
			setRegisterLevel(Level.Username)
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
					<div className="w-full flex flex-col gap-10 items-center max-w-[350px]">
						<div className="relative w-full flex flex-col items-center place-content-center">
							{registerLevel == Level.Email && <EmailForm email={{value: email, dispatch: setEmail}} dispatchLevel={setRegisterLevel} />}
							{registerLevel == Level.RemainFromEmail && <RemainForm email={email} dispatchLevel={setRegisterLevel} />}
							{registerLevel == Level.Username && <UsernameForm dispatchLevel={setRegisterLevel} />}
						</div>
						{registerLevel == Level.Email && <>
							<p>or</p>
							<OAuthBar />
						</>}
					</div>
				</div>
			</div>
			{/* <OAuth/> */}
		</div>
	);
}

export default Index;