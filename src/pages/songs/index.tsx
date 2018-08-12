import * as React from 'react';


import { PageHeader } from 'src/components/page-header';
// import { SongsList } from 'src/components/songs-list';
import { IPageProps, Page } from 'src/pages/page';


export class SongsPage extends Page<IPageProps> {

    protected renderHeader() {
        return (
            <PageHeader pageTitle={this.props.applicationInfo.applicationName} />
        );
    }

    protected renderContent() {
        return (
            <div>Hello</div>
            // <SongsList
            //     leaderboard={null}
            // />
        );
    }
}
