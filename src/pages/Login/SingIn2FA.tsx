import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import callToApi from "../../utils/callToApi";
import { useState } from "react";
import { useGlobalContext } from "../../contexts/store";

const SignIn2FA = () => {
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

    return (
        <div className="flex flex-col gap-[2rem] max-w-[279px]">
            <h1 className="font-semibold text-2xl leading-9 text-left">Please enter 2FA code</h1>
            <span className="font-normal text-xs leading-4 break-words ">
                two-factor authentication is enabled for your account.
                It has been sent to your email, <br/>
                please enter it to login
            </span>
            <div className="flex flex-col items-end gap-[1rem]">
                <Input
                    onChange={(e) => setOtpCode(e.target.value)}
                    type="number" className="w-full" placeholder="verification code">
                </Input>
                {error != '' && <p className="text-invalid text-sm">{error}</p>}
                {/* <Link to="/forget-password" className="font-normal text-xs text-gray1">resend?</Link> */}
                <Button onClick={handleSubmit} className="my-9">Verify</Button>
            </div>
        </div>
    );
}

export default SignIn2FA;