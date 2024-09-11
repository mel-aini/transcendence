import InfiniteScrollObserver from "./InfiniteScrollObserver";
import { INotification } from "../contexts/store";
import Notification from "./Notification";
import { useEffect, useState } from "react";
import { useNotificationsContext } from "../contexts/notificationsProvider";
import { MdOutlineClearAll } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useGlobalWebSocketContext } from "../contexts/globalWebSokcketStore";

async function getNotifications() {
    const res = await api.get('api/notifications/?start=0&end=10')
    return res;
}

function Notifications() {
	const [notifications, setNotifications] = useState<INotification[]>([]);
	const { lastJsonMessage, sendJsonMessage } = useGlobalWebSocketContext();
	const { dispatch } = useNotificationsContext();
	const { data, isLoading, isError } = useQuery({
        queryKey: ['notifications'], 
        queryFn: async () => getNotifications(),
		staleTime: 0,
		gcTime: 0
    });

	const whenFetched = (data: any) => {
		setNotifications(prev => [...prev, ...data]);
	}

	const clearNotifications = () => {
		sendJsonMessage({
			type: "noti_clear",
			identifier: '-',
			data: {}
		})
	}

	useEffect(() => {
		dispatch({type: 'MARK_IS_READ', payload: true});
		sendJsonMessage({
			type: "noti_read",
			identifier: null,
			data: {}
		})
		if (data) {
			setNotifications(data.data)
		}
	}, [data])

	useEffect(() => {
		if (lastJsonMessage) {
			if (lastJsonMessage.type == 'notification') {
				if (lastJsonMessage.identifier == 'noti_clear' && lastJsonMessage.code == 200) {
					setNotifications([]);
				}
			}
		}
	}, [lastJsonMessage])

	if (isLoading) {
		return <h1>loading...</h1>
	}

	if (isError) {
		return <h1>error</h1>
	}

	return ( 
		<>
			{
				notifications.length == 0 && 
				<div>you have no notifications</div>
			}
			{
				notifications.length > 0 &&
				<>
					<div className="flex justify-end">
						<button 
							onClick={clearNotifications}
							className="flex items-center gap-2 border p-1 px-3 rounded-lg border-dark">
							<span className="text-sm text-gray1">clear all</span>
							<MdOutlineClearAll className="fill-gray1" />
						</button>
					</div>
					{
						notifications.map((notification, index) => {
							return (
								<Notification key={index} notData={notification} />
							)
						})
					}
					<InfiniteScrollObserver
						endPoint="api/notifications"
						start={10}
						chunkSize={10}
						whenFetched={whenFetched} />
				</>
			}
		</>
	);
}

export default Notifications;