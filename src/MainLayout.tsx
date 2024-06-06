import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { socket } from "./utils/socket";

function MainLayout() {
	useEffect(() => {

		const onConnect = () => {
			console.log('connected')
		}

		const onDisconnect = () => {
			console.log('disconnected')
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);

	}, [])

	return (
		<>
			<Outlet />
		</>
	)
}

export default MainLayout;