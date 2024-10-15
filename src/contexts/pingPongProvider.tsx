import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { useGlobalContext } from "./store";
import { useTournamentContext } from "./TournamentProvider";
import { useNavigate } from "react-router-dom";
import { UserData } from "../types/profile";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { useAuthContext } from "./authProvider";
import useWebSocket from "react-use-websocket";
import { WS_END_POINT } from "../utils/urls";

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
	time: number,
	alias?: string
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
	time: 0,
	alias: undefined
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
			case 'TIME':
				return { 
					...state, 
					time: action.time
				}
			case 'ALIAS':
				return { 
					...state, 
					alias: action.alias
				}
			case 'RESET':
				return initialState;
		default:
			return state;
	}
}

const PingPongContextProvider = ({isTournament, children} : {isTournament: boolean, children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { state: profileData, dispatch: dispatchGlobal } = useGlobalContext();
	const username: string | undefined = profileData.userData?.username;
	const { lastJsonMessage: tournMessage, sendJsonMessage: sendTournMessage } = useTournamentContext();
	const navigate = useNavigate();

	const { state: token }  = useAuthContext();
	const { state: stateGlobal } = useGlobalContext();

	const fullWsUrl: string = stateGlobal.gameId ? "game/" + stateGlobal.gameId + "/?token=" : "game/" + "random/?token=";
	const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_END_POINT + fullWsUrl + token.accessToken,
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

	const messageHandler = (message: any) => {
		if (message.type != "ball" && message.type != "paddle")
			console.log(message);
		if (message.type == "opponents")
		{
			if (message.user1.username == username)
			{
				dispatch({type: "OPPONENT", opponent: message.user2});
				isTournament && dispatch({type: "ALIAS", alias: tournMessage.user2.alias});
			}
			else
			{
				dispatch({type: "OPPONENT", opponent: message.user1});
				isTournament && dispatch({type: "ALIAS", alias: tournMessage.user1.alias});
			}
			dispatch({type: 'CHLEVEL', level: Levels.OpponentFound});
			isTournament && sendTournMessage( { type: 'handshake' } );
		}
		else if (isTournament && message.type == "ready")
		{
			navigate('match-making');
		}
		else if (!isTournament && message.type == "ingame")
		{
			dispatchGlobal({type: 'ALERT', message: "you are already in game!!", isError: true, dispatch: dispatchGlobal})
			navigate('/ping-pong');
		}
		else if (message.type == "init_paddle")
		{
			(message.my == 1) ?
			dispatch({type: "DIRECTIONS", directions: {...state.directions, my: "left", side: "right"}})
			:
			dispatch({type: "DIRECTIONS", directions: {...state.directions, my: "right", side: "left"}});

			dispatch({type: "my_Paddle_Data", myPaddleData: {...state.myPaddleData, x: message.my}});
			dispatch({type: "side_Paddle_Data", sidePaddleData: {...state.sidePaddleData, x: message.side}});
		}
		else if (message.type == "ball")
		{
			const ballData: Coordinates = {
				x: message.x,
				y: message.y
			}
			dispatch({type: "ball_Data", ballData: ballData});
			!isTournament && dispatch({type: "TIME", time: message.time});
		}
		else if (message.type == "myPaddle")
		{
			dispatch({type: "my_Paddle_Data", myPaddleData: {...state.myPaddleData, y: message.pos}});
		}
		else if (message.type == "sidePaddle")
		{
			dispatch({type: "side_Paddle_Data", sidePaddleData: {...state.sidePaddleData, y: message.pos}});
		}
		else if (message.type == "score")
		{
			// console.log(message);
			(state.directions.my == "right") ?
			dispatch({type: "SCORE", score: {...state.score, my: message.right, side: message.left}})
			:
			dispatch({type: "SCORE", score: {...state.score, my: message.left, side: message.right}});
		}
		else if (message.type == "end")
		{
			// console.log(message);
			dispatch({type: "RESULT", result: {...state.result, status: message.status, xp: (isTournament ? 0 : message.xp), isEndGame: true}});
		}
		else if (message.type == "disconnect")
		{
			// console.log(message);
			dispatch({type: "RESULT", result: {...state.result, status: message.status, xp: (isTournament ? 0 : message.xp), isEndGame: true}});
			message.status == "win"
			?
			dispatch({type: "SCORE", score: {...state.score, my: 3, side: 0}})
			:
			dispatch({type: "SCORE", score: {...state.score, my: 0, side: 3}});
		}
	}

	useEffect(() => {
		if (!isEmptyObject(lastJsonMessage))
			messageHandler(lastJsonMessage);
		
	}, [lastJsonMessage]);

	useEffect(() => {
		if (!isEmptyObject(tournMessage))
			messageHandler(tournMessage);
		
	}, [tournMessage]);
	
	return (
		<PingPongContext.Provider value={{state, dispatch, lastJsonMessage, sendJsonMessage}}>
			{children}
		</PingPongContext.Provider>
	)
}

export const usePingPongContext = () => useContext(PingPongContext);
export default PingPongContextProvider;