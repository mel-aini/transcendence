import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "./contexts/store";

function MainLayout() {
	const {state, dispatch} = useGlobalContext();
	const socket = state.ws;
	useEffect(() => {
		if (socket) {
			console.log('socket changed')
			socket.onopen = () => {
				console.log('connected')
			}
			socket.onmessage = (event) => {
				console.log(event)
			}
		}
	}, [state.ws])

	return (
		<>
			<Outlet />
		</>
	)
}

export default MainLayout;