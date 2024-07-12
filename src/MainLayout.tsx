import { Outlet } from "react-router-dom";
import Alert from "./components/Alert";

function MainLayout() {
	
	return (
		<>
			<Alert />
			<Outlet />
		</>
	)
}

export default MainLayout;