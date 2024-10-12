import { FormEvent, useRef } from "react";
import { useGlobalContext } from "../../contexts/store";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

interface Props {
	token: string
}

function UpdatePassword({ token }: Props) {
	// const email = useRef<string>('');
	const navigate = useNavigate();
	const password = useRef<string>('');
	const retypePassword = useRef<string>('');

	const { state, dispatch } = useGlobalContext();
	const submitHandler = async (e: FormEvent) => {
		dispatch({type: 'LOADING', state: true})
		e.preventDefault();
		try {
			await axios.post('http://localhost:8000/api/update-password/', {
				token: token,
				data :
				{
					password: password.current,
					retype_password: retypePassword.current
				}
			})
			navigate('/login');
		} catch (error) {
			console.log('error', error)			
		}
		dispatch({type: 'LOADING', state: false})
    }
	return ( 
		<>
			<h1 className="text-2xl text-center font-semibold mb-14 italic">Update Password</h1>
			<form onSubmit={submitHandler} className="flex flex-col justify-between w-full h-[150px]">
				<div className="flex flex-col gap-5 w-full mb-14">
					<Input
						onChange={(e) => password.current = e.target.value}
						className="w-full"
						type='password'
						placeholder='password'
					/>
					<Input
						onChange={(e) => retypePassword.current = e.target.value}
						className="w-full"
						type='password'
						placeholder='password confirmation'
					/>
				</div>
				<Button 
					type="submit"
					disabled={state.isLoading}
					onClick={submitHandler}
					>
						Update
				</Button>
			</form>
		</>
	 );
}

export default UpdatePassword;