import * as React from 'react';

import { KpiData } from 'src/components/kpi';
import { SummaryCardProps } from 'src/components/summary-card/index';
import { SummaryList } from 'src/components/summary-list';
import { Song, SongDetails } from 'src/lib/models';
import { titleArtistString } from 'src/utils/string-utils';

export interface SongsListProps {
    songs: Song[];
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
        return this.props.songs.map(song => {
            const { id, title, artist, author, detailsByDifficulty } = song;

            const titleArtist = titleArtistString(title, artist);

            const kpis: KpiData[] = Object.keys(detailsByDifficulty)
                .map(difficulty => detailsByDifficulty[difficulty])
                .filter((songDetails: SongDetails ) => songDetails.summary.topPlayer)
                .map((songDetails: SongDetails ) => {
                    const { topPlayer, topPlayerFullCombo } = songDetails.summary;
                    const subvalue = `1st of ${songDetails.summary.players.length}`;

                    const value = `${topPlayer}${topPlayerFullCombo ? ' (FC)' : ''}`;

                    return {
                        name: songDetails.difficulty,
                        value,
                        subvalue,
                    } as KpiData;
                });

            return {
                title: titleArtist,
                titleLink: this.props.route ?
                    `${this.props.route}/${id}` :
                    `/${id}`,
                subtitle: author || undefined,
                kpiData: {
                    name: `Top Player by Difficulty`,
                    kpis,
                },
            } as SummaryCardProps;
       });
    }
}