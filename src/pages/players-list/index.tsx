import * as React from 'react';

import { KpiData } from 'src/components/kpi';
import { SummaryCardProps } from 'src/components/summary-card/index';
import { SummaryList } from 'src/components/summary-list';
import { Difficulty, SongLeaderboard } from 'src/lib/parser';

export interface PlayersListProps {
    leaderboards: SongLeaderboard[];
    route?: string;
}

interface PlayerSummaries {
    [key: string]: {
        [key: string]: number;
    }
}

export class PlayersList extends React.Component<PlayersListProps> {
    public render() {
        return (
            <SummaryList
                summaries={this.summaryItems}
            />

        );
    }

    private get summaryItems(): SummaryCardProps[] {
        const playerSummaries: PlayerSummaries = this.props.leaderboards.reduce((summaries: PlayerSummaries, songLeaderboard: SongLeaderboard) => {
            Object.keys(songLeaderboard.difficultyLeaderboards).forEach(leaderboard => {
                const difficultyLeaderboard = songLeaderboard.difficultyLeaderboards[leaderboard];

                const difficulty = difficultyLeaderboard.difficulty;
                const sortedScores = difficultyLeaderboard.scores.slice(0).sort((a,b) => b.score - a.score);
                const topPlayer = sortedScores[0].playerName;

                if (!summaries[topPlayer]) {
                    summaries[topPlayer] = {
                        [Difficulty.Easy]: 0,
                        [Difficulty.Normal]: 0,
                        [Difficulty.Hard]: 0,
                        [Difficulty.Expert]: 0,
                        [Difficulty.ExpertPlus]: 0,
                    };
                }

                summaries[topPlayer][difficulty]++;
            });

            return summaries;
            // TODO: what to return?
        }, {});

        return Object.keys(playerSummaries)
            .map(playerName => {
                const difficulties = playerSummaries[playerName];
                return {
                    title: playerName,
                    kpis: Object.keys(difficulties).map(difficulty => {
                        return {
                            name: difficulty,
                            value: String(difficulties[difficulty]),
                    } as KpiData })
                } as SummaryCardProps;
            });
    }

    // private countUniquePlayers = (scores: Score[]): number => {
    //     // Generate an object with a key for each player
    //     // and return the number of keys
    //     return Object.keys(
    //         scores.reduce((players, score) => {
    //             players[score.playerName] = null;
    //             return players;
    //         }, {})
    //     ).length;
    // }
}