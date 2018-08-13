import * as React from 'react';

import {
    Page,
    PageProps,
} from 'src/components/page';
import { SongLeaderboard } from 'src/lib/parser';
import { PlayersList } from 'src/pages/players-list';

export interface PlayersPageProps extends PageProps {
    leaderboards: SongLeaderboard[];
    route?: string;
}

export class PlayersPage extends Page<PlayersPageProps> {
    protected renderContent() {
        return (
            <PlayersList
                route={this.props.route}
                leaderboards={this.props.leaderboards}
            />
        );
    }
}
