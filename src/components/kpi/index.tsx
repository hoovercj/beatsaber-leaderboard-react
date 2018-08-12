import * as React from 'react';
import './index.css';

export interface KpiData {
    name: string;
    value: string;
}

// tslint:disable-next-line
export interface KpiProps extends KpiData {}

export class Kpi extends React.Component<KpiProps> {

    public render() {
        return (
            <div className={'kpi_container'}>
                <div className={'kpi_name'}>
                    {this.props.name}
                </div>
                <b className={'kpi_value'}>
                    {this.props.value}
                </b>
            </div>
        );
    }
}