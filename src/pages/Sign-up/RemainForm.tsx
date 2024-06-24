import { Dispatch, useEffect, useState } from "react";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import useInputChecker from "../../hooks/useInputChecker";
import { primaryColor, invalidColor, whiteColor } from "../../utils/colors";
import { BACKEND_END_POINT } from "../../utils/global";
import { useGlobalContext } from "../../contexts/store";
import callToApi from "../../utils/callToApi";
import NewButton from "../../components/NewButton";

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

interface Props {
	email: string,
	dispatchLevel: Dispatch<React.SetStateAction<number>>
}

const RemainForm = ({email}: Props) => {
	const [formError, setFormError] = useState<string>('');
	const [username, setUsername] = useState<string>('');
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
		dispatch({type: 'LOADING', state: false});
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
		parseInput('password', password);
		parseInput('retype_password', retypePassword, password);
		
		if (username == '' || email == '' || password == '' || retypePassword == '') return;

		setSubmit(true);
		dispatch({type: 'LOADING', state: true});
	}

	return (
		<>
			<h1 className="text-2xl font-semibold mb-14">Your are a step away...</h1>
			<form onSubmit={submitHandler} className="flex flex-col justify-between w-full h-[300px]">
				<div className="flex flex-col gap-5 w-full">
					<>
					{ inputs.map((field, index) => {
							return (
								<Input
									key={index}
									onChange={field.onChangeHandler}
									onBlur={() => field.onBlurHandler(index == 1 || 2 ? index + 1 : index)} 
									className="w-full" 
									type={field.type}
									placeholder={field.placeholder}
									style={formState[index == 1 || 2 ? index + 1 : index].isError ? { borderColor: invalidColor, color: invalidColor } : {}}
									/>
								)
					}) }
					</>
					{formError != '' && <p className="text-[12px] self-end text-invalid">{formError}</p>}
				</div>
				<NewButton 
					type="submit" 
					onClick={submitHandler}
					>
						complete Sign up
				</NewButton>
			</form>
		</>
	)
}

export default RemainForm;