import { ComponentType } from "react";
import TournementContextProvider from "../contexts/TournementProvider";

function withTournement(Component: ComponentType) {

	function UpdatedComponent() {
		return (
			<TournementContextProvider>
			    <Component />
			</TournementContextProvider>
		);
	}

	return (
		<UpdatedComponent />
	);
}

export default withTournement;