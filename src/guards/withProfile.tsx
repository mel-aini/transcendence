import { ComponentType } from "react";
import ProfileContextProvider from "../contexts/profileStore";

function withProfile(Component: ComponentType) {

	function UpdatedComponent() {
		return (
			<ProfileContextProvider>
				<Component />
			</ProfileContextProvider>
		);
	}

	return (
		<UpdatedComponent />
	);
}

export default withProfile;

// user login
// username: mel-test
// password: MEL-test123