import { Dispatch, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { invalidColor, primaryColor, whiteColor } from "../../utils/colors";
import NewButton from "../../components/NewButton";
import { useGlobalContext } from "../../contexts/store";
import useInputChecker from "../../hooks/useInputChecker";
import { BACKEND_END_POINT } from "../../utils/global";
import callToApi from "../../utils/callToApi";
import { useNavigate } from "react-router-dom";

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
	dispatchLevel: Dispatch<React.SetStateAction<number>>
}

const UsernameForm = ({dispatchLevel}: Props) => {
	const [formError, setFormError] = useState<string>('');
	const [username, setUsername] = useState<string>('')
	const [formState, parseInput] = useInputChecker(BACKEND_END_POINT + 'api/register/');
	const { dispatch } = useGlobalContext();
	const navigate = useNavigate();

	const submitHandler = async (e: any) => {
		e.preventDefault();

		const data: IResponse = {
			type: "normal",
			data : {
				username: username,
				email: '',
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
				if (!error.error.message['username']) {
					console.log('valid username');
					dispatchLevel(0);
					navigate('/profile');
					
				} else {
					errorMsg = error.error.message['username']
				}
			}
			setFormError(errorMsg)
		}
		dispatch({type: 'LOADING', state: false});
	}

	return (
		<>
			<h1 className="text-2xl font-semibold mb-14">Create your username</h1>
			<form onSubmit={submitHandler} className="flex flex-col justify-between w-full h-[150px]">
				<Input
					onChange={(e) => setUsername(e.target.value)}
					className="w-full"
					type='username'
					placeholder='Username'
					style={formState[0].isError ? {
						borderColor:  invalidColor,
						color: invalidColor
					} : {}}
				/>
					{formError != '' && <p className="text-[12px] self-end text-invalid">{formError}</p>}
				<NewButton onSubmit={submitHandler} className="w-full">complete Sign up</NewButton>
			</form>
		</>
	)
}

export default UsernameForm;