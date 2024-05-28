import { Dispatch, FormEvent, useEffect, useState } from "react";
import Input from "../../components/Input";
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

interface EmailFormProps {
	email: {
		value: string
		dispatch: Dispatch<React.SetStateAction<string>>
	},
	dispatchLevel: Dispatch<React.SetStateAction<number>>
}

const EmailForm = ({email, dispatchLevel}: EmailFormProps) => {
	const [formError, setFormError] = useState<string>('');
	// const [email, setEmail] = useState<string>('');
	const [submit, setSubmit] = useState<boolean>(false);
	const { dispatch } = useGlobalContext();
	const [formState, parseInput] = useInputChecker(BACKEND_END_POINT + 'api/register/');

	useEffect(() => {
		if (!submit) return;
		submitForm();
		setSubmit(false);
	}, [submit])

	const submitForm = async () => {
		const data: IResponse = {
			type: "normal",
			data : {
				username: '',
				email: email.value,
				password: '',
				retype_password: ''
			}
		}
		
		try {
			await callToApi('api/register/', data);
		}
		catch (error: any) {
			let errorMsg: string = '';
			if (typeof error == 'string') {
				errorMsg = error;
			}
			else {
				if (!error.error.message['email']) {
					console.log('valid email');
					dispatchLevel(1)
				} else {
					errorMsg = error.error.message['email']
				}
			}
			setFormError(errorMsg)
		}
		dispatch({type: 'LOADING'});
	}
	
	const onChangeHandler = (e: any) => {
		email.dispatch(e.target.value)
		parseInput('email', e.target.value);
	}

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		if (formState[1].isError) return;

		parseInput('email', email.value);
		
		if (email.value == '') return;

		setSubmit(true);
		dispatch({type: 'LOADING'});
	}

	return (
		<>
			<h1 className="text-2xl font-semibold mb-14">Welcome</h1>
			<form onSubmit={submitHandler} className="flex flex-col justify-between w-full h-[150px]">
				<div className="flex flex-col gap-5 w-full">
					<Input
						onChange={onChangeHandler}
						className="w-full"
						type='email'
						placeholder='Email'
						style={{
							borderColor: formState[1].isError ? invalidColor : primaryColor,
							color: formState[1].isError ? invalidColor : whiteColor
						}}
					/>
					{formError != '' && <p className="text-[12px] self-end text-invalid">{formError}</p>}
				</div>
				<NewButton 
					type="submit" 
					onClick={submitHandler}
					>
						continue with email
				</NewButton>
			</form>
		</>
	)
}

export default EmailForm;