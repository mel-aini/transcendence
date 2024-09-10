import { ComponentType, useEffect } from "react";
import { useAuthContext } from "../contexts/authProvider";
import jwt from "../utils/jwt";
import UpdateToken from "./UpdateToken";
import ChatContextProvider from "../contexts/chatProvider";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../contexts/store";
import TournamentContextProvider from "../contexts/TournamentProvider";
import ProfileContextProvider from "../contexts/profileStore";
import GlobalWebSocketContextProvider from "../contexts/globalWebSokcketStore";

export function Nested({ Component }: { Component: ComponentType }) {
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
			<TournamentContextProvider>
				<ProfileContextProvider>
					<GlobalWebSocketContextProvider>
						<Component />
					</GlobalWebSocketContextProvider>
				</ProfileContextProvider>
			</TournamentContextProvider>
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