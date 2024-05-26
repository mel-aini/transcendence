import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { invalidColor } from "../../utils/colors";

const SignUpWithOAuth = () => {
	const [isValid, setIsValid] = useState<boolean>(true);
	const handler = (e: any) => {
		if (e.target && e.target.value == "")
			setIsValid(true);
		else  setIsValid(false);
	}
	return (
		<div className="h-[180px] w-full max-w-[300px] flex flex-col items-center">
			<div className="h-full w-full flex flex-col">
				<h1 className="pb-4">Enter your username</h1>
				<Input type='username' className="w-full" onChange={handler} style={!isValid ? {borderColor: invalidColor, color: invalidColor} : {}} placeholder="username"/>
				{!isValid && <span className="mt-1 self-end text-invalid text-sm">invalid username</span>}
			</div>
			<div className="self-end">
				<Button>continue</Button>
			</div>
		</div>
	)
}

export default SignUpWithOAuth;