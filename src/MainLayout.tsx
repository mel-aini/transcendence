import { Outlet } from "react-router-dom";
import Alert from "./components/Alert";
import Loading from "./components/Loading";

function MainLayout() {
	
	return (
		<>
			<Alert />
			<Outlet />
			{/* <Loading /> */}
		</>
	)
}

export default MainLayout;