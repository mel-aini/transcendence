import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { socket } from "./utils/socket";

function MainLayout() {
	useEffect(() => {

		const onConnect = () => {
			console.log('connected');
		}

		const onDisconnect = () => {
			console.log('disconnected')
		}

		const onMessage = (event: any) => {
			console.log('new message', event);
		}

		const onError = (event: any) => {
			console.log('error occured', event);
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('message', onMessage)
		socket.on('error', onError)

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('message', onMessage);
		}
	}, [])

	return (
		<>
			<Outlet />
		</>
	)
}

export default MainLayout;