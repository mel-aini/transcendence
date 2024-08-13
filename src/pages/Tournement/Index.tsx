import { useEffect, useState } from "react";
import Container from "../../components/Container";
import { Player, RoundData, useTournementContext } from "../../contexts/TournementProvider";
import Match from "./Match";
import PlayerBar from "./PlayerBar";

interface Match {
	player1: Player | string,
	player2?: Player | string,
}

const Index = () => {
	const { state, dispatch } = useTournementContext();

	useEffect(() => {
	}, []);

	return (
		<div className="flex flex-col gap-11 pb-6">
			<Container className="h-[109px] w-full" childClassName="flex justify-between items-center p-5">
				<h1 className="text-4xl md:text-5xl font-semibold">Tournement Title</h1>
			</Container>
			<span className="place-self-end">created by: mel-aini</span>
			{/* <div className="relative flex justify-center items-center sm:gap-5 gap-3 w-full md:flex-row flex-col"> */}
			<div className="relative flex justify-center items-center gap-5 min-w-[1062px]">
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
								// console.log(matches);
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
								// console.log(matches);
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
				<span className="absolute top-full -translate-y-1/2">
					<PlayerBar player={state.winner} />
				</span>
			</div>
		</div>
	);
}

export default Index;

// 4.90625
// 4.9375