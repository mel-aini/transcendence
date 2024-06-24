import States from "./States";
import History from "./History";
import Friends from "./Friends";
import ProfileHeader from "./ProfileHeader";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/store";
import { ProfileRes, UserData } from "../../types/profile";
import { useNavigate, useParams } from "react-router-dom";
import fetchProfile from "./fetchProfile";
import { closeProfileWebSocket, initProfileWebSocket, profileSocket } from "../../utils/profileSocket";

const Index = () => {
	const { dispatch } = useGlobalContext();
	const navigate = useNavigate();
	const { id } = useParams();
	const user = id ? 'users/' + id : 'profile';
	const [data, setData] = useState<UserData | null>(null);

	const collectData = async () => {
		dispatch({type: 'LOADING', state: true});
		const ProfileRes: ProfileRes = await fetchProfile(user);
		if (ProfileRes.status == 200)
			setData(ProfileRes.data);
		else if (ProfileRes.status == 404)
			navigate('/');
		else if (ProfileRes.status == 401) {
			dispatch({type: 'LOGOUT'});
			navigate('/login');
		}
		dispatch({type: 'LOADING', state: false});
	}

	// if (profileSocket != null)
	// {
	// 	profileSocket?.onmessage((e) => {
	// 		if (e.data.status == false)
	// 			return ;
	// 		setData((prevState) => ({
	// 			...prevState,
	// 			e.data.type: e.data.value
	// 		}));
	// 	});
	// }

	useEffect(() => {
		collectData();
		// initProfileWebSocket();
		// return (() => closeProfileWebSocket());
	} ,[])

	return (
		<div className="flex flex-col justify-center items-center relative">
			<ProfileHeader user={user} data={data} />
			<div className="w-full 2xl:px-0 ">
				<div className="xl:h-[800px] grid grid-cols-1 pt-20 xl:grid-cols-7 xl:mt-[75px] gap-5 pb-7">
						<States data={data} />
						<Friends id={id} />
					{data ?
						<History id={id} username={data.username} />
						:
						<div>Loading...</div>
					}
				</div>
			</div>
		</div>
	);
}

export default Index;