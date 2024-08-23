import InfiniteScrollObserver from "./InfiniteScrollObserver";
import { useGlobalContext } from "../contexts/store";
import { useEffect } from "react";
import Notification from "./Notification";

function Notifications() {
	const { state, dispatch } = useGlobalContext();

	const whenFetched = (data: any) => {
		dispatch({type: 'NOTIFICATIONS', notifications: data.data});
	}

	useEffect(() => {
		console.log('state.notifications: ')
		console.log(state.notifications[0])
	}, [state.notifications])

	return ( 
		<>
			{
				state.notifications.length == 0 && 
				<div>you have no notifications</div>
			}
			{
				state.notifications.length > 0 && 
				state.notifications.map((notification, index) => {
					return (
						<Notification data={notification} />
						// <div key={index} className="border p-5">
						// 	<p>content: {notification.data.content}</p>
						// 	<p className="text-sm font-light">type: {notification.data.type}</p>
						// </div>
					)
				})
			}
			<InfiniteScrollObserver
				endPoint="http://localhost:3000/api/notifications"
				start={10}
				chunkSize={10}
				whenFetched={whenFetched} />
		</>
	);
}

export default Notifications;