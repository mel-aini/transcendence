import { FiSearch } from "react-icons/fi";
import Input from "./Input";
import { FormEvent, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import User from "./User";

interface User {
    username: string
    profile_image: string
}

const Users: User[] = [
    {
        username: 'mel-aini',
        profile_image: "url('/famous-table-tennis-players.png')"
    },
    {
        username: 'ochouikh',
        profile_image: "url('/famous-table-tennis-players.png')"
    },
    {
        username: 'abel-all',
        profile_image: "url('/famous-table-tennis-players.png')"
    },
    {
        username: 'ychahbi',
        profile_image: "url('/famous-table-tennis-players.png')"
    },
    {
        username: 'ebennamer',
        profile_image: "url('/famous-table-tennis-players.png')"
    },
]

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function getUsers({}) {
    // const res = await axios.get()
    const res = await axios.get('http://localhost:3000/users')
    // await sleep(3000)
    return res;
}

function UserSkelton() {
    return (
        <div className="flex items-center gap-5">
            <div className="size-10 bg-bg rounded-full animate-pulse"></div>
            <div className="h-4 w-24 bg-bg rounded-full animate-pulse"></div>
        </div>
    )
}

function Result({user}: {user: string}) {

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['searchUsers'], 
        queryFn: async () => getUsers(user)
    });

    useEffect(() => {
        refetch();
    }, [user])
    if (isLoading) return (
        <div className="space-y-3">
            <UserSkelton />
            <UserSkelton />
            <UserSkelton />
            <UserSkelton />
            <UserSkelton />
        </div>
    )
    if (isError) return (
        <div>error</div>
    )

    return (
        <div className="space-y-3">
            {
                data && data.data.map((elem: User, index: number) => {
                    return <div key={index} className="flex items-center gap-3">
                        <User border url={elem.profile_image} />
                        <h1>{elem.username}</h1>
                    </div>
                })
            }
        </div>   
    );
}

function SearchUsers() {
    const [user, setUser] = useState('');

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submitted')
    }

    return (
        <div className="bg-secondary rounded-md p-10 space-y-5">
            <form
                onSubmit={(e) => submitHandler(e)} 
                className='flex justify-between gap-3'>
                <Input onChange={(e) => setUser(e.target.value)} type='text' className="w-full border-border" placeholder="search for a user" />
                {/* <button className="shrink-0 size-[48px] rounded-md border border-border flex justify-center items-center">
                    <FiSearch />
                </button> */}
            </form>
            {user != '' && <Result user={user}  />}
        </div>
    );
}

export default SearchUsers;