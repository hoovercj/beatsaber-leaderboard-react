import { BeatSaber, IBeatSaber } from 'beatsaber-leaderboard-parser';
import {
    getTheme,
    ITheme,
    loadTheme,
} from 'office-ui-fabric-react';
// This is necessary for icons to appear in dialogs
// TODO: Is it possible to only initialize some icons?
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import * as React from 'react';
import {
    Redirect,
    Route,
    RouteComponentProps,
    Switch,
} from 'react-router-dom';

import 'src/styles/colors.css';
import 'src/styles/fonts.css';

import { IAppInfo } from 'src/models/copyright-info';
import { PlayersPage } from 'src/pages/players-page';
import { SongDetailsPage } from 'src/pages/song-details-page';
import { SongsPage } from 'src/pages/songs-page';
import { BeatSaberFileProvider } from 'src/services/score-provider';
import { PlayerDetailsPage } from './pages/player-details-page/index';
import { TimelinePage } from './pages/timeline-page/index';

interface AppProps {
    applicationInfo: IAppInfo;
    scoreProvider: BeatSaberFileProvider;
    rootUrl: string;
    leaderboardId?: string;
}

interface AppState {
    beatSaber?: IBeatSaber;
}

class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);

        this.state = {} as AppState;
    }

    public componentDidMount(): void {
        loadTheme(this.getCustomTheme());
        initializeIcons();

        this.initializeBeatSaber();
    }

    public componentDidUpdate(prevProps: AppProps): void {
        if (prevProps.leaderboardId !== this.props.leaderboardId) {
            this.setState({ beatSaber: undefined });
            this.initializeBeatSaber();
        }
    }

    public render() {
        if (!this.state.beatSaber) {
            return (<h1>Loading...</h1>);
        }
        return (
            <Switch>
                <Route key={'songDetailsRoute'} exact={true} path={`${this.songsListRoute}/:id`} render={this.renderSongDetailsPage } />
                <Route key={'playerDetailsRoute'} exact={true} path={`${this.playersListRoute}/:id`} render={this.renderPlayerDetailsPage} />
                <Route key={'songsListRoute'} exact={true} path={this.songsListRoute} render={this.renderSongsPage} />
                <Route key={'playersListRoute'} exact={true} path={this.playersListRoute} render={this.renderPlayersPage} />
                <Route key={'timelineRoute'} exact={true} path={this.timelineListRoute} render={this.renderTimelinePage} />
                <Route key={'rootRoute'} render={this.renderRoot} />
            </Switch>
        );
    }

    private get playersListRoute() {
        return `${this.props.rootUrl || ''}/players`;
    }

    private get songsListRoute() {
        return `${this.props.rootUrl || ''}/songs`;
    }

    private get timelineListRoute() {
        return `${this.props.rootUrl || ''}/timeline`;
    }

    private initializeBeatSaber = async () => {
        this.setState({
            beatSaber: BeatSaber.FromFile(await this.props.scoreProvider.scores(this.props.leaderboardId))
        });
    }

    private renderSongsPage = (routeProps: RouteComponentProps<any, any, any>) => {
        return this.state.beatSaber && (
            <SongsPage
                key='songs'
                rootUrl={this.props.rootUrl}
                route={routeProps.match.path}
                applicationInfo={this.props.applicationInfo}
                songs={this.state.beatSaber.songsByNumberOfPlayers()}
            />
        )
    }

    private renderPlayersPage = (routeProps: RouteComponentProps<any, any, any>) => {
        return this.state.beatSaber && (
            <PlayersPage
                key='users'
                rootUrl={this.props.rootUrl}
                route={routeProps.match.path}
                applicationInfo={this.props.applicationInfo}
                players={this.state.beatSaber.playersByFirstPlaces()}
            />
        )
    }

    private renderTimelinePage = (routeProps: RouteComponentProps<any, any, any>) => {
        return this.state.beatSaber && (
            <TimelinePage
                key='timeline'
                rootUrl={this.props.rootUrl}
                route={routeProps.match.path}
                applicationInfo={this.props.applicationInfo}
                songs={this.state.beatSaber.songs()}
            />
        )
    }

    private renderRoot = () => {
        return <Redirect to={`${this.props.rootUrl}/timeline`}/>;
    }

    private renderSongDetailsPage = (routeProps: RouteComponentProps<any, any, any>) => {
        if (!this.state.beatSaber) {
            return null;
        }

        const songInformation = this.state.beatSaber.song(routeProps.match.params.id);

        return songInformation ?
            (
                <SongDetailsPage
                    key='songDetailsPage'
                    rootUrl={this.props.rootUrl}
                    applicationInfo={this.props.applicationInfo}
                    song={songInformation}
                />
            ) :
            <Redirect to={this.songsListRoute}/>
    }

    private renderPlayerDetailsPage = (routeProps: RouteComponentProps<any, any, any>) => {
        if (!this.state.beatSaber) {
            return null;
        }

        const playerName = routeProps.match.params.id as string;

        const playerInformation = this.state.beatSaber.player(playerName && playerName.toUpperCase());

        return playerInformation ?
            (
                <PlayerDetailsPage
                    beatSaber={this.state.beatSaber}
                    key='playerDetailsPage'
                    rootUrl={this.props.rootUrl}
                    applicationInfo={this.props.applicationInfo}
                    player={playerInformation}
                    songsRoute={this.songsListRoute}
                />
            ) :
            <Redirect to={this.playersListRoute}/>
    }

    private getCustomTheme = (): ITheme => {
        const currentTheme = getTheme();
        return {
            disableGlobalClassNames: currentTheme.disableGlobalClassNames,
            fonts: currentTheme.fonts,
            isInverted: currentTheme.isInverted,
            palette: {
                ...currentTheme.palette,
                neutralPrimary: '#2d2d32',
                neutralPrimaryAlt: '#606065',
            },
            semanticColors: currentTheme.semanticColors,
        };
    }
}

export default App;
