import Input from "@/components/Input";
import { FiSearch } from "react-icons/fi";
import { FormEvent, useRef, useState } from "react";
import { isEmpty } from "@/utils/validation";
import api from "@/api/axios";
import { ImSpinner8 } from "react-icons/im";
import FriendsResult from "./FriendsResult";

export interface Friend {
	profile_image: string
	username: string
}

interface Props {
	onClose: () => void
}

function SearchFriends({onClose}: Props) {
	const inputRef = useRef('');
	const [friends, setFriends] = useState<Friend[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (e: FormEvent) => {
		setIsLoading(true)
		e.preventDefault();
		if (isEmpty(inputRef.current)) return;
		const res = await api.get('friends/?filter=' + inputRef.current);
		setFriends(res.data);
		inputRef.current = '';
		setIsLoading(false)
	}

	return (
		<div 
			className="w-[90vw] max-w-[500px] max-h-[300px] overflow-y-hidden bg-secondary rounded-md p-10 space-y-5">
			<form onSubmit={onSubmit} className="flex justify-between gap-2">
				<Input onChange={(e) => inputRef.current = e.target.value} type="text" placeholder="search for a friend" className="border border-border w-full" />
				<button type="submit" className="shrink-0 size-[48px] flex justify-center items-center border border-border rounded-md">
					<FiSearch />
				</button>
			</form>
			<div className="space-y-3 max-h-[150px] overflow-auto">
			{
				isLoading && <div className="flex justify-center">
					<ImSpinner8 className="animate-spin" />
				</div>
			}
			{ 
				!isLoading && friends && friends.length == 0 &&
				<div className="text-center">No results found.</div>
			}
			{
				!isLoading && friends && friends.length > 0 &&
				<FriendsResult friends={friends} onClose={onClose} />
			}
			</div>
		</div>
	);
}

export default SearchFriends;