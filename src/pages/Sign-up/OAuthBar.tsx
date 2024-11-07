import { useRef } from "react";
import OAuth from "@/components/OAuth";
import { API_END_POINT } from "@/utils/urls";

const OAuthBar = () => {
	const OAuthLink = useRef<string>('');

	const generateLink = async (type: 'google' | '42') => {
		try {
			const endpoint = type == 'google' ? 'generate-googlelink/' : 'generate-42link/';
			const response = await fetch(API_END_POINT + endpoint, {
				method: 'Get'
			})

			const body = await response.json();
	
			if (!response.ok) throw new Error('response error');
			OAuthLink.current = body.link;
			location.href = OAuthLink.current
		} catch (error) {
			// console.log(error);
		}
	}

	return (
		<div className="w-full flex justify-between gap-2">
			<OAuth onClick={() => generateLink('42')} type="42"/>
			<OAuth onClick={() => generateLink('google')} type="google"/>
		</div>
	)
}

export default OAuthBar;