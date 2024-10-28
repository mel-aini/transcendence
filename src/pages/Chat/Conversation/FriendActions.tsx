import { ComponentProps, useEffect, useState } from "react";
import { useChatContext } from "../../../contexts/chatProvider";
import { useGlobalWebSocketContext } from "../../../contexts/globalWebSokcketStore"
import { useGlobalContext } from "../../../contexts/store";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<'div'> {
	className?: string
	close: () => void
}

function FriendActions({className, close}: Props) {
	const { state, dispatch } = useChatContext();
	const { dispatch: gDispatch } = useGlobalContext();
	const { lastJsonMessage, sendJsonMessage } = useGlobalWebSocketContext();
	const [isInviting, setIsInviting] = useState(false);
	const [isBlocking, setIsBlocking] = useState(false);

	const play = () => {
		setIsInviting(true);
		sendJsonMessage({
			type: "invite",
			identifier: state.conversation_header.username,
  		})
	}

	const block = () => {
		setIsBlocking(true);
		sendJsonMessage({
			type: "block",
			identifier: state.conversation_header.username,
  		})
	}

	useEffect(() => {
		if (!isInviting || !isBlocking) return;
		if (lastJsonMessage?.type == 'invite') {
			if (lastJsonMessage?.code == 200) {
				gDispatch({type: 'ALERT', message: "Invitation sent successfully", dispatch: gDispatch});
			}
			else {
				gDispatch({type: 'ALERT', message: "Error happens while sending game invitation", isError: true, dispatch: gDispatch});
			}
		}
		else if (lastJsonMessage?.type == "user-action" && lastJsonMessage?.data?.value == 'block') {
			if (lastJsonMessage?.code == 200) {
				dispatch({type: 'FOCUS', state: false});
				dispatch({type: 'CONVERSATION', conversation: {
					id: null,
					state: null
				}})
				gDispatch({type: 'ALERT', message: "user blocked successfully", dispatch: gDispatch});
			}
			else {
				gDispatch({type: 'ALERT', message: "Error happens while blocking.", isError: true, dispatch: gDispatch});
			}
		}
		setIsInviting(false)
		setIsBlocking(false);
		close()
	}, [lastJsonMessage])

	return ( 
		<div className={twMerge("flex flex-col py-5 border border-border px-5 gap-2 bg-bg rounded-md", className)}>
			<button onClick={play}>play</button>
			<hr />
			<button onClick={block}>block</button>
		</div>
	 );
}

export default FriendActions;