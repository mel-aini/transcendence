import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import jwt from "../utils/jwt";
import { useAuthContext } from "../contexts/authProvider";
import UpdateToken from "./UpdateToken";

function withoutAuth(Component: ComponentType) {

	function UpdatedComponent() {
		const { state }  = useAuthContext();
		
		if (!jwt.isValid(state.accessToken)) {
			
			return (
				<UpdateToken Component={Component}>
					<Navigate to='/dashboard' />
				</UpdateToken>
			)
		}
		
		return (
			<Navigate to='/dashboard' />
		);
	}

	return (
		<UpdatedComponent />
	);
}

export default withoutAuth;