import States from "./States";
import History from "./History";
import Friends from "./Friends";
import ProfileHeader from "./ProfileHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/store";
import { UserData } from "../../types/profile";
import { useNavigate, useParams } from "react-router-dom";

const Index = () => {
	const { id } = useParams();
	const user = id ? 'users/' + id : 'profile'

	const { dispatch } = useGlobalContext();
	const [data, setData] = useState<UserData | null>(null);
	const navigate = useNavigate()
	// const [errorMsg, setError] = useState<string | null>(null);

	const collectData = async () => {
		dispatch({type: 'LOADING', state: true})
		try {
			const res = await axios.get('http://localhost:3000/' + user);
			// throw new Error('internal server error')
			setData(res.data);
		} catch (error: any) {
			// if (error)
			if (error.response.status == 404) {
				// to replace with Not Found
				navigate('/');
			} else {

			}
		}
		dispatch({type: 'LOADING', state: false})
	}

	useEffect(() => {
		collectData();
	} ,[])

	return (
		<div className="flex flex-col justify-center items-center">
			<ProfileHeader data={data} />
			<div className="w-full 2xl:px-0 ">
				<div className="flex flex-col xl:flex-row pt-20 xl:mt-[75px] gap-5">
					<div className="sm:min-w-[560px] flex flex-col-reverse xl:flex-col gap-5">
						<States data={data} />
						<Friends />
					</div>
					<History />
				</div>
			</div>
		</div>
	);
}

export default Index;