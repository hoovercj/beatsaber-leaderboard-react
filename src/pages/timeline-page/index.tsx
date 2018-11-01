import { Song } from 'beatsaber-leaderboard-parser';
import * as React from 'react';

import {
    Page,
    PageProps,
} from 'src/components/page';
import { TimelineList } from 'src/pages/timeline-list';

export interface TimelinePageProps extends PageProps {
    songs: Song[];
    route?: string;
    playersRoute?: string;
    songsRoute?: string;
}

export class TimelinePage extends Page<TimelinePageProps> {
    protected renderContent() {
        return (
            <TimelineList
                route={this.props.route}
                songs={this.props.songs}
                playersRoute={this.props.playersRoute}
                songsRoute={this.props.songsRoute}
            />
        );
    }
}
