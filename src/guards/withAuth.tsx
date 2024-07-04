import { ComponentType } from "react";
import { useAuthContext } from "../contexts/authProvider";
import jwt from "../utils/jwt";
import UpdateToken from "./UpdateToken";

function withAuth(Component: ComponentType) {

	function UpdatedComponent() {
		const { state }  = useAuthContext();
		if (!jwt.isValid(state.accessToken)) {

			return (
				<UpdateToken>
					<Component />
				</UpdateToken>
			)
		}

		return (
			// <WithSocket>
				<Component />
			// </WithSocket>
		);
	}

	return (
		<UpdatedComponent />
	);
}

export default withAuth;
