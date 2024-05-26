import { Link } from "react-router-dom";
import OAuthBar from "./OAuthBar";
import Form from "./Form";

const SignUpForm = () => {

	return (
		<div className="relative w-full max-w-[300px] flex py-20 flex-col items-center place-content-center">
			<h1 className="text-2xl font-semibold mb-14">Sign Up</h1>
			<Form />
			<div className="flex flex-col gap-5 items-end w-full mt-6">
				<div className="flex flex-col items-end w-full sm:flex-row sm:justify-between sm:max-w-[160px]">
					<span className="text-xs text-gray1">Have an account?</span>
					<Link to="/login" className="text-xs font-semibold text-primary cursor-pointer select-none">Sign in</Link>
				</div>
				<hr className="my-1 w-full border-primary" />
				<div className="flex flex-col gap-5 items-center w-full sm:flex-row sm:justify-between">
					<span className="text-xs text-gray1 place-self-center">or you can sign up with:</span>
					<OAuthBar />
				</div>
			</div>
			{/* <Alert condition={showAlertMessage} time={300} >User Created succefully</Alert> */}
			{/* loading */}
			{/* <button onClick={() => dispatch({type : 'LOADING'})}>test loading</button> */}
			{/* <Loading /> */}
		</div>
	)
}

export default SignUpForm;

/*

{
	"type": "register",
	"data" : {
		"username": "test",
		"email": "email@test.com",
		"password": "password",
		"retype_password": "password"
	}
}

*/