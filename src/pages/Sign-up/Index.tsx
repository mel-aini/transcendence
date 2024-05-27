import { Link, useSearchParams } from "react-router-dom";
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
		<div className="bg-bg min-h-[100vh] flex">
			<Welcome />
			<div className="flex justify-center items-center p-5 sm:p-20 w-full">
				<div className="relative h-full w-full flex justify-center items-center">
					<div className="w-full flex flex-col gap-9 items-center max-w-[350px]">
						<div className="relative w-full flex flex-col items-center place-content-center">
							{registerLevel == Level.Email && <EmailForm email={{value: email, dispatch: setEmail}} dispatchLevel={setRegisterLevel} />}
							{registerLevel == Level.RemainFromEmail && <RemainForm email={email} dispatchLevel={setRegisterLevel} />}
							{registerLevel == Level.Username && <UsernameForm dispatchLevel={setRegisterLevel} />}
						</div>
						{registerLevel == Level.Email && <>
							<p>or</p>
							<OAuthBar type="sign up" />
							<div className="flex items-center gap-2 text-sm">
								<p className="text-gray1">Have an account?</p>
								<Link to='/login'>Sign in</Link>
							</div>
						</>}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Index;