import { Dispatch, SetStateAction } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

type Request = {
    email: string
    refer: string
}

interface Props {
    setIsForgetPassword: Dispatch<SetStateAction<boolean>>
}

function ForgetPassword({setIsForgetPassword}: Props) {
    const submitHandler = () => {

    }

    const onChangeHandler = () => {

    }

    return ( 
        <div>
            <h1 className="text-2xl font-semibold mb-14 italic">Forget Password</h1>
			<form onSubmit={submitHandler} className="flex flex-col justify-between w-full h-[150px]">
				<div className="flex flex-col gap-5 w-full">
					<Input
						onChange={onChangeHandler}
						className="w-full"
						type='email'
						placeholder='Email'
					/>
				</div>
				<Button 
					type="submit" 
					onClick={submitHandler}
					>
						continue with email
				</Button>
			</form>
        </div>
    );
}

export default ForgetPassword;