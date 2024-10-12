import { Dispatch, FormEvent, SetStateAction, useRef } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useGlobalContext } from "../../contexts/store";
import axios from "axios";

interface Props {
	setStep: Dispatch<SetStateAction<"initial" | "email-sent" | "update-password">>
}

function EnterEmail({ setStep }: Props) {
	const email = useRef<string>('');
	const { state, dispatch } = useGlobalContext();

	const submitHandler = async (e: FormEvent) => {
		dispatch({type: 'LOADING', state: true})
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:8000/api/forget-password/', {
				email: email.current,
				refer: ''
			})
			setStep('email-sent')
		} catch (error) {
			console.log('error', error)			
		}
		dispatch({type: 'LOADING', state: false})
    }

	return ( 
		<>
			<h1 className="text-2xl text-center font-semibold mb-14 italic">Forget Password</h1>
			<form onSubmit={submitHandler} className="flex flex-col justify-between w-full h-[150px]">
				<div className="flex flex-col gap-5 w-full">
					<Input
						onChange={(e) => email.current = e.target.value}
						className="w-full"
						type='email'
						placeholder='Email'
					/>
				</div>
				<Button 
					type="submit"
					disabled={state.isLoading}
					onClick={submitHandler}
					>
						continue with email
				</Button>
			</form>
		</>
	 );
}

export default EnterEmail;