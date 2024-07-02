import { ComponentType, useEffect } from "react";
import ProfileContextProvider, { useProfileContext } from "../contexts/profileStore";
import GlobalWebSocketContextProvider, { useGlobalWebSocketContext } from "../contexts/globalWebSokcketStore";

function withProfile(Component: ComponentType) {


	function UpdatedComponent() {
		return (
			<ProfileContextProvider>
				<GlobalWebSocketContextProvider>
					<Component />
				</GlobalWebSocketContextProvider>
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