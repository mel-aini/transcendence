import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import jwt from "../utils/jwt";

function withoutAuth(Component: ComponentType) {

	function UpdatedComponent() {

		const accessToken = jwt.getAccessToken();
		
		if (accessToken) {
			return (
				<Navigate to="/dashboard" />
			)
		} 
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