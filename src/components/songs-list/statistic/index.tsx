import * as React from 'react';
import './index.css';

export interface StatisticData {
    name: string;
    value: string;
}

// tslint:disable-next-line
export interface StatisticProps extends StatisticData {}

export class Statistic extends React.Component<StatisticProps> {

    public render() {
        return (
            <div className={'statistic_container'}>
                <div className={'statistic_name'}>
                    {this.props.name}
                </div>
                <b className={'statistic_value'}>
                    {this.props.value}
                </b>
            </div>
        );
    }
}