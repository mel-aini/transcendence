import { useEffect, useRef, useState } from "react";
import HistoryChart from "./HistoryChart";
import { delay, motion } from "framer-motion";
import { MatchesData, ProfileRes } from "../../types/profile";
import fetchProfile from "./fetchProfile";
import { useGlobalContext } from "../../contexts/store";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import win from "/win.svg"
import loss from "/deny.svg"
import api from "../../api/axios";
import { useProfileContext } from "../../contexts/profileStore";

const uri = window.location.pathname.substring(1);
const index = uri.indexOf('/');
const id = (index === -1) ? undefined : uri.substring(index);
const newUri = (id) ? "matches" + id : "matches/";
const matchesResponse : MatchesData[] = await api.get('api/' + newUri).then((e) => e.data.data);

const History = () => {
	const { state, dispatchProfile } = useProfileContext();
	const navigate = useNavigate();
	const parentRef = useRef();
	const [width, setWidth] = useState<number>(0);
	// const [data, setData] = useState<MatchesData[] | null>(null);

	// const collectMatchesData = async () => {
	// 	const ProfileRes: ProfileRes = await fetchProfile(uri);
	// 	if (ProfileRes.status == 200)
	// 	{	
	// 		setData(ProfileRes.data.data);
	// 	}
	// 	else if (ProfileRes.status == 404)
	// 		navigate('/');
	// 	else if (ProfileRes.status == 401) {
	// 		dispatch({type: 'LOGOUT'});
	// 		navigate('/login');
	// 	}
	// }

	useEffect(() => {
		// collectMatchesData();
		dispatchProfile({type: "MATCHES_DATA", matchesData: matchesResponse});

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

	// const variant = {
	// 	hidden: { opacity: 0, },
	// 	visible: { opacity: 1,
	// 		transition: { duration: 1},
	// 	}
	// }

	const userClick = (path:string) => {
		navigate(path);
	}
	return (
		<div ref={parentRef} className="row-start-5 xl:row-start-1 xl:row-span-2 xl:col-start-4 xl:col-end-8">
			<Container className="h-full" childClassName="flex flex-col justify-around pt-12 sm:pt-8 pb-9 items-center">
					<h1 className="text-2xl font-semibold">last 10 matches</h1>
					{
						state.matchesData ?
						<HistoryChart width={(width) * 80 / 100} height={200} data={state.matchesData}/>
						:
						<div>Loading...</div>
					}
					<motion.div className="w-11/12 sm:w-4/5 px-2 h-[144px] flex flex-col justify-between items-center gap-3 overflow-auto"
						initial="hidden"
						animate="visible"
						>
					{
						state.matchesData ? state.matchesData.map((match: MatchesData, key: number) => {
							const variant = {
								hidden: { opacity: 0, },
								visible: { opacity: 1,
									transition: { duration: 0.5, delay: 0.5 * key},
								}
							}
							let status;
							if (match.goals > match.opponent.goals) {
								status = "win";
							}
							else if (match.goals < match.opponent.goals) {
								status = "lose";
							}
							else {
								status = "draw";
							}
							return (
								<motion.div key={key} className="flex justify-between items-center min-h-[40px] w-full select-none"
								variants={variant}
								>
									<div className="grid grid-cols-3 place-items-center h-full w-1/5">
										{/* <div > */}
											{(status == "win") && <img className="w-[24px] h-[24px]" src={win}/>}
											{(status == "lose") && <img className="w-[25px] h-[25px]" src={loss}/>}
											{(status == "draw") && <img className="w-[24px] h-[24px] mr-1" src="/draw.png"/>}
										{/* </div> */}
										{/* <div className={`flex justify-between ` + (status == "lose" ? "flex-row-reverse" : "")}> */}
										{
											status == "lose"
											?
											<>
												<span className="">{match.opponent.goals}</span>
												<span className="text-primary">{match.goals}</span>
											</>
											:
											<>
												<span className="text-primary">{match.goals}</span>
												<span className="">{match.opponent.goals}</span>
											</>
										}
										{/* </div> */}
									</div>
									<div className="flex justify-between items-center px-4 rounded-md border border-border w-4/5 h-full">
										<div onClick={() =>userClick(match.opponent.profile)} className="flex justify-between items-center cursor-pointer gap-3">
											<img className="shrink-0 w-[24px] h-[24px] rounded-full border-primary border" src={match.opponent.image}/>
											<span className="shrink overflow-hidden text-ellipsis">{match.opponent.username}</span>
										</div>
										<span className="shrink overflow-hidden text-ellipsis">lvl 2</span> {/* match.opponent.level */}
									</div>
								</motion.div>
							);
						})
						:
						<div>Loading...</div>
					}
					</motion.div>
			</Container>
		</div>
	)
}

export default History;