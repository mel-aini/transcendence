import FriendActions from "./FriendActions";
import LevelBar from "./LevelBar";
import profile_pic from "../../../public/Ellipse.svg"
import { useEffect, useState } from "react";
import { MdHeight } from "react-icons/md";

const ProfileHeader = () => {
	const [data, setData] = useState({});

	const ProfileData = async () => {
		const res = await fetch ('http://e3r5p5:8000/api/profile/', { method: 'GET' }).then((obj) => obj.json());
		setData(res);
	}
	useEffect (() => {
		ProfileData();
	}, []);
	
	console.log(data);
	return (
		<>
			<div className="relative mb-[200px] xl:mb-[50px] flex flex-col w-full">
				<div className="w-full h-[209px] rounded-md border-primary border">
					{/* <img src="" alt="" /> */}
				</div>
				<div className="absolute left-1/2 xl:left-[15%] top-full translate-y-[-60px] -translate-x-1/2 flex flex-col justify-center items-center">
					<div className="rounded-full overflow-hidden w-[120px] h-[120px] mb-3">
						<img src={data.image} alt=""/>
					</div>
					<div className="mb-5">
						<span>{data.username}</span>
						<div className="flex justify-center items-center gap-1">
							<span className="font-thin text-[12px]">online</span>
							{data.online && <span className="w-[8px] h-[8px] rounded-full bg-[#1ED947]"></span>}
						</div>
					</div>
					<FriendActions />
				</div>
				<div className="absolute left-[90%] top-full translate-y-[-37px] -translate-x-1/2 bg-[#14FF67] w-[39px] h-[74px] xl:w-[67.5px] xl:h-[128px]
				xl:translate-y-[-64px] duration-100"></div>
			</div>
			<LevelBar />
		</>
	)
}

export default ProfileHeader;