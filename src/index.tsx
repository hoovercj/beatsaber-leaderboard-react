declare module 'prop-types';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    HashRouter,
    Redirect,
    Route,
    RouteComponentProps,
} from 'react-router-dom'

// tslint:disable-next-line
const axe = require('react-axe');

import App from 'src/App';
import { IAppInfo } from 'src/models/copyright-info';
import { LocalFileScoreProvider, RemoteFileScoreProvider } from 'src/services/score-provider';

import './index.css';

const applicationInfo: IAppInfo = {
    applicationName: process.env.REACT_APP_APPLICATION_NAME || '',
    contactEmail: process.env.REACT_APP_CONTACT_EMAIL || '',
    copyrightName: process.env.REACT_APP_COPYRIGHT_NAME || '',
    copyrightUrl: process.env.REACT_APP_COPYRIGHT_URL || '',
    githubUrl: process.env.REACT_APP_GITHUB_URL || '',
}

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const supportMultiTenant = String(process.env.REACT_APP_BACKEND_MULTITENANT).toLowerCase() === 'true';
const defaultId = process.env.REACT_APP_DEFAULT_ID;

// If we have a backend url, use it
const useRemoteFileScoreProvider = !!backendUrl;

const scoreProvider = useRemoteFileScoreProvider ?
    new RemoteFileScoreProvider(backendUrl!) :
    new LocalFileScoreProvider();

// If we support multi-tenant, then we force users to submit an id to view their leaderboard
const baseRoute = supportMultiTenant ? '/:id?' : '';

// TODO: Enable ASAP to ensure the product is accessible
if (false && process.env.NODE_ENV !== 'production') {
    axe(React, ReactDOM);
}

const renderApp = (routeProps: RouteComponentProps<any, any, any>) => {
    const matchId = routeProps.match.params.id;
    const useDefaultId = supportMultiTenant && !matchId;

    if (useDefaultId && defaultId) {
        return (<Redirect to={`/${defaultId}`} />);
    }

    return (
        <App
            applicationInfo={applicationInfo}
            scoreProvider={scoreProvider}
            rootUrl={routeProps.match.url || ''}
            leaderboardId={routeProps.match.params.id}
        />
    );
}

// TODO: Create a logger which is enabled in dev and disabled in prod
// process.env.NODE_ENV === 'development'
ReactDOM.render(
    <HashRouter>
        <Route path={baseRoute} render={renderApp} />
    </HashRouter>,
    document.getElementById('root') as HTMLElement
);
