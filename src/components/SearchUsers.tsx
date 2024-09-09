import { FiSearch } from "react-icons/fi";
import Input from "./Input";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import User from "./User";
import InfiniteScrollObserver from "./InfiniteScrollObserver";
import { FriendsData } from "../types/profile";
import { useNavigate } from "react-router-dom";

function UserSkelton() {
    return (
        <div className="flex items-center gap-5">
            <div className="size-10 bg-bg rounded-full animate-pulse"></div>
            <div className="h-4 w-24 bg-bg rounded-full animate-pulse"></div>
        </div>
    )
}

function Result({users}: {users: FriendsData[]}) {
    const navigate = useNavigate();

    return (
        <div className="space-y-3">
            {
                users ? users.map((elem: FriendsData, index: number) => {
                    return (
                        <div key={index} className="flex justify-between items-center w-full gap-3 h-[70px] rounded-md border border-border bg-gray3 px-5">
                            <div className="flex items-center gap-4 cursor-pointer shrink overflow-hidden whitespace-nowrap">
                                <img src={elem.profile_image} alt={"icon"} width={38} height={38} className="rounded-full overflow-hidden shrink-0"/>
                                <span className="shrink overflow-hidden text-ellipsis">{elem.username}</span>
                            </div>
                            <div onClick={() => navigate(elem.profile)} className="w-[142px] h-[40px] bg-secondary rounded-md flex justify-center items-center gap-1 cursor-pointer select-none">
                                <span>view profile</span>
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


    useEffect(() => {
        if (!isFetched) {
            setIsFetched(true)
        }
    }, [isFetched])

    return (
        <div className="bg-secondary rounded-md p-10 space-y-5">
            {/* <form
                onSubmit={(e) => submitHandler(e)} 
                className='flex justify-between gap-3'> */}
                <Input onChange={(e) => {
                    setInput(e.target.value);
                    setIsFetched(false);
                    // setData([]);
                }} 
                type='text' className="w-full border-border" placeholder="search for a user" />
                {/* <button className="shrink-0 size-[48px] rounded-md border border-border flex justify-center items-center">
                    <FiSearch />
                </button> */}
            {/* </form> */}
            {<Result users={data} />}
            {isFetched && <InfiniteScrollObserver
                endPoint={`/api/search/?filter=${input}`}
                whenFetched={whenFetched}
                searchUsers={true} />}
        </div>
    );
}

export default SearchUsers;