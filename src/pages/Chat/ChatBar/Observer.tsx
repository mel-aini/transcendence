import { useEffect, useLayoutEffect, useRef } from "react";
import { useChatContext } from "../../../contexts/chatProvider";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Observer() {
	const { state, sendJsonMessage } = useChatContext();
	const container = useRef(null);
	const convId = useRef<number | string | null>(null);
	const firstMsgId = useRef<number | string | null>(null);
	const oldHeight = useRef(0);
	const oldScrollTop = useRef(0);

	useEffect(() => {
		convId.current = state.conversation.id
		firstMsgId.current = state.messages[0]?.id;
	}, [state.conversation, state.messages])

	const callback = ((entries: IntersectionObserverEntry[]) => {
		const element = entries[0];
		if (element.isIntersecting) {
			const parent = document.querySelector('.messages-container');
			if (!container.current || !parent) return;
			oldHeight.current = parent.scrollHeight;
			console.log('it is intersecting');
			oldScrollTop.current = parent.scrollTop;
			sendJsonMessage({
				type: 'messages',
				limit: 10,
				conversation_id: convId.current,
				message_id: firstMsgId.current
			})
		}
	})
	
	useEffect(() => {
		if (!container.current) return;

		const obs = new IntersectionObserver(callback, {
			threshold: 0
		});
		obs.observe(container.current)
	
		return () => {
			console.log('unmounted')
			if (!container.current) return;
			obs.unobserve(container.current);
		}
	}, [])

	useLayoutEffect(() => {
		const parent = document.querySelector('.messages-container');
		if (!container.current || !parent) return;
		parent.scrollTop = parent.scrollHeight - oldHeight.current + oldScrollTop.current;
	}, [state.messages])

	return (
		<>
			{!state.conversation.limitReached && <div
				ref={container} className="h-[40px] flex justify-center items-center">
				<AiOutlineLoading3Quarters className='animate-spin' />
			</div>}
			{state.conversation.limitReached && 
				<div className="h-40 flex justify-center items-center">
					you have reached the limit!
				</div>
			}
		</>
	);
}

export default Observer;