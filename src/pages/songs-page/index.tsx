import * as React from 'react';

import {
    Page,
    PageProps,
} from 'src/components/page';
import { SongLeaderboard } from 'src/lib/parser';
import { SongsList } from 'src/pages/songs-list';

export interface SongsPageProps extends PageProps {
    leaderboards: SongLeaderboard[];
    route?: string;
}

export class SongsPage extends Page<SongsPageProps> {
    protected renderContent() {
        return (
            <SongsList
                route={this.props.route}
                leaderboards={this.props.leaderboards}
            />
        );
    }
}
