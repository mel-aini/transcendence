import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/store";

function withAuth(Component: ComponentType) {
	const { state } = useGlobalContext();
	const navigate = useNavigate();

	function UpdatedComponent() {

		// useEffect(() => {
		// 	console.log('check login', state.isLogin)
		// 	if (!state.isLogin) navigate("/login");
		// }, [])

		return (
			<Component />
		);
	}

	return <UpdatedComponent />;
}

export default withAuth;

// user login
// username: mel-test
// password: MEL-test123