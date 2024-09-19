import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import callToApi from "../../utils/callToApi";
import { Dispatch, SetStateAction, useState } from "react";
import { useGlobalContext } from "../../contexts/store";

interface Props {
    setIsTwoFA: Dispatch<SetStateAction<boolean>>
}

const SignIn2FA = ({setIsTwoFA}: Props) => {
    const [otpCode, setOtpCode] = useState('');
    const navigate = useNavigate();
    const { dispatch } = useGlobalContext();
    const [error, setError] = useState('');
    // const
    const handleSubmit = async () => {
        
        const data = {
            otp: otpCode,
            token: localStorage.getItem('tfa') || '',
            refer: 'url'
        }

        if (otpCode.length != 6) {
            setError('2fa code should be 6 digits')
            return;
        }

        try {
            const res = await callToApi('api/2fa/', data);
            setError('');
            dispatch({type: 'LOGIN', jwt: res.jwt});
            navigate('/profile');
        
        } catch (error) {
            setError('invalid code')
        }
    }

    const tryAgain = () => {
        navigate('/login')
        setIsTwoFA(false);
    }

    return (
        <div className="flex flex-col gap-[2rem] max-w-[400px]">
            <h1 className="font-semibold text-2xl leading-9 text-left italic">two-factor authentication</h1>
            <span className="font-normal text-sm">
                enter the verification code that has been sent to your email
            </span>
            <div className="flex flex-col items-end gap-[1rem]">
                <Input
                    onChange={(e) => setOtpCode(e.target.value)}
                    type="number" className="w-full" placeholder="verification code">
                </Input>
                {error != '' && <p className="text-invalid text-sm">{error}</p>}
                {/* <Link to="/forget-password" className="font-normal text-xs text-gray1">resend?</Link> */}
                <Button onClick={handleSubmit} className="w-full my-9">Verify</Button>
            </div>
            <div className="text-sm flex justify-between">
                <p className="text-gray1">didn't receive the code?</p>
                <span 
                    onClick={tryAgain} 
                    className="cursor-pointer hover:underline duration-300">try again</span>
            </div>
        </div>
    );
}

export default SignIn2FA;