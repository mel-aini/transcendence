import { ComponentType } from "react";
import WithSocket from "./withSocket";
import { useAuthContext } from "../contexts/authProvider";
import jwt from "../utils/jwt";
import { Navigate } from "react-router-dom";
import axios from "axios";

function withAuth(Component: ComponentType) {

	function UpdatedComponent() {
		const { state }  = useAuthContext();
		console.log(state.accessToken);
		if (!jwt.isValid(state.accessToken)) {
			const token = jwt.refresh();
			if (!token) {
				return <Navigate to="/login" />
			}
			// dispatch({type: 'TOKEN', token: token})
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
