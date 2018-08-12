import * as React from 'react';

import { KpiData } from 'src/components/kpi';
import { SummaryCardProps } from 'src/components/summary-card/index';
import { SummaryList } from 'src/components/summary-list';
import { SongLeaderboard } from 'src/lib/parser';
import { titleArtistString } from 'src/utils/string-utils';

export interface SongsListProps {
    leaderboards: SongLeaderboard[];
    route?: string;
}

export class SongsList extends React.Component<SongsListProps> {
    public render() {
        return (
            <SummaryList
                summaries={this.summaryItems}
            />

        );
    }

    private get summaryItems(): SummaryCardProps[] {
        return this.props.leaderboards.map(leaderboard => {
            const { id, title, artist, author, difficultyLeaderboards } = leaderboard;

            const titleArtist = titleArtistString(title, artist);

            const kpis: KpiData[] = Object.keys(difficultyLeaderboards)
                .map(key => difficultyLeaderboards[key])
                .map(difficultyLeaderboard => {

                    const sortedScores = difficultyLeaderboard.scores.slice(0).sort((a,b) => b.score - a.score);
                    const topPlayer = sortedScores[0].playerName;
                    // TODO: Add "subtext" to KPIs to use this
                    // const numPlayers = this.countUniquePlayers(sortedScores);

                    const value = `${topPlayer}`;

                    return {
                        name: difficultyLeaderboard.difficulty,
                        value
                    } as KpiData;
                });

            return {
                title: titleArtist,
                titleLink: this.props.route ?
                    `${this.props.route}/${id}` :
                    `/${id}`,
                subtitle: author || undefined,
                kpis,
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