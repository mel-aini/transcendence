import { ComponentType } from "react";
import PingPongContextProvider from "../contexts/pingPongProvider";

function withPingPong(Component: ComponentType) {

	function UpdatedComponent() {
		return (
			<PingPongContextProvider>
			    <Component />
			</PingPongContextProvider>
		);
	}

	return (
		<UpdatedComponent />
	);
}

export default withPingPong;
