import { useContext, useEffect, useRef, useState } from "react"
import { FriendsData, ProfileRes } from "../../types/profile"
import FriendBar from "./FriendBar"
import { context } from "./Friends"
import { AnimatePresence, motion } from "framer-motion"
import { useGlobalContext } from "../../contexts/store"
import { useNavigate } from "react-router-dom"
import fetchProfile from "./fetchProfile"
import RelationBar from "./RelationBar"

const AllFriends = ({id}: {id: string | undefined}) => {
	const [relation, setRelation] = useState<string>("friend");
	const seeMore = useContext(context);
	const [onTop, setOnTop] = useState<boolean>(false);
	const refScroll = useRef();
	const refFriend = useRef();
	const refPending = useRef();
	const refBlocked = useRef();
	const uri = id ? "friends/" + id + "/" : "friends/";

	const { dispatch } = useGlobalContext();
	const navigate = useNavigate();
	const [data, setData] = useState<FriendsData[] | null>(null);
	const searchData = useRef<string>('');

	const stopScroll = useRef(false);
	const countScroll = useRef(10);

	const collectData = async (uri: string, isscroll?: boolean) => {
		const ProfileRes: ProfileRes = await fetchProfile(uri);
		console.log(ProfileRes.data);
		
		if (ProfileRes.status == 200)
		{
			if (isscroll)
			{
				if (ProfileRes.data < 10)
					stopScroll.current = true;
				if (data)
					setData(data.concat(ProfileRes.data));
				else
					setData(ProfileRes.data);
			}
			else
			{
				console.log("honaaa");
				
				setData(ProfileRes.data);
			}
		}
		else if (ProfileRes.status == 404)
			navigate('/');
		else if (ProfileRes.status == 401) {
			dispatch({type: 'LOGOUT'});
			navigate('/login');
		}
	}

	const reset = (element : any) => {
		element.children[0].classList.value = "duration-500 font-normal";
		element.children[1].classList.value = "duration-500 border-b border-primary w-full absolute top-full -translate-x-full";
	}

	const apply = (element : any) => {
		element.children[0].classList.value = "duration-500 text-primary font-medium";
		element.children[1].classList.value = "duration-500 border-b border-primary w-full";
	}
	
	const resetAll = () => {
		reset(refFriend.current);
		reset(refPending.current);
		reset(refBlocked.current);
	}

	const HandleClick = (ref: any, newRelation: string, uri: string) => {
		if (relation == newRelation)
			return ;
		setData(null);
		resetAll();
		apply(ref.current);
		
		stopScroll.current = false;
		countScroll.current = 10;
		
		setRelation(newRelation);
		collectData(uri);
	}

	useEffect(() => {
		collectData(uri);
		(window.innerHeight < 841) ? setOnTop(true) : setOnTop(false);
		// if (!parentRef.current) return;

		const handler = () => {
			// if (!parentRef.current) return;
			(window.innerHeight < 841) ? setOnTop(true) : setOnTop(false);
		}

		window.addEventListener('resize', handler)
		return () => {
			window.removeEventListener('resize', handler)
		}
	}, []);

	const scrollHandler  = (e: any) => {
		const start: any = refScroll.current;
		const end = e.target.lastChild;
		if (!end)
			return ;
		const lastPart: number = end.getBoundingClientRect().top - start.getBoundingClientRect().top;
		if (!stopScroll.current && lastPart <= 520)
		{
			console.log("heree");
			
			let name;
			if (relation == "friend")
				name = uri;
			else if (relation == "rec_inv")
				name = "pending";
			else if (relation == "blocked")
				name = "blocked";
			collectData(name + "?filter=" + searchData.current + "&start=" + countScroll.current.toString() + "&end=" + (countScroll.current + 10).toString(), true);
			countScroll.current += 10;
		}
	}

	const HandleChange = (e: any) => {
		stopScroll.current = false;
		countScroll.current = 10;
		searchData.current = e.currentTarget.value;
		let name;
		if (relation == "friend")
			name = uri;
		else if (relation == "rec_inv")
			name = "pending";
		else if (relation == "blocked")
			name = "blocked";
		collectData(name + "?filter=" + searchData.current);
	}

	return (
		<>
		<AnimatePresence>
			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{duration: 0.3}}
				exit={{ opacity: 0}}
				className="absolute">
				<div className="fixed top-0 start-0 bg-black opacity-70 w-full min-h-[100vh]" onClick={() => seeMore.setSeeAll(false)}/>
				<motion.div
					initial={{y: onTop ? '0px' : 'calc(-50% - 10px)', x: '-50%'}}
					animate={{y: onTop ? '0px' : '-50%'}}
					transition={{duration: 0.3}}
					exit={{y: onTop ? '0px' : 'calc(-50% - 10px)', x: '-50%'}}
					className={`z-10 flex flex-col justify-between gap-6 pt-[30px] pb-[58px] sm:px-16 px-8 fixed left-[50%] -translate-x-1/2 border border-primary rounded-[10px] max-w-[652px] max-h-[840px] overflow-hidden w-[90%] bg-gray3 ` + (!onTop ? "top-1/2 -translate-y-1/2" : "top-0")}>
					<span className="self-end text-sm text-secondary cursor-pointer select-none"
					onMouseEnter={(e) => {e.currentTarget.classList.replace("text-secondary", "text-white");}}
					onMouseLeave={(e) => {e.currentTarget.classList.replace("text-white", "text-secondary");}}
					onClick={() => seeMore.setSeeAll(false)}>
						close
					</span>
					<div className="flex justify-between max-w-[268px] w-full gap-2">
						<RelationBar ref={refFriend} onClick={() => HandleClick(refFriend, "friend", uri)} width={59} name={"Friends"} active={true} />
						{
							!(id) &&
							<>
								<RelationBar ref={refPending} onClick={() => HandleClick(refPending, "rec_inv", "pending")} width={67} name={"Pending"} active={false} />
								<RelationBar ref={refBlocked} onClick={() => HandleClick(refBlocked, "blocked", "blocked")} width={63} name={"Blocked"} active={false} />
							</>
						}
					</div>
					<input onChange={(e) => HandleChange(e)} type="text" placeholder="search" className="bg-transparent border-b-[0.5px] w-full px-3 pb-[9px] font-thin" />
					<div ref={refScroll} onScroll={scrollHandler} className="min-h-[590px] overflow-auto">
					{
						data && data.map((friend: FriendsData, index: number) => {
							return (
								<FriendBar key={index} friend={friend} relation={relation}/>
							)
						})
					}
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
		</>
	)
}

export default AllFriends;