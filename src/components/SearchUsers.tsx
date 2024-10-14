import { FiSearch } from "react-icons/fi";
import Input from "./Input";
import { useEffect, useState } from "react";
import InfiniteScrollObserver from "./InfiniteScrollObserver";
import { FriendsData } from "../types/profile";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/store";

function UserSkelton() {
    return (
        <div className="flex justify-between items-center w-full gap-3 h-[70px] rounded-md border border-border bg-gray3 px-5 animate-pulse">
            <div className="flex items-center gap-4 cursor-pointer shrink overflow-hidden whitespace-nowrap">
                <div className="size-[38px] rounded-full overflow-hidden shrink-0 bg-border"/>
                <span className="rounded-full bg-border h-4 w-24" />
            </div>
        </div>
    )
}

function Result({users}: {users: FriendsData[]}) {
    const navigate = useNavigate();
    const { dispatch } = useGlobalContext();

    const clickHandler = (profile: string) => {
        dispatch({ type: "SEARCH" });
        navigate(profile)
    }

    return (
        <div className="space-y-3">
            {
                (users.length !== 0) ? users.map((elem: FriendsData, index: number) => {
                    return (
                        <div onClick={() => clickHandler(elem.profile)} key={index} className="flex justify-between items-center w-full gap-3 h-[70px] rounded-md border border-border bg-gray3 px-5 cursor-pointer">
                            <div className="flex items-center gap-4 cursor-pointer shrink overflow-hidden whitespace-nowrap">
                                <img src={elem.profile_image} alt={"icon"} width={38} height={38} className="rounded-full overflow-hidden shrink-0"/>
                                <span className="shrink overflow-hidden text-ellipsis">{elem.username}</span>
                            </div>
                        </div>
                    )
                })
                :
                <UserSkelton />
            }
        </div>   
    );
}

function SearchUsers() {
    const [input, setInput] = useState<string>('');
    const [data, setData] = useState<FriendsData[]>([]);
    const [isFetched, setIsFetched] = useState(true);
    
    const whenFetched = (result: FriendsData[]) => {
        setData(result);
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        setIsFetched(false);
    }


    useEffect(() => {
        if (!isFetched) {
            setIsFetched(true)
        }
    }, [isFetched])

    return (
        <div className="bg-secondary rounded-md p-10 space-y-5">
            <form
                onSubmit={(e) => submitHandler(e)} 
                className='flex justify-between gap-3'>
                <Input onChange={(e) => {
                    setInput(e.target.value);
                }} 
                type='text' className="w-full border-border" placeholder="search for a user" />
                <button className="shrink-0 size-[48px] rounded-md border border-border flex justify-center items-center">
                    <FiSearch />
                </button>
            </form>
            {<Result users={data} />}
            {isFetched && <InfiniteScrollObserver
                endPoint={`search/?filter=${input}`}
                whenFetched={whenFetched}
                searchUsers={true} />}
        </div>
    );
}

export default SearchUsers;