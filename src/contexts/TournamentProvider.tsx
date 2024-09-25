import { Dispatch, ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import profilePic from "/profilePic.svg";
import { useGlobalContext } from "./store";
import { Coordinates, Levels, usePingPongContext } from "./pingPongProvider";
import { useNavigate } from "react-router-dom";

export interface Player {
	username: string,
	image: string,
	isConnected: boolean,
}

export interface RoundData {
	round: number,
	players: Player[] | string[],
}

interface TournamentData {
	alias: string,
	playersNum: number,
	roundData: RoundData[],
	winner: Player | "player",
	socketUrl: string | null,
}

const initialState: TournamentData = {
	alias: '',
	playersNum: 4,
	roundData: [],
	// winner: {
	// 	username: "winner",
	// 	image: "",
	// 	isConnected: true
	// },
	winner: "player",
	socketUrl: null,
};

export const TournamentContext = createContext<{lastJsonMessage: any, sendJsonMessage: SendJsonMessage, readyState: ReadyState, state: TournamentData, dispatch: Dispatch<any>}>({
	lastJsonMessage: '',
	sendJsonMessage: () => {
	},
	readyState: ReadyState.UNINSTANTIATED,
	state: initialState,
	dispatch: () => {}
});

const reducer = (state: TournamentData, action: any) => {
	switch (action.type)
	{
		case 'ALIAS':
			return {
				...state,
				alias: action.alias
			}
		case 'PLAYERS_NUM':
			return {
				...state,
				playersNum: action.playersNum
			}
		case 'ROUND_DATA':
			return {
				...state,
				roundData: action.roundData
			}
		case 'WINNER':
			return {
				...state,
				winner: action.winner
			}
		case 'SOCKET_URL':
			return {
				...state,
				socketUrl: action.socketUrl
			}
		default:
			return state;
	}
}

const TournamentContextProvider = ({children} : {children: ReactNode}) => {
	// const {state: gameState, dispatch: gameDispatch} = usePingPongContext();
	const navigate = useNavigate();
	const [state, dispatch] = useReducer(reducer, initialState);

	const initRounds = useCallback((): RoundData[] => {
		const resetRoundData: RoundData[] = [];
		let roundsNum = 0;
		let i: number = state.playersNum / 2;
		while (i >= 1) {
			roundsNum++;
			i = i / 2;
		}
		i = 0;
		let j = state.playersNum;
		while (i < roundsNum)
		{
			const tmp: RoundData = {
				round: j,
				players: []
			};
			const play: any = [];
			let k = j;
			while (k > 0)
			{
				play.push('player');
				k--;
			};
			tmp.players = play;
			resetRoundData.push(tmp);
			j = j / 2;
			i++;
		}
		return resetRoundData;
	}, [state.playersNum])

	const {lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(state.socketUrl,
		{
			onOpen: () => {
				console.log('WebSocket connected')
				dispatch({type: "ROUND_DATA", roundData: initRounds()});
				dispatch({type: "WINNER", winner: "player"});
			},
			onClose: () => {
				console.log('WebSocket disconnected');
				// dispatch({type: "ROUND_DATA", roundData: initRounds()});
				// dispatch({type: "WINNER", winner: "player"});
			},
			share: false,
			shouldReconnect: () => false,
		},
		state.socketUrl !== null
	);

	const isEmptyObject = (obj: any) => {
		if (obj === null)
			return (true);
		return JSON.stringify(obj) === '{}';
	};

	useEffect(() => {

		if (!isEmptyObject(lastJsonMessage))
		{
			if (lastJsonMessage.type != "ball")
				console.log("TOURNAMENT context", lastJsonMessage);

			if (lastJsonMessage.type == "dashboard")
			{
				const isCompleted: boolean = (lastJsonMessage.rounds.length > state.roundData.length);
				const roundData: RoundData[] = state.roundData;
				lastJsonMessage.rounds.map((round, index: number) => {
					let i = 0;
					for (var player in round) {
						const tmp: Player = {
							image: "",
							username: round[player],
							isConnected: true
						};
						if (isCompleted)
						{
							if (index == lastJsonMessage.rounds.length - 1)
								dispatch({type: "WINNER", winner: tmp});
							else
								roundData[index].players[i] = tmp;
						}
						else
							roundData[index].players[i] = tmp;
						i++;
					}
				});
				dispatch({type: "ROUND_DATA", roundData: roundData});
			}
		}
		
	}, [lastJsonMessage]);

	return (
		<TournamentContext.Provider value={{lastJsonMessage, sendJsonMessage, readyState, state, dispatch}}>
			{children}
		</TournamentContext.Provider>
	)
}

export const useTournamentContext = () => useContext(TournamentContext);
export default TournamentContextProvider;
