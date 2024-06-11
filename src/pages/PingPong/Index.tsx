import { usePingPongContext } from "../../contexts/pingPongStore";
import PlayChoises from "./PlayChoises";
import { Levels } from "../../contexts/pingPongStore";
import MatchMaking from "./MatchMaking";

const Index = () => {
	const {state, dispatch} = usePingPongContext();

	return (
		<div className="min-h-[90vh] flex flex-col">
			{state.level == Levels.ChoiseGameType && <PlayChoises />}
			{state.level != Levels.ChoiseGameType && <MatchMaking />}
		</div>
	);
}

export default Index;