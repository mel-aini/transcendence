import { AnimatePresence, motion } from "framer-motion";
import trophy from "/trophy.svg"
import Button from "../../components/Button";
import { useContext, useDeferredValue, useEffect, useRef, useState } from "react";
import { displayContext } from "./Tournaments";
import { GiHumanPyramid } from "react-icons/gi";
import { Tournament_WS_URL, useTournamentContext } from "../../contexts/TournamentProvider";
import { validate } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/authProvider";

function PlayersNum() {
	const { state, dispatch } = useTournamentContext();

	const clickHandler = (num: number) => {
		dispatch({type: "PLAYERS_NUM", playersNum: num});
	}

	return (
		<div className="flex items-center max-w-[344px] w-full h-[50px] bg-transparent">
			<div onClick={() => clickHandler(4)} className={"flex items-center justify-center grow h-full px-4 border border-border rounded-md cursor-pointer select-none " + ((state.playersNum === 4) ? "bg-border" : "")}>
				<span>4 players</span>
			</div>
				<GiHumanPyramid className="text-3xl pr-2 grow"/>
			<div onClick={() => clickHandler(8)} className={"flex items-center justify-center grow h-full px-4 border border-border rounded-md cursor-pointer select-none " + ((state.playersNum === 8) ? "bg-border" : "")}>
				<span>8 players</span>
			</div>
		</div>
	);
}

function TournamentFrom() {
	const [validAlias, setValidAlias] = useState<boolean>(true);
	const inputRef = useRef<HTMLInputElement>(null);
	// const alias = useRef<string>('');
	const { state: token }  = useAuthContext();
	const { state, dispatch } = useTournamentContext();
	const navigate = useNavigate();

	const changeHandler = () => {
		// const input = inputRef.current;
		(validate("username", inputRef.current.value)) ?
		setValidAlias(true)
		:
		setValidAlias(false);
		dispatch({type: "ALIAS", alias: inputRef.current.value});
	}

	const clickHandler = () => {
		if (!validAlias || state.alias === '') return ;
		// if (state.socketUrl === null)
			dispatch({type: "SOCKET_URL", socketUrl: Tournament_WS_URL + state.playersNum + "/" + state.alias + "/?token=" + token.accessToken});
		navigate("/Tournament");
		// Tournament_WS_URL + state.playersNum + "/" + username
	}

	useEffect(() => {
		if (inputRef)
			inputRef.current.value = state.alias;
	}, []);

	return (
		<div className="flex flex-col gap-8 items-center w-full">
			<div className="relative flex flex-col gap-4 items-center w-full">
				<input ref={inputRef} onChange={changeHandler} type="text" placeholder="Tournament’s  alias" className={"placeholder-[#858585] border rounded-md max-w-[344px] w-full h-[50px] px-4 bg-transparent outline-none duration-200 " + (validAlias ? "border-border" : "border-red-600") } />
				{
					!validAlias &&
					<span className="absolute top-0 left-[30%] bg-secondary px-1 -translate-x-1/2 -translate-y-1/2 text-red-600 text-xs">invalid alias</span>
				}
				<PlayersNum />
			</div>
			<div onClick={clickHandler} className="w-full flex justify-center">
				<Button className="w-full max-w-[344px]">Join</Button>
			</div>
		</div>
	);
}

function JoinTournament() {
	const display = useContext(displayContext);

	return (
		<AnimatePresence>
		{
			display.display &&
			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{duration: 0.3}}
				exit={{ opacity: 0}}
				className="absolute z-10">
				<div className="fixed top-0 start-0 bg-black opacity-70 w-full min-h-[100vh] px-5" onClick={() => display.setDisplay(false)}/>
				<motion.div
				initial={{top: 0}}
				animate={{top: "50%"}}
				transition={{duration: 0.1}}
				exit={{ top: 0}}
				className="z-50 fixed bg-secondary max-h-[600px] min-h-[450px] max-w-[521px] w-[90%] h-[90%] border border-border rounded-[10px] left-[50%] -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-5 duration-300 px-5">
					<div onClick={() => display.setDisplay(false)} className="absolute w-5 h-5 bg-[#DD1B1B] left-full top-[4.25rem] cursor-pointer">
						<span className="absolute w-[13px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[0.5px] rotate-45" />
						<span className="absolute w-[13px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[0.5px] rotate-[135deg]" />
					</div>
					<img src={trophy} alt="" className="w-[150px] h-[150px]"/>
					<span className="text-3xl pr-2 text-center">Join Tournament</span>
					<TournamentFrom />
				</motion.div>
			</motion.div>
		}
		</AnimatePresence>
	);
}

export default JoinTournament;