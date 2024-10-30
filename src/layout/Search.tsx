import { FiSearch } from "react-icons/fi";
import { useGlobalContext } from "@/contexts/store";
import Modal from "@/components/Modal";
import SearchUsers from "@/components/SearchUsers";

function Search() {
	const {state, dispatch} = useGlobalContext();
	
	return ( 
		<>
			<FiSearch
				onClick={() => dispatch({type: 'SEARCH'})} 
				className="text-2xl lg:hidden cursor-pointer" />
			<div 
				onClick={() => dispatch({type: 'SEARCH'})} 
				className="hidden lg:flex items-center text-gray1 h-10 pl-4 pr-32 rounded-md cursor-pointer border border-border">search</div>
			<Modal
				className='top-20 translate-y-0 w-11/12 max-w-[600px]'
				isOpen={state.search} 
				onClose={() => dispatch({type: 'SEARCH'})}>
				<SearchUsers />
			</Modal>
		</>
	);
}

export default Search;