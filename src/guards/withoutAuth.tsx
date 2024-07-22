import { ComponentType } from "react";
import { Navigate, useLocation } from "react-router-dom";
import jwt from "../utils/jwt";
import { useAuthContext } from "../contexts/authProvider";
import UpdateToken from "./UpdateToken";

function withoutAuth(Component: ComponentType) {

	function UpdatedComponent() {
		const { state }  = useAuthContext();
		const { state: locState } = useLocation();

		if (locState && locState.refer == '/login' || locState.refer == '/signup') {
			return <Component />
		}

		if (!jwt.isValid(state.accessToken)) {

			return (
				<UpdateToken>
					<Navigate to={'/dashboard'} />
				</UpdateToken>
			)
		}

		return (
			<Navigate to={'/dashboard'} />
		);
	}

	return (
		<UpdatedComponent />
	);
}

export default withoutAuth;