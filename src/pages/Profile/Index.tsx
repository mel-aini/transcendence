import States from "./States";
import History from "./History";
import Friends from "./Friends";
import ProfileHeader from "./ProfileHeader";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/store";
import { ProfileRes, UserData } from "../../types/profile";
import { useNavigate, useParams } from "react-router-dom";
import fetchProfile from "./fetchProfile";

const Index = () => {
	const { dispatch } = useGlobalContext();
	const navigate = useNavigate();
	const { id } = useParams();
	const user = id ? 'users/' + id : 'profile'
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

	useEffect(() => {
		collectData();
	} ,[])

	return (
		<div className="flex flex-col justify-center items-center relative z-0">
			<ProfileHeader user={user} data={data} />
			<div className="w-full 2xl:px-0 ">
				{/* <div className="flex flex-col xl:flex-row pt-20 xl:mt-[75px] gap-5 pb-7"> */}
				<div className="xl:h-[800px] grid grid-cols-1 pt-20 xl:grid-cols-7 xl:mt-[75px] gap-5 pb-7">
					{/* <div className="sm:min-w-[560px] flex flex-col-reverse xl:flex-col gap-5"> */}
						<States data={data} />
						<Friends id={id} />
					{/* </div> */}
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