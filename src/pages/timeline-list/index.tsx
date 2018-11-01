import { Difficulty, Song, SongDetails, SongScore } from 'beatsaber-leaderboard-parser';
import * as React from 'react';

import { KpiData } from 'src/components/kpi';
import { SummaryCardProps } from 'src/components/summary-card/index';
import { SummaryList } from 'src/components/summary-list';
import { dateToTimeDifferenceInWords, titleArtistString } from 'src/utils/string-utils';

export interface TimelineListProps {
    songs: Song[];
    route?: string;
    playersRoute?: string;
    songsRoute?: string;
}

export interface TimelineItem {
    song: Song;
    score: SongScore;
    difficulty: Difficulty;
    AtTheTimeBest: SongScore | null; // Doesn't include the song itself. Is Null if first on the leaderboard.
}


/*
TODO: Make the song name click-able
TODO: Make the player name click-able.
TODO: Change the layout
TODO: "A hit the leaderboard but B has a better score 8 days ago." It is not clear if it is As score or Bs that was made 8 days ago.
*/
export class TimelineList extends React.Component<TimelineListProps> {
    public render() {
        return (
            <SummaryList
                summaries={this.summaryItems}
            />
        );
    }

    private get summaryItems(): SummaryCardProps[] {
        const data: TimelineItem[] = this.ConvertToTimelineData();

        return data.map(item => {
            const value = `${item.score.playerName}${item.score.fullCombo ? ' (FC)' : ''}`;
            const timestamp = this.RelativeMessage(item);
            const subvalue = `${item.score.score.toLocaleString()}`;
            const kpis: KpiData[] = [{
                name: item.difficulty,
                value,
                // valueLink: this.props.playersRoute ? `${this.props.playersRoute}/${item.score.playerName}` : undefined,  // Blocked by PR 13
                subvalue,
                key: 'NewScore'
            }];

            if(item.AtTheTimeBest != null)
            {
                kpis.push({
                    name: item.difficulty,
                    value: `${item.AtTheTimeBest.playerName}${item.AtTheTimeBest.fullCombo ? ' (FC)' : ''}`,
                    // valueLink: this.props.playersRoute ? `${this.props.playersRoute}/${item.AtTheTimeBest.playerName}` : undefined,  // Blocked by PR 13
                    subvalue: `${item.AtTheTimeBest.score.toLocaleString()}`,
                    key: 'AtTheTimeBest'
                });
            }

            return {
                title: titleArtistString(item.song.title, item.song.artist),
                titleLink: this.props.songsRoute ? `${this.props.songsRoute}/${item.song.id}` : undefined,
                subtitle: item.song.author || undefined,
                kpiData: {
                    name: timestamp,
                    kpis,
                }
            } as SummaryCardProps;
        });
    }

    private RelativeMessage(item : TimelineItem) : string {
        const date = new Date(0);
        date.setUTCSeconds(item.score.timestamp);

        if(item.AtTheTimeBest != null)
        {
            if(item.score.playerName === item.AtTheTimeBest.playerName)
            {
                return `${item.score.playerName} beat their own best score ${dateToTimeDifferenceInWords(date)}.`;
            } else {
                return `${item.score.playerName} beat the previous best player ${item.AtTheTimeBest.playerName} ${dateToTimeDifferenceInWords(date)}.`;
            }
        }

        if(item.score.fullCombo)
        {
            return `${item.score.playerName} set the first score on the song and got a FC ${dateToTimeDifferenceInWords(date)}.`;
        }
        return `${item.score.playerName} set the first score on the song ${dateToTimeDifferenceInWords(date)}.`;
    }

    private ConvertToTimelineData(): TimelineItem[] {
        const result: TimelineItem[] = [];

        for (const song of this.props.songs)
        {
            for (const difficultyString in song.detailsByDifficulty) {
                if (!(difficultyString in Difficulty)) {
                    continue;
                }
                const difficulty: Difficulty = Difficulty[difficultyString];
                const details = song.detailsByDifficulty[difficulty] as SongDetails;

                const sortedScores = details.scores.sort((n1, n2) => n1.timestamp - n2.timestamp);
                for (const score of sortedScores) {
                    const bestScore = this.GetBestScoreBefore(sortedScores, score.timestamp);
                    if(bestScore == null || score.score > bestScore.score)
                    {
                        result.push({
                            song,
                            score,
                            difficulty,
                            AtTheTimeBest: bestScore
                        });
                    }
                }
            }
        }

        return result.sort((n1, n2) => n2.score.timestamp - n1.score.timestamp);
    }

    private GetBestScoreBefore(scores: SongScore[], timestamp: number): SongScore | null {
        let previous: SongScore | null = null;
        for (const score of scores) {
            if (score.timestamp >= timestamp) {
                return previous
            }

            if (previous === null) {
                previous = score;
            } else if (score.score > previous.score) {
                previous = score;
            }
        }

        return previous;
    }
}