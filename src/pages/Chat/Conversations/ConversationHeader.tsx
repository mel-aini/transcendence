import { MouseEvent } from "react";
import { useChatContext } from "../../../contexts/chatStore";

function ConversationHeader() {
	const {dispatch} = useChatContext();

	const handler = (e: MouseEvent<HTMLSpanElement>) => {
		dispatch({type: 'FOCUS', state: false})
	}
	return ( 
		<div className="w-full px-5 h-[50px] bg-[#1D1D1D] shrink-0 flex items-center">
			<span onClick={e => handler(e)}>{'<-'}</span>
		</div>
	);
}

export default ConversationHeader;