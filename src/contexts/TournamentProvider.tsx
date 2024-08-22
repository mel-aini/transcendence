import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import useWebSocket from "react-use-websocket";
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
	playersNum: number,
	roundData: RoundData[],
	winner: Player | string
	pongMessage: any
}

const initialState: TournamentData = {
	playersNum: 4,
	roundData: [],
	// winner: {
	// 	username: "winner",
	// 	image: "",
	// 	isConnected: true
	// },
	winner: "player",
	pongMessage: {}
};

export const TournamentContext = createContext<{lastJsonMessage: any, sendJsonMessage: SendJsonMessage, state: TournamentData, dispatch: Dispatch<any>}>({
	lastJsonMessage: '',
	sendJsonMessage: () => {
	},
	state: initialState,
	dispatch: () => {}
});

const reducer = (state: TournamentData, action: any) => {
	switch (action.type)
	{
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
		case 'PONG_MESSAGE':
			return {
				...state,
				pongMessage: action.pongMessage
			}
		default:
			return state;
	}
}

const TournamentContextProvider = ({children} : {children: ReactNode}) => {
	// const {state: gameState, dispatch: gameDispatch} = usePingPongContext();
	const navigate = useNavigate();
	const [state, dispatch] = useReducer(reducer, initialState);
	const { state: profileData } = useGlobalContext();
	const username: string | undefined = profileData.userData?.username; // state.joinTournament.alias
	const { lastJsonMessage, sendJsonMessage } = useWebSocket(Tournament_WS_URL + state.playersNum + "/" + username,
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
			const play: any = [];
			let k = j;
			while (k > 0)
			{
				play.push('player');
				k--;
			};
			tmp.players = play;
			roundData.push(tmp);
			j = j / 2;
			i++;
		}
		// roundData.push({
		// 	round: j,
		// 	players: ['player']
		// });
		// console.log(roundData);

		dispatch({type: "ROUND_DATA", roundData: roundData});
		// console.log(Tournament_WS_URL + state.playersNum + "/" + username);

	}, []);

	useEffect(() => {

		if (!isEmptyObject(lastJsonMessage))
		{
			if (lastJsonMessage.type != "ball")
				console.log(lastJsonMessage);
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
				// console.log(roundData);
				dispatch({type: "ROUND_DATA", roundData: roundData});
			}
			else
			{
				dispatch({type: "PONG_MESSAGE", pongMessage: lastJsonMessage});
				if (lastJsonMessage.type == 'opponents')
					navigate('match-making');
			}
		}
		
	}, [lastJsonMessage]);

	return (
		<TournamentContext.Provider value={{lastJsonMessage, sendJsonMessage, state, dispatch}}>
			{children}
		</TournamentContext.Provider>
	)
}

const Tournament_WS_URL = "ws://127.0.0.1:8000/ws/game_tournament/";
export const useTournamentContext = () => useContext(TournamentContext);
export default TournamentContextProvider;

// send

// {'type':'start'}

// recieve

// {'type':'end', 'status':'im the winner'}

// {'type':'opponents', 'user1':'name', 'user2':'name'} // go to game and send "start"

// {
// 	'type': 'dashboard', 
// 	'rounds':
// 		[
// 			{
// 				'username1': 'ggggg', 'username2': 'fdfdfd', 'username3': 'fs','username4': 'qqqqqq'
// 			},
// 			{
// 				'username4': 'qqqqqq', 'username1': 'ggggg'
// 			}
// 		] 
// }

// {'type':'waiting' }

// xjacobs0
// michael540
// lclark0
// christina300
// andrea440
// lowens0
// csmith0
// samuel980