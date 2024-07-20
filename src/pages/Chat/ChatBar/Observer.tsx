import { useEffect, useRef } from "react";
import { useChatContext } from "../../../contexts/chatProvider";

function Observer() {
	const { state, sendJsonMessage } = useChatContext();
	const container = useRef(null);
	const convId = useRef<number | string | null>(null);
	const firstMsgId = useRef<number | string | null>(null);
	const oldHeight = useRef(0);

	useEffect(() => {
		convId.current = state.conversation_id
		firstMsgId.current = state.messages[0]?.id;
	}, [state.conversation_id, state.messages])

	const callback = ((entries: IntersectionObserverEntry[]) => {
		const element = entries[0];
		if (element.isIntersecting) {
			// console.log('should fetch');
			// console.log(convId.current, firstMsgId.current)
			const parent = (container.current as HTMLElement)?.parentElement;
			if (!container.current || !parent) return;
			oldHeight.current = parent.scrollHeight;
			console.log('oldHeight.current', oldHeight.current);
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
			if (!container.current) return;
			obs.unobserve(container.current);
		}
	}, [])

	useEffect(() => {
		console.log('changed', (container.current as HTMLElement)?.parentElement?.scrollTop);
		// container.current.parentElement.scrollTop = (container.current as HTMLElement)?.parentElement?.scrollTop - oldHeight.current
		container.current.parentElement.scrollTop = (container.current as HTMLElement)?.parentElement?.scrollHeight - oldHeight.current
	}, [state.messages])

	return ( 
		<div
			ref={container}>
			<div className="text-center">loading...</div>
		</div>
	);
}

export default Observer;