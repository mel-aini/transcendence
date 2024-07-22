import User from "../../../components/User";
import { useChatContext } from "../../../contexts/chatProvider";
import { IoIosArrowBack } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import useIsOnline from "../../../hooks/useIsOnline";

function ConversationHeader() {
	const { state, dispatch } = useChatContext();
	const isOnline = useIsOnline();

	const handler = () => {
		dispatch({type: 'FOCUS', state: false})
	}

	return ( 
		<div className="w-full px-5 py-3 border-b border-b-dark shrink-0 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<IoIosArrowBack onClick={handler} className="lg:hidden text-xl cursor-pointer" />
				<User width={30} url={state.conversation_header.avatar} />
				<div className="flex gap-2 items-end">
					<h2>{state.conversation_header.username}</h2>
					{isOnline(state.conversation_header.username) && <h3 className="text-sm font-light text-green-500">online</h3>}
				</div>
			</div>
			<BsThreeDots className="text-white cursor-pointer" />
		</div>
	);
}

export default ConversationHeader;