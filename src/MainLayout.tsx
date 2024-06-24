import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "./contexts/store";

function MainLayout() {
	const {state, dispatch} = useGlobalContext();
	const socket = state.ws;
	useEffect(() => {
		if (socket) {
			socket.onopen = () => {
				console.log('connected')
			}
			socket.onmessage = (event) => {
				const res = JSON.parse(event.data);
				console.log(res.online)
				console.log(res.conversations)
			}
		}
	}, [state.ws])

	return (
		<Outlet />
	)
}

export default MainLayout;