import { List } from 'office-ui-fabric-react';
import * as React from 'react';

import './index.css';

import {
    Score,
    SongsListItem,
} from 'src/components/songs-list/item';
import { SongLeaderboard } from 'src/lib/parser';

export interface SongsListProps {
    leaderboards: SongLeaderboard[];
}

export class SongsList extends React.Component<SongsListProps> {
    public render() {
        return (
            <List
                items={this.props.leaderboards}
                className={'songs-list_detailsListContainer'}
                onRenderCell={this.renderItem}
            />

        );
    }

    private renderItem = (item: SongLeaderboard) => {
        const { id, title, artist, author, difficultyLeaderboards } = item;

        const scoreItems: Score[] = Object.keys(difficultyLeaderboards)
            .map(key => difficultyLeaderboards[key])
            .map(lb => {
                const { difficulty, scores } = lb;
                return {
                    difficulty,
                    // Copy the list and Reverse sort on score
                    topPlayer: scores.slice(0).sort((a,b) => b.score - a.score)[0].playerName,
                } as Score;
            });

        return (
            <SongsListItem
                key={id}
                title={`${title} by ${artist}`}
                author={author}
                scores={scoreItems}
            />
        );
    }
}