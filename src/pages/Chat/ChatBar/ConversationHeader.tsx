import User from "../../../components/User";
import { useChatContext } from "../../../contexts/chatProvider";
import { IoIosArrowBack } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

function ConversationHeader() {
	const {dispatch} = useChatContext();

	const handler = () => {
		dispatch({type: 'FOCUS', state: false})
	}

	return ( 
		<div className="w-full px-5 py-3 border-b border-b-dark shrink-0 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<IoIosArrowBack onClick={handler} className="lg:hidden text-xl cursor-pointer" />
				<User width={30} url="https://images.unsplash.com/photo-1669937401447-7cfc6e9906e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGdhbWluZyUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" />
				<h2>mel-aini</h2>
			</div>
			<BsThreeDots className="text-white cursor-pointer" />
		</div>
	);
}

export default ConversationHeader;