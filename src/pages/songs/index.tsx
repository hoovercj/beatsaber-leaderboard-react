import * as React from 'react';


import { PageHeader } from 'src/components/page-header';
import { SongsList } from 'src/components/songs-list';
import { SongLeaderboard } from 'src/lib/parser';
import {
    Page,
    PageProps,
} from 'src/pages/page';

export interface SongsPageProps extends PageProps {
    leaderboards: SongLeaderboard[];
}

export class SongsPage extends Page<SongsPageProps> {

    protected renderHeader() {
        return (
            <PageHeader pageTitle={this.props.applicationInfo.applicationName} />
        );
    }

    protected renderContent() {
        return (
            <SongsList
                leaderboards={this.props.leaderboards}
            />
        );
    }
}
