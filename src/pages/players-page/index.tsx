import { Player } from 'beatsaber-leaderboard-parser';
import * as React from 'react';

import {
    Page,
    PageProps,
} from 'src/components/page';
import { PlayersList } from 'src/pages/players-list';

export interface PlayersPageProps extends PageProps {
    players: Player[];
    route?: string;
}

export class PlayersPage extends Page<PlayersPageProps> {
    protected renderContent() {
        return (
            <PlayersList
                route={this.props.route}
                players={this.props.players}
            />
        );
    }
}
