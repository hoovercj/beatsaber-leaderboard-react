import {
    IBeatSaber,
    Player,
    PlayerScore,
} from 'beatsaber-leaderboard-parser';
import * as React from 'react';

import { Card } from 'src/components/card';
import { Page, PageProps } from 'src/components/page';
import { SummaryCardProps } from 'src/components/summary-card/index';
import { SummaryList } from 'src/components/summary-list/index';
import {
    scoreString,
    titleArtistString,
} from 'src/utils/string-utils';

export interface PlayerDetailsPageProps extends PageProps {
    beatSaber: IBeatSaber,
    player: Player,
    songsRoute: string,
}

export class PlayerDetailsPage extends Page<PlayerDetailsPageProps> {

    protected renderContent() {
        return (
            this.renderList()
        );
    }

    private renderList = (): JSX.Element => {
        return (
            <SummaryList
                renderHeader={this.renderHeaderCard}
                summaries={this.summaryItems}
            />
        );
    }

    private renderHeaderCard = (): JSX.Element => {
        const { name, fullCombos } = this.props.player;
        return (
            <Card>
                <div>{name}</div>
                { fullCombos && <div><small>{fullCombos.length} Full Combos</small></div> }
            </Card>
        )
    }

    private get summaryItems(): SummaryCardProps[] {
        const { topScores } = this.props.player;
        return Object.keys(topScores)
            .map(key => topScores[key])
            .map((playerScore: PlayerScore) => {
                const { title, artist, author, id } = this.props.beatSaber.song(playerScore.songId);

                const { difficulty, fullCombo, score, rank, rankOf } = playerScore;

                return {
                    title: titleArtistString(title, artist),
                    titleLink: this.props.songsRoute ?
                       `${this.props.songsRoute}/${id}` :
                        undefined,
                    subtitle: author,
                    kpiData: {
                        kpis: [
                            {
                                name: 'Difficulty',
                                value: difficulty,
                            },
                            {
                                name: 'Rank',
                                value: rank,
                                subvalue: `/ ${rankOf}`,
                                inlineValue: true,
                            },
                            {
                                name: 'Score',
                                value: scoreString(score, fullCombo),
                            },
                        ]
                    }
                } as SummaryCardProps
            });
    }
}