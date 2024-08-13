import TournementContextProvider from "../contexts/TournementProvider";
import { Outlet } from "react-router-dom";

function TournementLayout() {
	return (
		<TournementContextProvider>
			<Outlet />
		</TournementContextProvider>
	);
}

export default TournementLayout;