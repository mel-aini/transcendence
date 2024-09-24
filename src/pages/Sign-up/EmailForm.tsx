import { Dispatch, FormEvent, useEffect, useState } from "react";
import Input from "../../components/Input";
import useInputChecker from "../../hooks/useInputChecker";
import { primaryColor, invalidColor, whiteColor } from "../../utils/colors";
import { useGlobalContext } from "../../contexts/store";
import callToApi from "../../utils/callToApi";
import Button from "../../components/Button";
import { API_END_POINT } from "../../utils/urls";

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
	const [formState, parseInput] = useInputChecker(API_END_POINT + 'register/');

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
			await callToApi('register/', data);
		}
		catch (error: any) {
			console.log(error)
			let errorMsg: string = '';
			if (typeof error == 'string') {
				errorMsg = error;
			}
			else {
				if (!error.error.message['email']) {
					dispatchLevel(1)
				} else {
					errorMsg = error.error.message['email']
				}
			}
			setFormError(errorMsg)
		}
		dispatch({type: 'LOADING', state: false});
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
		dispatch({type: 'LOADING', state: true});
	}

	return (
		<>
			<h1 className="text-2xl font-semibold mb-14 italic">Welcome</h1>
			<form onSubmit={submitHandler} className="flex flex-col justify-between w-full h-[150px]">
				<div className="flex flex-col gap-5 w-full">
					<Input
						onChange={onChangeHandler}
						className="w-full"
						type='email'
						placeholder='Email'
						style={ formState[1].isError ? { borderColor:  invalidColor, color: invalidColor} : {}}
					/>
					{formState[1].isError && <p className="text-sm self-end text-invalid">{formState[1].error}</p>}
				</div>
				<Button 
					type="submit" 
					onClick={submitHandler}
					>
						continue with email
				</Button>
			</form>
		</>
	)
}

export default EmailForm;


// mellaini: ABCDefghi123