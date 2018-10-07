import { Song } from 'beatsaber-leaderboard-parser';
import * as React from 'react';

import {
    Page,
    PageProps,
} from 'src/components/page';
import { SongsList } from 'src/pages/songs-list';

export interface SongsPageProps extends PageProps {
    songs: Song[];
    route?: string;
    playersRoute?: string;
}

export class SongsPage extends Page<SongsPageProps> {
    protected renderContent() {
        return (
            <SongsList
                route={this.props.route}
                songs={this.props.songs}
                playersRoute={this.props.playersRoute}
            />
        );
    }
}
