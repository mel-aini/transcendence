import { useEffect, useRef, useState } from "react";
import HistoryChart from "./HistoryChart";
import Title from "./Title";
import { data } from "./__test__/match";
import { motion } from "framer-motion";
import { MatchesData, ProfileRes, UserData } from "../../types/profile";
import fetchProfile from "./fetchProfile";
import { useGlobalContext } from "../../contexts/store";
import { useNavigate } from "react-router-dom";

const History = ({id, username}: {id: string | undefined, username: string}) => {
	const { dispatch } = useGlobalContext();
	const navigate = useNavigate();
	const parentRef = useRef();
	const [width, setWidth] = useState<number>(0);
	const [data, setData] = useState<MatchesData[] | null>(null);
	const uri = id ? 'matches/' + id : 'matches';

	const collectMatchesData = async () => {
		const ProfileRes: ProfileRes = await fetchProfile(uri);
		if (ProfileRes.status == 200)
		{	
			setData(ProfileRes.data.data);
		}
		else if (ProfileRes.status == 404)
			navigate('/');
		else if (ProfileRes.status == 401) {
			dispatch({type: 'LOGOUT'});
			navigate('/login');
		}
	}

	useEffect(() => {
		collectMatchesData();
		if (!parentRef.current) return;
		
		setWidth((parentRef.current as HTMLElement).offsetWidth);
		const handler = () => {
			if (!parentRef.current) return;
			setWidth((parentRef.current as HTMLElement).offsetWidth);
		}

		window.addEventListener('resize', handler)
		return () => {
			window.removeEventListener('resize', handler)
		}
	}, [])
	const variant = {
		hidden: { opacity: 0, width: "20%",},
		visible: { opacity: 1 , width: "100%",
			transition: { duration: 1},
		}
	}
	return (
		<div className="w-full flex flex-col sm:min-w-[560px]">
			{/* <Title width={105} height={30} title="History"/> */}
			<div ref={parentRef} className="rounded-xl w-full flex flex-col justify-around pt-16 pb-6 items-center border border-primary">
				<h1 className="text-2xl">last 10 matches</h1>
				{
					data ?
					<HistoryChart width={(width) * 90 / 100} height={200} data={data}/>
					:
					<div>Loading...</div>
				}
				<motion.div className="w-full px-6 flex flex-col gap-3"
					initial="hidden"
					animate="visible"
					variants={variant}>
					{data ? data.map((match: MatchesData, key: number) => {
						let status;
						let color;
						if (match.goals > match.opponent.goals) {
							status = "win";
							color = "#1ED947";
						}
						else if (match.goals < match.opponent.goals) {
							status = "lose";
							color = "#DD1B1B";
						}
						else {
							status = "draw";
							color = "#FFFFFF";
						}
						return (
							<div key={key} className="flex justify-between items-center border-primary border rounded-md h-[56px] w-full px-3">
								{(status == "win") && <img className="w-[30px] h-[30px] mr-1" src="/win.png"/>}
								{(status == "lose") && <img className="w-[30px] h-[30px] mr-1" src="/lose.png"/>}
								{(status == "draw") && <img className="w-[30px] h-[30px] mr-1" src="/draw.png"/>}
								<span className="shrink overflow-hidden text-ellipsis">{username}</span>
								<span className="shrink-0 px-2" style={{color:`${color}`}}>{match.goals + ' - ' + match.opponent.goals}</span>
								<span className="shrink overflow-hidden text-ellipsis">{match.opponent.username}</span>
								<img className="shrink-0 w-[30px] h-[30px] rounded-full ml-1" src={match.opponent.image}/>
							</div>
						);
					})
					:
					<div>Loading...</div>
				}
				</motion.div>
			</div>
		</div>
	)
}

export default History;