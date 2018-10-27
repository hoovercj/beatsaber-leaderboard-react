import { Difficulty, Song, SongDetails, SongScore } from 'beatsaber-leaderboard-parser';
import * as React from 'react';

import { KpiData } from 'src/components/kpi';
import { SummaryCardProps } from 'src/components/summary-card/index';
import { SummaryList } from 'src/components/summary-list';
import { dateToTimeDifferenceInWords, titleArtistString } from 'src/utils/string-utils';

export interface TimelineListProps {
    songs: Song[];
    route?: string;
}

export interface TimelineItem {
    song: Song;
    score: SongScore;
    difficulty: Difficulty;
    previousBest: SongScore | null;
}

/*
Default homepage, instead of songs
Nicer date format, maybe use the Date-fns library as in songs list.
Search for cody, there is a bug where too many KPIs shows up.
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
                subvalue
            }];

            if(item.previousBest != null)
            {
                kpis.push({
                    name: item.difficulty,
                    value: `${item.previousBest.playerName}${item.previousBest.fullCombo ? ' (FC)' : ''}`,
                    subvalue: `${item.previousBest.score.toLocaleString()}`
                });
            }

            return {
                title: titleArtistString(item.song.title, item.song.artist),
                subtitle: item.song.artist || undefined,
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

        if(item.previousBest != null)
        {
            if(item.score.playerName === item.previousBest.playerName)
            {
                if(item.score.score > item.previousBest.score) {
                    return `${item.score.playerName} beat their own best score ${dateToTimeDifferenceInWords(date)}.`;
                } else {
                    return `${item.score.playerName} didn't set a good enough score to beat itself from being the leader ${dateToTimeDifferenceInWords(date)}.`;
                }
            } else {
                if(item.score.score > item.previousBest.score) {
                    return `${item.score.playerName} beat the previous best player ${item.previousBest.playerName} ${dateToTimeDifferenceInWords(date)}.`;
                } else {
                    return `${item.score.playerName} hit the leaderboard but ${item.previousBest.playerName} has a better score ${dateToTimeDifferenceInWords(date)}.`;
                }
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

                // TODO Sort them by TimeStamp, and find the previous best one.
                const sortedScores = details.scores.sort((n1, n2) => n1.timestamp - n2.timestamp);
                for (const score of sortedScores) {
                    result.push({
                        song,
                        score,
                        difficulty,
                        previousBest: this.FindPreviousBest(sortedScores, score)
                    });
                }
            }
        }

        return result.sort((n1, n2) => n2.score.timestamp - n1.score.timestamp);
    }

    private FindPreviousBest(scores: SongScore[], refScore: SongScore): SongScore | null {
        let previous: SongScore | null = null;
        for (const score of scores) {
            if (score.timestamp >= refScore.timestamp) {
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