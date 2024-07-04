import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import jwt from "../utils/jwt";
import { useAuthContext } from "../contexts/authProvider";

function withoutAuth(Component: ComponentType) {

	function UpdatedComponent() {

		// const { state } = useAuthContext();
	
		// if (jwt.isValid(state.accessToken)) {
		// 	return <Navigate to="/dashboard" />
		// }

		return (
			<Component />
		);
	}

	return <UpdatedComponent />;
}

export default withoutAuth;

// user login
// username: mel-test
// password: MEL-test123