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

import { BeatSaber } from 'src/lib/beatsaber';
import { IBeatSaber } from 'src/lib/models';
import { IAppInfo } from 'src/models/copyright-info';
import { PlayersPage } from 'src/pages/players-page';
import { SongDetailsPage } from 'src/pages/song-details-page';
import { SongsPage } from 'src/pages/songs-page';
import { BeatSaberFileProvider } from 'src/services/score-provider';

interface AppProps {
    applicationInfo: IAppInfo;
    scoreProvider: BeatSaberFileProvider;
}

interface AppState {
    beatSaber: IBeatSaber;
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

    public render() {
        if (!this.state.beatSaber) {
            return (<h1>Loading...</h1>);
        }
        return (
            <Switch>
                <Route path='/songs/:id' render={this.renderSongDetailsPage } />
                <Route path='/songs' render={this.renderSongsPage} />
                <Route path='/players' render={this.renderPlayersPage} />
                <Route path='/' render={this.renderRoot} />
            </Switch>
        );
    }

    private initializeBeatSaber = async () => {
        this.setState({
            beatSaber:BeatSaber.FromFile(await this.props.scoreProvider.scores())
        });
    }

    private renderSongsPage = (routeProps: RouteComponentProps<any, any, any>) => {
        return (
            <SongsPage
                key='songs'
                route={routeProps.match.path}
                applicationInfo={this.props.applicationInfo}
                songs={this.state.beatSaber.songsByNumberOfPlayers()}
            />
        )
    }

    private renderPlayersPage = (routeProps: RouteComponentProps<any, any, any>) => {
        return (
            <PlayersPage
                key='users'
                route={routeProps.match.path}
                applicationInfo={this.props.applicationInfo}
                players={this.state.beatSaber.playersByFirstPlaces()}
            />
        )
    }

    private renderRoot = () => {
        return <Redirect to='/songs'/>;
    }

    private renderSongDetailsPage = (routeProps: RouteComponentProps<any, any, any>) => {
        const songInformation = this.state.beatSaber.song(routeProps.match.params.id);

        return songInformation ?
            (
                <SongDetailsPage
                    key='songs'
                    applicationInfo={this.props.applicationInfo}
                    song={songInformation}
                />
            ) :
            <Redirect to='/songs'/>
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
                themeDark: '#e34402',
                themeDarkAlt: '#c93d02',
                themeDarker: '#a63201',
                themePrimary: '#fc4c02',
            },
            semanticColors: currentTheme.semanticColors,
        };
    }
}

export default App;
