import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { useGlobalContext } from "./store";
import { useTournamentContext } from "./TournamentProvider";
import { useNavigate } from "react-router-dom";
import { UserData } from "../types/profile";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { useAuthContext } from "./authProvider";
import useWebSocket from "react-use-websocket";

export interface Coordinates {
	x: number,
	y: number,
}

export interface score {
	my: number,
	side: number,
}

export enum Levels {
	FindingOpponent,
	OpponentFound,
	OpponentIsReady,
	WaitingForOpponent
}

export interface GameData {
	level: Levels,
	opponent: UserData | null,
	counter: number,
	status: string,
	ballData: Coordinates,
	myPaddleData: Coordinates,
	sidePaddleData: Coordinates,
	score: score,
	directions: {
		my: "right" | "left",
		side: "right" | "left",
	},
	result: {
		isEndGame: boolean,
		status: string,
		xp: number,
	},
	custom: {
		ball: string,
		paddle: string,
		table: string,
	},
	timer: number,
	isTournament: boolean,
	time: number
}

const initialState: GameData = {
	level: Levels.FindingOpponent,
	opponent: null,
	counter: 3,
	status: "ready",
	ballData: {
		x: 50,
		y: 50,
	},
	myPaddleData: {
		x: 1,
		y: 50,
	},
	sidePaddleData: {
		x: 97,
		y: 50,
	},
	score: {
		my: 0,
		side: 0,
	},
	directions: {
		my: "left",
		side: "right",
	},
	result: {
		isEndGame: false,
		status: '',
		xp: 0,
	},
	custom: {
		ball: "white",
		paddle: "white",
		table: "rgba(255, 255, 255, 0.1)",
	},
	timer: 9,
	isTournament: false,
	time: 0
};

export const PingPongContext = createContext<{ state: GameData, dispatch: Dispatch<any>, lastJsonMessage: any, sendJsonMessage: SendJsonMessage}>({
	state: initialState,
	dispatch: () => {},
	lastJsonMessage: '',
	sendJsonMessage: () => {
	}
});

const reducer = (state: GameData, action: any) => {
	switch (action.type)
	{
		case 'CHLEVEL':
			return {
				...state,
				level: action.level
			}
		case 'OPPONENT':
			return {
				...state,
				opponent: action.opponent
			}
			case 'COUNTER':
				return { 
					...state, 
					counter: action.counter
				}
			case 'STATUS':
				return { 
					...state, 
					status: action.status
				}
			case 'ball_Data':
				return { 
					...state, 
					ballData: action.ballData
				}
			case 'my_Paddle_Data':
				return { 
					...state, 
					myPaddleData: action.myPaddleData
				}
			case 'side_Paddle_Data':
				return { 
					...state, 
					sidePaddleData: action.sidePaddleData
				}
			case 'SCORE':
				return { 
					...state, 
					score: action.score
				}
			case 'DIRECTIONS':
				return { 
					...state, 
					directions: action.directions
				}
			case 'is_end_game':
				return { 
					...state, 
					isEndGame: action.isEndGame
				}
			case 'RESULT':
				return { 
					...state, 
					result: action.result
				}
			case 'CUSTOM':
				return { 
					...state, 
					custom: action.custom
				}
			case 'TIMER':
				return { 
					...state, 
					timer: action.timer
				}
			case 'IS_Tournament':
				return { 
					...state, 
					isTournament: action.isTournament
				}
			case 'TIME':
				return { 
					...state, 
					time: action.time
				}
			case 'RESET':
				return initialState;
		default:
			return state;
	}
}

