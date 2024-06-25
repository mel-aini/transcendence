import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import jwt from "../utils/jwt";
import WithSocket from "./withSocket";

function withAuth(Component: ComponentType) {

	function UpdatedComponent() {

		const accessToken = jwt.getAccessToken();

		if (!accessToken) {
			return <Navigate to="/login" />
		}

		return (
			<WithSocket>
				<Component />
			</WithSocket>
		);
	}

	return (
		<UpdatedComponent />
	);
}

export default withAuth;

// user login
// username: mel-test
// password: MEL-test123