import {
    DetailsList,
    DetailsListLayoutMode,
    SelectionMode,
} from 'office-ui-fabric-react';
import * as React from 'react';

import { Page, PageProps } from 'src/components/page';
import {
    Score,
    SongLeaderboard,
} from 'src/lib/parser';
import { titleArtistString } from 'src/utils/string-utils';

export interface SongDetailsPageProps extends PageProps {
    songInformation: SongLeaderboard,
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
        const { title, artist, author } = this.props.songInformation;
        return (
            <React.Fragment>
                <div>{titleArtistString(title, artist)}</div>
                { author && <div><sub>{author}</sub></div> }
            </React.Fragment>
        );
    }

    private renderContentTables = (): JSX.Element => {
        const { difficultyLeaderboards } = this.props.songInformation;
        const lists = Object.keys(difficultyLeaderboards)
            .map(key => difficultyLeaderboards[key])
            .map(difficultyLeaderboard => {
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

    private scoreToScoreRow = (score: Score, rank: number): ScoreRow => {
        return {
            Rank: String(rank + 1),
            Name: score.playerName,
            Score: `${score.score}${score.fullCombo ? ' (FC)' : ''}`,
            Time: String(score.timestamp), // TODO: prettify this
        }
    }

    private renderDetailsList = (title: string, items: any[]): JSX.Element => {
        return (
            <React.Fragment>
                <div>{title}</div>
                <DetailsList
                    key={title}
                    items={items}
                    selectionMode={SelectionMode.none}
                    layoutMode={DetailsListLayoutMode.justified}
                    // columns={[{
                    //     key: 'Rank',
                    //     name: 'Rank',
                    //     fieldName: 'rank',
                    //     minWidth: 50,
                    // },{
                    //     key: 'Name',
                    //     name: 'Name',
                    //     fieldName: 'name',
                    //     minWidth: 200,
                    // },{
                    //     key: 'Score',
                    //     name: 'Score',
                    //     fieldName: 'score',
                    //     minWidth: 50,
                    // },{
                    //     key: 'Time',
                    //     name: 'Time',
                    //     fieldName: 'time',
                    //     minWidth: 100,
                    // }]}
                />
            </React.Fragment>
        )
    }
}