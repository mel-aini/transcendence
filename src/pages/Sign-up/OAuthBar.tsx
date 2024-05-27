import { FC, useRef } from "react";
import OAuth from "../../components/OAuth";
import { BACKEND_END_POINT } from "../../utils/global";
import NewButton from "../../components/NewButton";

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
		<div className="w-full">
			<NewButton 
				onClick={() => generateLink('42')}
				className="w-full" 
				variant="secondary"
			>
				<p>{type} with</p>
				<OAuth type="42"/>
			</NewButton>
			<NewButton 
				onClick={() => generateLink('42')}
				className="w-full mt-6" 
				variant="secondary"
			>
				<p>{type} with</p>
				<OAuth type="google"/>
			</NewButton>
			{/* <OAuth onClick={() => generateLink('google')} type="google"/> */}
		</div>
	)
}

export default OAuthBar;