import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import { DropMenuTypes } from "./NavBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "../contexts/store";

interface Props {
	dropMenuType: MutableRefObject<DropMenuTypes>
	setDropMenu: Dispatch<SetStateAction<boolean>>
}

async function getNotifications() {
    const res = await axios.get('http://localhost:3000/api/notifications?start=0&end=10')
    return res;
}

function NotificationBell({dropMenuType, setDropMenu}: Props) {
	const { dispatch } = useGlobalContext();
	const [bell, setBell] = useState(false);
	const { data, isLoading, isError } = useQuery({
        queryKey: ['searchUsers'], 
        queryFn: async () => getNotifications()
    });

	useEffect(() => {
		console.log('when mounted');
		console.log(data?.data)
		if (data)
			dispatch({type: 'NOTIFICATIONS', notifications: data.data});
	}, [])

	if (isLoading) {
		return (
			<div>loading...</div>
		)
	}

	if (isError) {
		return (
			<div>Error</div>
		)
	}


	return ( 
		<div
			onClick={() => {
				dropMenuType.current = 'notification';
				setDropMenu(prev => !prev)
			}} 
			className="relative flex items-center cursor-pointer">
			<FiBell className="text-2xl" />
			{bell && <span className="absolute -top-1 right-0 size-3 rounded-full bg-red-500"></span>}
		</div>
	);
}

export default NotificationBell;