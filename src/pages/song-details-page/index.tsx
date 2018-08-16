import {
    ConstrainMode,
    DetailsList,
    // DetailsListLayoutMode,
    SelectionMode,
} from 'office-ui-fabric-react';
import * as React from 'react';

import { Card } from 'src/components/card';
import { Page, PageProps } from 'src/components/page';
import {
    Song, SongDetails, SongScore,
} from 'src/lib/models';
import { dateToTimeDifferenceInWords, titleArtistString } from 'src/utils/string-utils';

export interface SongDetailsPageProps extends PageProps {
    song: Song,
}

interface ScoreRow {
    Rank: string;
    Name: string;
    Score: string;
    Time: string;
}

export class SongDetailsPage extends Page<SongDetailsPageProps> {

    protected renderContent() {
        return (
            <React.Fragment>
                {this.renderContentHeader()}
                {this.renderContentTables()}
            </React.Fragment>
        );
    }

    private renderContentHeader = (): JSX.Element => {
        const { title, artist, author } = this.props.song;
        return (
            <Card>
                <div>{titleArtistString(title, artist)}</div>
                { author && <div><small>{author}</small></div> }
            </Card>
        );
    }

    private renderContentTables = (): JSX.Element => {
        const { detailsByDifficulty } = this.props.song;
        const lists = Object.keys(detailsByDifficulty)
            .map(key => detailsByDifficulty[key])
            .reverse()
            .map((difficultyLeaderboard: SongDetails) => {
                const { difficulty, scores } = difficultyLeaderboard;
                const sortedScores = scores.slice(0).sort((a,b) => b.score - a.score);
                const scoreRows = sortedScores.map(this.scoreToScoreRow);
                return this.renderDetailsList(difficulty, scoreRows);
            })
        return (
            <React.Fragment>
                {lists}
            </React.Fragment>
        );
    }

    private scoreToScoreRow = (score: SongScore, rank: number): ScoreRow => {
        return {
            Rank: String(rank + 1),
            Name: score.playerName,
            Score: `${score.score}${score.fullCombo ? ' (FC)' : ''}`,
            Time: dateToTimeDifferenceInWords(new Date(score.timestamp * 1000)),
        }
    }

    private renderDetailsList = (title: string, items: any[]): JSX.Element => {
        return (
            <Card key={title}>
                <div>{title}</div>
                <DetailsList
                    items={items}
                    constrainMode={ConstrainMode.unconstrained}
                    selectionMode={SelectionMode.none}
                    // TODO: replace this dirty, dirty hack to avoid horizontal scrollbars
                    // Problem: Something is going wrong when the list first loads and it
                    // is incorrectly rendering horizontal scrollbars. Forcing the update
                    // forces it to re-measure and set widths that fit, eliminating the scrollbars.
                    // Setting `constrainMode` can make the problem appear fixed, but there
                    // is still subtle overflow at the edge of the card. This hack is
                    // still necessary to avoid that.
                    ref={(ref) => requestAnimationFrame(() => ref && ref.forceUpdate())}
                />
            </Card>
        )
    }
}