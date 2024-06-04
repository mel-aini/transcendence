import SearchBar from "../../components/SearchBar";
import ConversationsList from "./Conversations/ConversationsList";
import NavBar from "./Conversations/NavBar";

function Conversations() {

	return ( 
		<div className="w-full pt-5 h-[100vh] relative flex flex-col">
			<div className="scroll-to-hide flex flex-col overflow-auto grow">
				<div className="px-5 flex flex-col shrink-0">
					<h1 className="mb-5">Conversations</h1>
					<SearchBar className="shrink-0" />
					<h1 className="mt-8 text-center shrink-0">1 message not read</h1>
				</div>
				<ConversationsList className="shrink-0" />
			</div>
			<NavBar className="shrink-0" />
		</div>
	);
}

export default Conversations;