import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import useWebSocket from "react-use-websocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import profilePic from "/profilePic.svg";
import { useGlobalContext } from "./store";

export interface Player {
	username: string,
	image: string,
	isConnected: boolean,
}

export interface RoundData {
	round: number,
	players: Player[] | string[],
}

interface TournementData {
	playersNum: number,
	roundData: RoundData[],
}

const initialState: TournementData = {
	playersNum: 8,
	roundData: []
};

export const TournementContext = createContext<{lastJsonMessage: any, sendJsonMessage: SendJsonMessage, state: TournementData, dispatch: Dispatch<any>}>({
	lastJsonMessage: '',
	sendJsonMessage: () => {
	},
	state: initialState,
	dispatch: () => {}
});

const reducer = (state: TournementData, action: any) => {
	switch (action.type)
	{
		case 'ROUND_DATA':
			return {
				...state,
				roundData: action.roundData
			}
		default:
			return state;
	}
}

const TournementContextProvider = ({children} : {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { state: profileData } = useGlobalContext();
	const username: string | undefined = profileData.userData?.username;
	const { lastJsonMessage, sendJsonMessage } = useWebSocket(TOURNEMENT_WS_URL + username,
		{
			share: false,
			shouldReconnect: () => false,
		},
	);
	const player: Player = {
		username: "ychahbi",
		image: profilePic,
		isConnected: true,
	};

	const isEmptyObject = (obj: any) => {
		if (obj === null)
			return (true);
		return JSON.stringify(obj) === '{}';
	};

	useEffect(() => {
		let roundsNum = 0;
		let i: number = state.playersNum / 2;
		while (i >= 1) {
			roundsNum++;
			i = i / 2;
		}
		const roundData: RoundData[] = [];
		i = 0;
		let j = state.playersNum;
		while (i < roundsNum)
		{
			const tmp: RoundData = {
				round: j,
				players: []
			};
			const play: Player[] | string[] = [];
			let k = j;
			while (k > 0)
			{
				if (j == 8)
					play.push(player);
				else
					play.push('player');
				k--;
			};
			tmp.players = play;
			roundData.push(tmp);
			j = j / 2;
			i++;
		}
		console.log(roundData);
		
		dispatch({type: "ROUND_DATA", roundData: roundData});
	}, []);

	// useEffect(() => {
	// 	// console.log(lastJsonMessage);

	// 	if (!isEmptyObject(lastJsonMessage))
	// 	{
	// 	}
		
	// }, [lastJsonMessage]);
	
	return (
		<TournementContext.Provider value={{lastJsonMessage, sendJsonMessage, state, dispatch}}>
			{children}
		</TournementContext.Provider>
	)
}

const TOURNEMENT_WS_URL = "ws://127.0.0.1:8000/ws/game_tournament/";
export const useTournementContext = () => useContext(TournementContext);
export default TournementContextProvider;