import { Player, PlayerDetails } from 'beatsaber-leaderboard-parser';
import * as React from 'react';

import { SummaryCardProps } from 'src/components/summary-card/index';
import { SummaryList } from 'src/components/summary-list';

export interface PlayersListProps {
    players: Player[];
    route?: string;
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
        return this.props.players.map(player => {
            const { name, fullCombos, detailsByDifficulty } = player;
            return {
                title: name,
                subtitle: fullCombos.length > 0 ? `${fullCombos.length} Full Combos` : '',
                kpiData: {
                    name: `First Place Scores / Songs Played`,
                    kpis: Object.keys(detailsByDifficulty)
                        .map(difficulty => detailsByDifficulty[difficulty])
                        .filter((details: PlayerDetails) => details.songsPlayed.length > 0)
                        .map((details: PlayerDetails) => {
                            return {
                                name: details.difficulty,
                                inlineValue: true,
                                value: `${details.firstPlaces.length}`,
                                subvalue: `/ ${details.songsPlayed.length}`
                            }
                        })
                    }
            } as SummaryCardProps
        });
    }
}