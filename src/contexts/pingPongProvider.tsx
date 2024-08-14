import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import useWebSocket from "react-use-websocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { useGlobalContext } from "./store";
import { useTournementContext } from "./TournementProvider";
import { useNavigate } from "react-router-dom";

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
	opponent: string,
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
	gameId?: number,
	isTournament: boolean
}

const initialState: GameData = {
	level: Levels.FindingOpponent,
	opponent: '',
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
	gameId: undefined,
	isTournament: false
};

export const PingPongContext = createContext<{lastJsonMessage: any, sendJsonMessage: SendJsonMessage, state: GameData, dispatch: Dispatch<any>}>({
	lastJsonMessage: '',
	sendJsonMessage: () => {
	},
	state: initialState,
	dispatch: () => {}
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
			case 'GAME_ID':
				return { 
					...state, 
					gameId: action.gameId
				}
			case 'IS_TOURNAMENT':
				return { 
					...state, 
					isTournament: action.isTournament
				}
		default:
			return state;
	}
}

const PingPongContextProvider = ({isTournament, children} : {isTournament: boolean, children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { state: profileData } = useGlobalContext();
	const username: string | undefined = profileData.userData?.username;
	const fullWsUrl:string = state.gameId ? GAME_WS_URL + username + "/" + state.gameId : GAME_WS_URL + username + "/random/";
	const { lastJsonMessage, sendJsonMessage } = isTournament
	?
	{
		lastJsonMessage: {},
		sendJsonMessage: () => {}
	}
	:
		useWebSocket(fullWsUrl,
			{
				share: false,
				shouldReconnect: () => false,
			},
		)
	;
	const { state: tournState } = useTournementContext();
	const navigate = useNavigate();

	const isEmptyObject = (obj: any) => {
		if (obj === null)
			return (true);
		return JSON.stringify(obj) === '{}';
	};

	useEffect(() => {
		dispatch({type: 'IS_TOURNAMENT', isTournament: isTournament});
	}, []);

	useEffect(() => {
		// console.log(lastJsonMessage);

		if (!isEmptyObject(lastJsonMessage))
		{
			if (lastJsonMessage.type == "opponents")
			{
				(lastJsonMessage.user1 == username) ? dispatch({type: "OPPONENT", opponent: lastJsonMessage.user2})
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
		// console.log(tournState.pongMessage);

		if (!isEmptyObject(tournState.pongMessage) && isTournament)
		{
			if (tournState.pongMessage.type == "opponents")
			{
				(tournState.pongMessage.user1 == username) ? dispatch({type: "OPPONENT", opponent: tournState.pongMessage.user2})
				:
				dispatch({type: "OPPONENT", opponent: tournState.pongMessage.user1});
				dispatch({type: 'CHLEVEL', level: Levels.OpponentFound});
			}
			else if (tournState.pongMessage.type == "init_paddle")
			{
				(tournState.pongMessage.my == 1) ?
				dispatch({type: "DIRECTIONS", directions: {...state.directions, my: "left", side: "right"}})
				:
				dispatch({type: "DIRECTIONS", directions: {...state.directions, my: "right", side: "left"}});

				dispatch({type: "my_Paddle_Data", myPaddleData: {...state.myPaddleData, x: tournState.pongMessage.my}});
				dispatch({type: "side_Paddle_Data", sidePaddleData: {...state.sidePaddleData, x: tournState.pongMessage.side}});

			}
			else if (tournState.pongMessage.type == "ball")
			{
				const ballData: Coordinates = {
					x: tournState.pongMessage.x,
					y: tournState.pongMessage.y
				}
				dispatch({type: "ball_Data", ballData: ballData});
			}
			else if (tournState.pongMessage.type == "paddle")
			{
				dispatch({type: "side_Paddle_Data", sidePaddleData: {...state.sidePaddleData, y: tournState.pongMessage.pos}});
			}
			else if (tournState.pongMessage.type == "score")
			{
				// console.log(tournState.pongMessage);
				(state.directions.my == "right") ?
				dispatch({type: "SCORE", score: {...state.score, my: tournState.pongMessage.right, side: tournState.pongMessage.left}})
				:
				dispatch({type: "SCORE", score: {...state.score, my: tournState.pongMessage.left, side: tournState.pongMessage.right}});
			}
			else if (tournState.pongMessage.type == "end")
			{
				// console.log(tournState.pongMessage);
				dispatch({type: "RESULT", result: {...state.result, status: tournState.pongMessage.status, isEndGame: true}})
			}
			else if (tournState.pongMessage.type == "disconnect")
			{
				// console.log(tournState.pongMessage);
				dispatch({type: "RESULT", result: {...state.result, status: tournState.pongMessage.status, isEndGame: true}});
				tournState.pongMessage.status == "win"
				?
				dispatch({type: "SCORE", score: {...state.score, my: 3, side: 0}})
				:
				dispatch({type: "SCORE", score: {...state.score, my: 0, side: 3}});
			}
		}
		
	}, [tournState.pongMessage]);
	
	return (
		<PingPongContext.Provider value={{lastJsonMessage, sendJsonMessage, state, dispatch}}>
			{children}
		</PingPongContext.Provider>
	)
}

const GAME_WS_URL = "ws://127.0.0.1:8000/ws/game/";
export const usePingPongContext = () => useContext(PingPongContext);
export default PingPongContextProvider;