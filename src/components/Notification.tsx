import { FiBell } from "react-icons/fi";
import { INotification } from "../contexts/store";
import { useGlobalWebSocketContext } from "../contexts/globalWebSokcketStore";
import { ProfileRequest } from "../types/profile";
import { useEffect, useState } from "react";
import { useChatContext } from "../contexts/chatProvider";
import api from "../api/axios";
import useIsOnline from "../hooks/useIsOnline";
import { useNavigate } from "react-router-dom";
import { LuMessagesSquare } from "react-icons/lu";

interface Props {
	notData: INotification
}

const Notification = ({ notData }: Props) => {
	const { lastJsonMessage, sendJsonMessage } = useGlobalWebSocketContext()
	const { dispatch: chatDispatch } = useChatContext();
	const [data, setData] = useState(notData);
	const navigate = useNavigate();
	const isOnline = useIsOnline();

	const acceptDenyFriend = (type: "accept" | "deny") => {
		const request: ProfileRequest = {
			type: type,
			identifier: data.id,
			data: {}
		};
		sendJsonMessage(request);
		sendJsonMessage({
			type: "to_text",
			identifier: data.notification_id,
			data: {}
		});
		setData(prev => {
			return {
				...prev,
				type: 'text',
				content: `you ${type == 'accept' ? 'accepted' : 'denied'} your friend request`
			}
		})
	}

	const acceptDenyGame = (type: "accept" | "deny" | 'join') => {
		sendJsonMessage({
			type: "to_text",
			identifier: data.notification_id,
			data: {}
		});
		if (type == 'accept' || type == 'join') {
			navigate('/ping-pong/match-making?gameId=' + data.id)
		}
		let notificationContent: string;
		switch (type) {
			case 'accept':
				notificationContent = 'you accepted your friend game request'
				break;
			case 'deny':
				notificationContent = 'you denied your friend game request'
				break;
			case 'join':
				notificationContent = data.content
				break;
		}
		setData(prev => {
			return {
				...prev,
				type: 'text',
				content: notificationContent
			}
		})
	}

	const goToChat = async () => {
		if (data.type != 'message') return;
		navigate('/chat')
		chatDispatch({type: 'CONVERSATION', conversation: {
			id: notData.id,
			state: 'loading'
		}});
	
		const userData = await api.get('/api/users/' + notData.sender);
		chatDispatch({type: 'CONVERSATION_HEADER', conversation_header: {
			username: userData.data.username,
			avatar: userData.data.profile_image,
			isOnline: isOnline(userData.data.username)
		}})
	}

	useEffect(() => {
		if (lastJsonMessage && lastJsonMessage.data && lastJsonMessage.data.type == "user-action") {
			if (lastJsonMessage.data.data == 'accept') {
				// sendJsonMessage
				setData({
					...data,
					type: "text",
					content: 'you accepted your friend request'
				})
			}
		}
	}, [lastJsonMessage])

	if (!data) return null;

	return (
		<div className={"p-5 bg-secondary rounded-lg space-y-5" + (data.type == 'message' ? ' hover:bg-slate-900 duration-300 cursor-pointer' : '')}>
			<div
				onClick={goToChat}
				className={"flex gap-5 items-center"}>
				<div className="shrink-0 w-8 flex justify-center items-center">
					{data.type != 'message' && <FiBell className="text-3xl" />}
					{data.type == 'message' && <LuMessagesSquare className="text-3xl" />}
				</div>
				<div>
					<p>{data.content}</p>
				</div>
			</div>
			{data.type == 'friend-request' && 
			<div className="pl-[52px] grid grid-cols-2 gap-2">
				<button 
					onClick={() => acceptDenyFriend('deny')} className="flex justify-center items-center border border-border py-2 rounded-lg">reject</button>
				<button 
					onClick={() => acceptDenyFriend('accept')} className="flex justify-center items-center border border-primary text-primary py-2 rounded-lg">accept</button>
			</div>}
			{data.type == 'game-request' && 
			<div className="pl-[52px] grid grid-cols-2 gap-2">
				<button className="flex justify-center items-center border border-border py-2 rounded-lg">reject</button>
				<button 
					onClick={() => acceptDenyGame('accept')}
					className="flex justify-center items-center border border-primary text-primary py-2 rounded-lg">accept</button>
			</div>}
			{data.type == 'join-game' && 
			<div className="pl-[52px] w-full">
				<button 
					onClick={() => acceptDenyGame('join')}
					className="w-full flex justify-center items-center border border-primary text-primary py-2 rounded-lg">join</button>
			</div>}
			{/* {data.type == 'message' && 
			<div className="pl-[52px] w-full">
				<button
					onClick={goToChat} 
					className="w-full flex justify-center items-center border border-border py-2 rounded-lg">open in chat</button>
			</div>} */}
		</div>
	);
}

export default Notification;