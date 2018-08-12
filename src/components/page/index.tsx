// TODO: Move to components

import * as React from 'react';

import 'src/styles/colors.css';
import 'src/styles/fonts.css';
import './index.css';

import { PageFooter } from 'src/components/page-footer';
import { PageHeader } from 'src/components/page-header';
import { IAppInfo } from 'src/models/copyright-info';

export interface PageProps {
    applicationInfo: IAppInfo;
}

export abstract class Page<T extends PageProps = PageProps, S = {}> extends React.Component<T, S> {
    public render() {
        return (
            <div className={this.containerClass()}>
                {this._renderHeader()}
                {this._renderContent()}
                {this._renderFooter()}
            </div>
        );
    }

    protected renderHeader() {
        return (
            <PageHeader pageTitle={this.props.applicationInfo.applicationName} />
        );
    }

    protected abstract renderContent(): JSX.Element | JSX.Element[];

    protected renderFooter(): JSX.Element | JSX.Element[] {
        return (
            <PageFooter applicationInfo={this.props.applicationInfo}/>
        );
    }

    protected containerClass(): string {
        return 'page_container';
    }

    protected headerClass(): string {
        return 'page_header';
    }

    protected contentClass(): string {
        return 'page_content';
    }

    protected footerClass(): string {
        return 'page_footer';
    }

    private _renderHeader = () => {
        return (
            <div className={this.headerClass()}>
                {this.renderHeader()}
            </div>
        );
    }

    private _renderContent = () => {
        return (
            <div className={this.contentClass()}>
                {this.renderContent()}
            </div>
        );
    }

    private _renderFooter = () => {
        return (
            <div className={this.footerClass()}>
                {this.renderFooter()}
            </div>
        );
    }
}

export default Page;
