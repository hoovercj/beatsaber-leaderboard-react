import {
    getTheme,
    ITheme,
    loadTheme,
} from 'office-ui-fabric-react';
// This is necessary for icons to appear in dialogs
// TODO: Is it possible to only initialize some icons?
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import * as React from 'react';


import 'src/styles/colors.css';
import 'src/styles/fonts.css';

import { IAppInfo } from 'src/models/copyright-info';
import { SongsPage } from 'src/pages/songs';
import { ScoreProvider } from 'src/services/score-provider';

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
        const mainContent = this.renderSongsPage();
            return (
                <React.Fragment>
                    {mainContent}
                </React.Fragment>
            );
    }

    private renderSongsPage = () => {
        const _leaderboards = this.props.scoreProvider.scores().leaderboards;
        const leaderboards = Object.keys(_leaderboards).map(key => _leaderboards[key]);

        return (
            <SongsPage
                key='songs'
                applicationInfo={this.props.applicationInfo}
                leaderboards={leaderboards}
            />
        )
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
