import { ComponentType } from "react";
import { useAuthContext } from "../contexts/authProvider";
import jwt from "../utils/jwt";
import UpdateToken from "./UpdateToken";
import ChatContextProvider from "../contexts/chatProvider";
import ChatLogic from "../logic/ChatLogic";

function Nested({ Component }: { Component: ComponentType }) {
	return (
		<ChatContextProvider>
			<ChatLogic>
				<Component />
			</ChatLogic>
		</ChatContextProvider>
	)
}

function withAuth(Component: ComponentType) {

	function UpdatedComponent() {
		const { state }  = useAuthContext();
		if (!jwt.isValid(state.accessToken)) {

			return (
				<UpdateToken>
					<Nested Component={Component} />
				</UpdateToken>
			)
		}

		return (
			<Nested Component={Component} />
		);
	}

	return (
		<UpdatedComponent />
	);
}

export default withAuth;
