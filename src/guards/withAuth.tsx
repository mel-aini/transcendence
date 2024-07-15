import { ComponentType, useEffect } from "react";
import { useAuthContext } from "../contexts/authProvider";
import jwt from "../utils/jwt";
import UpdateToken from "./UpdateToken";
import ChatContextProvider from "../contexts/chatProvider";
import ChatLogic from "../logic/ChatLogic";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../contexts/store";

function Nested({ Component }: { Component: ComponentType }) {
	const { state } = useLocation();
	const { dispatch } = useGlobalContext();

	useEffect(() => {
		if (state?.message) {
			console.log(state?.message)
			dispatch({type: 'ALERT', content: state.message})
		}
	}, [])

	return (
		<ChatContextProvider>
			{/* <ChatLogic> */}
				<Component />
			{/* </ChatLogic> */}
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