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
import { SongsPage } from 'src/pages/songs-page';
import { ScoreProvider } from 'src/services/score-provider';
import { SongDetailsPage } from './pages/song-details-page/index';

interface IAppProps {
    applicationInfo: IAppInfo;
    scoreProvider: ScoreProvider;
}

class App extends React.Component<IAppProps> {

    constructor(props: IAppProps) {
        super(props);
    }

    public componentDidMount(): void {
        loadTheme(this.getCustomTheme());
        initializeIcons();
    }

    public render() {
        return (
            <Switch>
                <Route path='/songs/:id' render={this.renderSongDetailsPage } />
                <Route path='/songs' render={this.renderSongsPage} />
                <Route path='/' render={this.renderRoot} />
            </Switch>
        );
    }

    private renderSongsPage = (routeProps: RouteComponentProps<any, any, any>) => {
        const _leaderboards = this.props.scoreProvider.scores().leaderboards;
        const leaderboards = Object.keys(_leaderboards).map(key => _leaderboards[key]);

        return (
            <SongsPage
                key='songs'
                route={routeProps.match.path}
                applicationInfo={this.props.applicationInfo}
                leaderboards={leaderboards}
            />
        )
    }

    private renderRoot = () => {
        return <Redirect to='/songs'/>;
    }

    private renderSongDetailsPage = (routeProps: RouteComponentProps<any, any, any>) => {
        const _leaderboards = this.props.scoreProvider.scores().leaderboards;
        const songInformation = _leaderboards[routeProps.match.params.id];

        return songInformation ?
            (
                <SongDetailsPage
                    key='songs'
                    applicationInfo={this.props.applicationInfo}
                    songInformation={songInformation}
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
