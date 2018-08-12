import { Link } from 'office-ui-fabric-react';
import * as React from 'react';

import { IAppInfo } from 'src/models/copyright-info'

import './index.css';

export interface IPageFooterProps {
    applicationInfo: IAppInfo;
}

export interface IPageFooterState {
    showPrivacyPolicy: boolean;
}

export class PageFooter extends React.Component<IPageFooterProps, IPageFooterState> {
    constructor(props: IPageFooterProps) {
        super(props);
        this.state = {
            showPrivacyPolicy: false,
        };
    }

    public render() {

        const {
            applicationName,
            contactEmail,
            copyrightName,
            copyrightUrl,
            githubUrl
        } = this.props.applicationInfo;
        return (
            <div className={'page-footer_container'}>
                <div className={'page-footer_column page-footer_column_center'}>
                    <Link className={'page-footer_link'} href={`mailto:${contactEmail}?subject=About ${applicationName}`}>Contact</Link>
                    <span className={'page-footer_separator'}>|</span>
                    <Link className={'page-footer_link'} href={githubUrl}>Github</Link>
                    <span className={'page-footer_separator'}>|</span>
                    <p>{'©\u00a02018 '}<Link href={copyrightUrl}>{copyrightName.replace(' ', '\u00a0')}</Link></p>
                </div>
            </div>
        )
    }
}