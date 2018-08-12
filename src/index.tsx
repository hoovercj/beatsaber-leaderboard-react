declare module 'prop-types';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'

// tslint:disable-next-line
const axe = require('react-axe');

import App from 'src/App';
import { IAppInfo } from 'src/models/copyright-info';
import { LocalFileScoreProvider } from 'src/services/score-provider';

import './index.css';

const applicationInfo: IAppInfo = {
    applicationName: process.env.REACT_APP_APPLICATION_NAME || '',
    contactEmail: process.env.REACT_APP_CONTACT_EMAIL || '',
    copyrightName: process.env.REACT_APP_COPYRIGHT_NAME || '',
    copyrightUrl: process.env.REACT_APP_COPYRIGHT_URL || '',
    githubUrl: process.env.REACT_APP_GITHUB_URL || '',
}

// TODO: Enable ASAP to ensure the product is accessible
if (false && process.env.NODE_ENV !== 'production') {
    axe(React, ReactDOM);
}

// TODO: Create a logger which is enabled in dev and disabled in prod
// process.env.NODE_ENV === 'development'
ReactDOM.render(
    <HashRouter>
        <App
            applicationInfo={applicationInfo}
            scoreProvider={new LocalFileScoreProvider()}
        />
    </HashRouter>,
    document.getElementById('root') as HTMLElement
);
