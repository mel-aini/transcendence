import Input from "../../../components/Input";
import { FiSearch } from "react-icons/fi";
import { useChatContext } from "../../../contexts/chatProvider";
import { useAuthContext } from "../../../contexts/authProvider";
import { FormEvent, useRef, useState } from "react";
import { isEmpty } from "../../../utils/validation";
import api from "../../../api/axios";
import User from "../../../components/User";
import send_icon from "/send_icon.svg"

interface Friend {
	profile_image: string
	username: string
}

interface Props {
	onClose: () => void
}

function SearchFriends({onClose}: Props) {
	const { state } = useAuthContext();
	const { dispatch, sendJsonMessage: sendChatJsonMessage} = useChatContext();
	const inputRef = useRef('');
	const [friends, setFriends] = useState<Friend[]>([]);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (isEmpty(inputRef.current)) return;
		const res = await api.get('friends/?filter=' + inputRef.current);
		setFriends(res.data);
		inputRef.current = '';
	}

	const sendMessageHandler = (friend: any) => {
		sendChatJsonMessage({
			type: 'getConversation',
			user1: state.username, 
			user2: friend.username
		})
		dispatch({type: 'CONVERSATION_HEADER', conversation_header: {
			username: friend.username,
			avatar: friend.profile_image,
			id: friend.id
		}})
		onClose();
	}

	return (
		<div 
			className="w-[90vw] max-w-[500px] h-[300px] overflow-y-hidden bg-secondary rounded-md p-10 space-y-5">
			<form onSubmit={onSubmit} className="flex justify-between gap-2">
				<Input onChange={(e) => inputRef.current = e.target.value} type="text" placeholder="search for a friend" className="border border-border w-full" />
				<button type="submit" className="shrink-0 size-[48px] flex justify-center items-center border border-border rounded-md">
					<FiSearch />
				</button>
			</form>
			<div className="space-y-3 h-[150px] overflow-auto">
				{
					friends.map((friend, index) => {
						return (
							<div 
								key={index}
								className="flex justify-between items-center">
								<div className="flex items-center gap-3">
									<User border url={friend.profile_image} />
									<h3>{friend.username}</h3>
								</div>
								<div 
									onClick={() => sendMessageHandler(friend)}
									className="bg-secondary border border-border size-[40px] flex justify-center items-center rounded-md cursor-pointer select-none">
									<img src={send_icon} alt="" width={20} height={20}/>
								</div>
							</div>
						)
					})
				}
			</div>
		</div>
	);
}

export default SearchFriends;