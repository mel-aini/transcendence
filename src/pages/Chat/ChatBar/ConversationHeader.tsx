import User from "../../../components/User";
import { useChatContext } from "../../../contexts/chatProvider";
import { IoIosArrowBack } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import useIsOnline from "../../../hooks/useIsOnline";
import { Link } from "react-router-dom";

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
				{state.conversation.state == 'ok' &&
					<>
						<Link to={'/users/' + state.conversation_header.username}>
							<User border className="size-[30px] cursor-pointer" url={state.conversation_header.avatar} />
						</Link>
						<div className="flex gap-2 items-end">
							<Link to={'/users/' + state.conversation_header.username}>
								<h2>{state.conversation_header.username}</h2>
							</Link>
							{isOnline(state.conversation_header.username) && <h3 className="text-sm font-light text-green-500">online</h3>}
						</div>
					</>
				}
				{state.conversation.state == 'loading' && 
					<>
						<span className="size-[30px] rounded-full bg-gray2 animate-pulse"/>
						<h2 className="w-24 h-4 bg-gray2 rounded-full" />
					</>
				}
			</div>
			<BsThreeDots className="text-white cursor-pointer" />
		</div>
	);
}

export default ConversationHeader;