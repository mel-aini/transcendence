import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import useInputChecker from "../../hooks/useInputChecker";
import { primaryColor, invalidColor, whiteColor } from "../../utils/colors";
import { BACKEND_END_POINT } from "../../utils/global";
import { useGlobalContext } from "../../contexts/store";
import callToApi from "../../utils/callToApi";

interface IBody {
	username: string,
	email: string,
	password: string,
	retype_password: string
}

interface IResponse {
	type: string,
	data: IBody
}

const Form = () => {
	const [formError, setFormError] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [retypePassword, setRetypePassword] = useState<string>('');
	const [submit, setSubmit] = useState<boolean>(false);
	const { dispatch } = useGlobalContext();
	const navigate = useNavigate();
	const [formState, parseInput, makeRequest] = useInputChecker(BACKEND_END_POINT + 'api/register/');

	useEffect(() => {
		if (!submit) return;
		submitForm();
		setSubmit(false);
	}, [submit])

	const blurHandler = (index: number, type: string) => {
		const data: IResponse = {
			type: "normal",
			data : {
				username: type == 'username' ? username : '',
				email: type == 'email' ? email : '',
				password: type == 'password' ? password : '',
				retype_password: type == 'retype_password' ? retypePassword : ''
			}
		}
		if (!formState[index].isError) {
			makeRequest(data, type);
		}
	}

	useEffect(() => {
		let i: number;
		for (i = 0; i < formState.length; i++) {
			if (formState[i].isError) {
				setFormError(formState[i].error)
				break ;
			}
		}
		if (i == formState.length) setFormError('');
	}, [formState])
	const submitForm = async () => {
		const data: IResponse = {
			type: "normal",
			data : {
				username: username,
				email: email,
				password: password,
				retype_password: retypePassword
			}
		}
		
		try {
			await callToApi('api/register/', data);
			navigate('/login');
		}
		catch (error: any) {
			setFormError(error)
		}
		dispatch({type: 'LOADING'});
	}
	const inputs = [
		{
			type: 'username',
			placeholder: 'username',
			onChangeHandler: (e: any) => {
				setUsername(e.target.value)
				parseInput('username', e.target.value);
			},
			onBlurHandler: (index: number) => blurHandler(index, 'username'),
		},
		{
			type: 'email',
			placeholder: 'email',
			onChangeHandler: (e: any) => {
				setEmail(e.target.value)
				parseInput('email', e.target.value);
			},
			onBlurHandler: (index: number) => blurHandler(index, 'email'),
		},
		{
			type: 'password',
			placeholder: 'password',
			onChangeHandler: (e: any) => {
				setPassword(e.target.value)
				parseInput('password', e.target.value);
			},
			onBlurHandler: (index: number) => blurHandler(index, 'password'),
		},
		{
			type: 'password',
			placeholder: 'confirm password',
			onChangeHandler: (e: any) => {
				setRetypePassword(e.target.value)
				parseInput('retype_password', e.target.value, password);
			},
			onBlurHandler: (index: number) => blurHandler(index, 'retype_password'),
		},
	]
	const submitHandler = async (e: any) => {
		e.preventDefault();
		
		for (let i = 0; i < formState.length; i++) {
			if (formState[i].isError) return;
		}

		parseInput('username', username);
		parseInput('email', email);
		parseInput('password', password);
		parseInput('retype_password', retypePassword, password);
		
		if (username == '' || email == '' || password == '' || retypePassword == '') return;

		setSubmit(true);
		dispatch({type: 'LOADING'});
	}

	return (
		<form onSubmit={submitHandler} className="flex flex-col justify-between w-full h-[315px]">
			<div className="flex flex-col gap-5 w-full">
				<> { inputs.map((field, index) => {
						return (
							<Input
								key={index}
								onChange={field.onChangeHandler}
								onBlur={() => field.onBlurHandler(index)} 
								className="w-full" 
								type={field.type}
								placeholder={field.placeholder}
								style={{
									borderColor: formState[index].isError ? invalidColor : primaryColor,
									color: formState[index].isError ? invalidColor : whiteColor
								}}
							/>
						)
					}) }
				</>
				{formError != '' && <p className="text-[12px] self-end text-invalid">{formError}</p>}
			</div>
			<Button 
				type="submit" 
				onClick={submitHandler}
				className="self-end"
				>
					Sign Up
			</Button>
		</form>
	)
}

export default Form;