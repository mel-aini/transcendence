import { FC, useRef } from "react";
import OAuth from "../../components/OAuth";
import { BACKEND_END_POINT } from "../../utils/global";
import Button from "../../components/Button";

// const clientID = 'u-s4t2ud-789ae11f20ba1b43a81ff49a1393e1f82bfd2a2c180d46f5d37b6af4d2be33af';

const OAuthBar = ({type}: {type: 'sign up' | 'sign in'}) => {
	const OAuthLink = useRef<string>('');

	const generateLink = async (type: 'google' | '42') => {
		try {
			const endpoint = type == 'google' ? 'api/generate-googlelink/' : 'api/generate-42link/';
			const response = await fetch(BACKEND_END_POINT + endpoint, {
				method: 'Get'
			})

			const body = await response.json();
	
			if (!response.ok) throw new Error('response error');
			// console.log(body.link);
			OAuthLink.current = body.link;
			location.href = OAuthLink.current
		} catch (error) {
			// console.log(error);
		}
	}

	return (
		<div className="w-full flex justify-between gap-2">
			<OAuth onClick={() => generateLink('42')} type="42"/>
			<OAuth onClick={() => generateLink('42')} type="google"/>
		</div>
	)
}

export default OAuthBar;