const PingPongContextProvider = ({isTournament, children} : {isTournament: boolean, children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { state: profileData } = useGlobalContext();
	const username: string | undefined = profileData.userData?.username;
	const { lastJsonMessage: tournMessage, sendJsonMessage: sendTournMessage, state: tournState } = useTournamentContext();
	const navigate = useNavigate();

	const { state: token }  = useAuthContext();
	const { state: stateGlobal } = useGlobalContext();
	// const [ searchParams ] = useSearchParams();
	// const gameId = searchParams.get('gameId');

	const fullWsUrl: string = stateGlobal.gameId ? GAME_WS_URL + stateGlobal.gameId + "/?token=" : GAME_WS_URL + "random/?token=";
	const { lastJsonMessage, sendJsonMessage } = useWebSocket(fullWsUrl + token.accessToken,
		{
			onOpen: () => dispatch({ type: "RESET" }),
			share: false,
			shouldReconnect: () => false,
		},
		!isTournament
	);

	const isEmptyObject = (obj: any) => {
		if (obj === null)
			return (true);
		return JSON.stringify(obj) === '{}';
	};

	// useEffect(() => {
	// }, []);

	useEffect(() => {
		// console.log(lastJsonMessage);

		if (!isEmptyObject(lastJsonMessage))
		{
			// if (lastJsonMessage.type == "ball")
			// 	console.log(lastJsonMessage);
			if (lastJsonMessage.type == "opponents")
			{
				dispatch({type: 'IS_Tournament', isTournament: isTournament});
				(lastJsonMessage.user1.username == username) ? dispatch({type: "OPPONENT", opponent: lastJsonMessage.user2})
				:
				dispatch({type: "OPPONENT", opponent: lastJsonMessage.user1});
				dispatch({type: 'CHLEVEL', level: Levels.OpponentFound});
			}
			else if (lastJsonMessage.type == "init_paddle")
			{
				(lastJsonMessage.my == 1) ?
				dispatch({type: "DIRECTIONS", directions: {...state.directions, my: "left", side: "right"}})
				:
				dispatch({type: "DIRECTIONS", directions: {...state.directions, my: "right", side: "left"}});

				dispatch({type: "my_Paddle_Data", myPaddleData: {...state.myPaddleData, x: lastJsonMessage.my}});
				dispatch({type: "side_Paddle_Data", sidePaddleData: {...state.sidePaddleData, x: lastJsonMessage.side}});

			}
			else if (lastJsonMessage.type == "ball")
			{
				const ballData: Coordinates = {
					x: lastJsonMessage.x,
					y: lastJsonMessage.y
				}
				dispatch({type: "ball_Data", ballData: ballData});
				dispatch({type: "TIME", time: lastJsonMessage.time});
			}
			else if (lastJsonMessage.type == "paddle")
			{
				dispatch({type: "side_Paddle_Data", sidePaddleData: {...state.sidePaddleData, y: lastJsonMessage.pos}});
			}
			else if (lastJsonMessage.type == "score")
			{
				// console.log(lastJsonMessage);
				(state.directions.my == "right") ?
				dispatch({type: "SCORE", score: {...state.score, my: lastJsonMessage.right, side: lastJsonMessage.left}})
				:
				dispatch({type: "SCORE", score: {...state.score, my: lastJsonMessage.left, side: lastJsonMessage.right}});
			}
			else if (lastJsonMessage.type == "end")
			{
				// console.log(lastJsonMessage);
				
				dispatch({type: "RESULT", result: {...state.result, status: lastJsonMessage.status, xp: lastJsonMessage.xp, isEndGame: true}});
			}
			else if (lastJsonMessage.type == "disconnect")
			{
				// console.log(lastJsonMessage);
				dispatch({type: "RESULT", result: {...state.result, status: lastJsonMessage.status, xp: lastJsonMessage.xp, isEndGame: true}});
				lastJsonMessage.status == "win"
				?
				dispatch({type: "SCORE", score: {...state.score, my: 3, side: 0}})
				:
				dispatch({type: "SCORE", score: {...state.score, my: 0, side: 3}});
			}
		}
		
	}, [lastJsonMessage]);

	useEffect(() => {

		if (!isEmptyObject(tournMessage))
		{
			if (tournMessage.type != "ball")
				console.log("tournMessage", tournMessage);

			if (tournMessage.type == "opponents")
			{
				dispatch({type: 'IS_Tournament', isTournament: isTournament});
				(tournMessage.user1.alias == tournState.alias) ? dispatch({type: "OPPONENT", opponent: tournMessage.user2})
				:
				dispatch({type: "OPPONENT", opponent: tournMessage.user1});
				dispatch({type: 'CHLEVEL', level: Levels.OpponentFound});
				sendTournMessage( { type: 'handshake' } );
			}
			else if (tournMessage.type == "ready")
			{
				navigate('match-making');
			}
			else if (tournMessage.type == "init_paddle")
			{
				(tournMessage.my == 1) ?
				dispatch({type: "DIRECTIONS", directions: {...state.directions, my: "left", side: "right"}})
				:
				dispatch({type: "DIRECTIONS", directions: {...state.directions, my: "right", side: "left"}});

				dispatch({type: "my_Paddle_Data", myPaddleData: {...state.myPaddleData, x: tournMessage.my}});
				dispatch({type: "side_Paddle_Data", sidePaddleData: {...state.sidePaddleData, x: tournMessage.side}});

			}
			else if (tournMessage.type == "ball")
			{
				const ballData: Coordinates = {
					x: tournMessage.x,
					y: tournMessage.y
				}
				dispatch({type: "ball_Data", ballData: ballData});
				dispatch({type: "TIME", time: tournMessage.time});
			}
			else if (tournMessage.type == "paddle")
			{
				dispatch({type: "side_Paddle_Data", sidePaddleData: {...state.sidePaddleData, y: tournMessage.pos}});
			}
			else if (tournMessage.type == "score")
			{
				// console.log(tournMessage);
				(state.directions.my == "right") ?
				dispatch({type: "SCORE", score: {...state.score, my: tournMessage.right, side: tournMessage.left}})
				:
				dispatch({type: "SCORE", score: {...state.score, my: tournMessage.left, side: tournMessage.right}});
			}
			else if (tournMessage.type == "end")
			{
				// console.log(tournMessage);
				dispatch({type: "RESULT", result: {...state.result, status: tournMessage.status, isEndGame: true}})
			}
			else if (tournMessage.type == "disconnect")
			{
				// console.log(tournMessage);
				dispatch({type: "RESULT", result: {...state.result, status: tournMessage.status, isEndGame: true}});
				tournMessage.status == "win"
				?
				dispatch({type: "SCORE", score: {...state.score, my: 3, side: 0}})
				:
				dispatch({type: "SCORE", score: {...state.score, my: 0, side: 3}});
			}
		}
		
	}, [tournMessage]);
	
	return (
		<PingPongContext.Provider value={{state, dispatch, lastJsonMessage, sendJsonMessage}}>
			{children}
		</PingPongContext.Provider>
	)
}

const GAME_WS_URL = "ws://127.0.0.1:8000/ws/game/";
export const usePingPongContext = () => useContext(PingPongContext);
export default PingPongContextProvider;