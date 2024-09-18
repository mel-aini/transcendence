import { useEffect, useState } from "react";
import Container from "../../components/Container";
import { Player, RoundData, useTournamentContext } from "../../contexts/TournamentProvider";
import Match from "./Match";
import PlayerBar from "./PlayerBar";
import { useNavigate } from "react-router-dom";
import LayoutHeader from "../../layout/LayoutHeader";

interface Match {
	player1: Player | string,
	player2?: Player | string,
}

const Index = () => {
	const { state, dispatch } = useTournamentContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (state.socketUrl === null)
			navigate("/dashboard");
	}, []);

	const handleLeave = () => {
		dispatch({type: "SOCKET_URL", socketUrl: null});
		navigate("/dashboard");
	}

	return (
		<div className="w-full">
			<LayoutHeader>Tournament Title</LayoutHeader>
			<div className="flex justify-end mb-10">
				<span onClick={handleLeave} className="font-extralight cursor-pointer hover:underline duration-300 select-none">leave</span>
			</div>
			<div className="flex flex-col gap-11 pb-6 overflow-auto scrollClassHorizontal">
				<div className="relative flex  items-center gap-5 min-w-[1062px]">
						<div className="flex items-center justify-center grow w-full">
							{
								state.roundData.map((round: RoundData, index: number) => {
									const matches: Match[] = [];
									if (round.round != 2)
									{
										let i: number = 0;
										while (i < (round.round / 2)) {
											matches.push(
											{
												player1: round.players[i],
												player2: round.players[i + 1],
											});
											i += 2;
										}
									}
									else
										matches.push({player1: round.players[0]});
									console.log(round, index);
									return (
										<div key={index} className={"flex flex-col justify-center " + ((index != state.roundData.length - 1) ? "w-full" : "w-auto")} style={(index == 0) ? {gap: "64px"} : {gap: `${64 * index}px`}}>
										{
											matches.map((match: Match, matchIndex: number) => {
												return (
													<>
													{
														(match.player2) ?
														<Match key={matchIndex} player1={match.player1} player2={match.player2} gap={(index * 32 * 4.90625)}/>
														:
														<PlayerBar key={matchIndex} player={match.player1} />
													}
													</>
												)
											})
										}
										</div>
								)})
							}
						</div>
						<span className="top-full -translate-y-1/2">
							<PlayerBar player={state.winner} isWinner={true}/>
						</span>
						<div className="flex items-center rotate-180 grow w-full">
							{
								state.roundData.map((round: RoundData, index: number) => {
									const matches: Match[] = [];
									if (round.round != 2)
									{
										let i: number = round.round / 2;
										while (i < round.round) {
											matches.push(
											{
												player1: round.players[i],
												player2: round.players[i + 1],
											});
											i += 2;
										}
									}
									else
										matches.push({player1: round.players[1]});
									return (
										<div key={index} className={"flex flex-col " + ((index != state.roundData.length - 1) ? "w-full" : "w-auto")} style={(index == 0) ? {gap: "64px"} : {gap: `${64 * index}px`}}>
										{
											matches.map((match: Match, matchIndex: number) => {
												return (
													<>
													{
														(match.player2) ?
														<Match key={matchIndex} player1={match.player1} player2={match.player2} gap={(index * 32 * 4.90625)} isRightSide={true} />
														:
														<PlayerBar key={matchIndex} player={match.player1} isRightSide={true} />
													}
													</>
												)
											})
										}
										</div>
								)})
							}
						</div>
				</div>
			</div>
		</div>
	);
}

export default Index;

// 4.90625
// 4.9375