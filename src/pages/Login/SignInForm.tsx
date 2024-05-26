import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useState } from "react";
import { invalidColor } from "../../utils/colors";
import { useGlobalContext } from "../../contexts/store";
import callToApi from "../../utils/callToApi";
import OAuthBar from "../Sign-up/OAuthBar";

interface IResponse {
	type: string,
	data : {
		identity: {
			type: string,
			value: string
		},
		password: string
	},
	refer: string
}

const SignInForm = ({setIsTwoFA}: {setIsTwoFA: Dispatch<SetStateAction<boolean>>}) => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isValidUsername, setIsValidUsername] = useState<boolean>(true);
	const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
	const [invalidLogin, setInvalidLogin] = useState<boolean>(false);
	const [emptyInput, setEmptyInput] = useState<boolean>(false);
	const { dispatch } = useGlobalContext();
	const navigate = useNavigate();

	const usernameHandler = (userValue: string) => {
		setEmptyInput(false);
		setInvalidLogin(false);
		setUsername(userValue);
		if (username != '') setIsValidUsername(true);
	}

	const passwordHandler = (passValue: string) => {
		setEmptyInput(false);
		setInvalidLogin(false);
		setPassword(passValue);
		if (password != '') setIsValidPassword(true);
	}

	const blurUserHandler = () => {
		if (username === '') setIsValidUsername(false);
	}
	
	const blurPassHandler = () => {
		if (password === '') setIsValidPassword(false);
	}

	const submitHandler = async (e: any) => {
		e.preventDefault();

		const data: IResponse = {
			type: "normal",
			data : {
				identity: {
					type: "username",
					value: username
				},
				password: password
			},
			refer: "/game/101123542145"
		}
		
		dispatch({type: 'LOADING'});
		try {
				if (username == '' || password == '')
				{
					setEmptyInput(true);
					throw ("empty input");
				}
				setEmptyInput(false);
				
				const res = await callToApi('api/login/', data);
				if ('TFA' in res) {
					console.log('2fa is enabled', res);
					console.log(res.TFA.token);
					localStorage.setItem('tfa', res.TFA.token);
					setIsTwoFA(true);
				} else {
					dispatch({type: 'LOGIN', jwt: res.jwt});
					setInvalidLogin(false);
					navigate('/profile');
				}

		}
		catch (error: any) {
			console.log('error', error);
		}
		dispatch({type: 'LOADING'});

	}
    return (
        <div className="w-full flex flex-col py-20 max-w-[300px] items-center">
            <h1 className="font-semibold text-2xl mb-14">Sign In</h1>
            <form onSubmit={(e) => submitHandler(e)} className="flex flex-col justify-between w-full h-[235px]">
				<div className="flex flex-col gap-5 w-full">
					<Input
						onChange={(e) => usernameHandler(e.target.value)}
						onBlur={() => blurUserHandler()}
						className={"w-full"} 
						style={(!isValidUsername || emptyInput || invalidLogin) ? {borderColor: invalidColor, color: invalidColor} : {}}
						type="username" 
						placeholder="username"
					/>
					<Input 
						onChange={(e) => passwordHandler(e.target.value)} 
						onBlur={() => blurPassHandler()}
						className={"w-full"}  
						style={(!isValidPassword || emptyInput || invalidLogin) ? {borderColor: invalidColor, color: invalidColor} : {}}
						type="password" 
						placeholder="password"
					/>
					<p className="text-sm self-end text-gray1 hover:underline cursor-pointer">forget password?</p>
					{(!isValidUsername && !invalidLogin && !emptyInput) ? <p className="text-sm self-end text-invalid">Invalid username</p> : ''}
					{(!isValidPassword && isValidUsername && !invalidLogin && !emptyInput) ? <p className="text-sm self-end text-invalid">Password field should not be blank</p> : ''}
					{(emptyInput && !invalidLogin) ? <p className="text-sm self-end text-invalid">Please fill the Sign In form</p> : ''}
					{(invalidLogin) ? <p className="text-sm self-end text-invalid">invalid Username or Password</p> : ''}
				</div>
				<Button 
					type="submit"
					className="self-end">Sign In
				</Button>
			</form>
            <div className="flex flex-col gap-5 items-end w-full mt-6">
				<div className="flex flex-col items-end w-full sm:flex-row sm:justify-between sm:max-w-[200px]">
					<span className="text-xs text-gray1">Don't have an account?</span>
					<Link to="/signup" className="text-xs font-semibold text-primary cursor-pointer select-none">Sign up</Link>
				</div>
				<hr className="my-1 w-full border-primary" />
				<div className="flex flex-col gap-5 items-center w-full sm:flex-row sm:justify-between">
					<span className="text-xs text-gray1 place-self-center">or you can sign in with:</span>
					<OAuthBar />
				</div>
			</div>
        </div>
    );
}

export default SignInForm;