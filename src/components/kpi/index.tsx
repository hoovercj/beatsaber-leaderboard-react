import * as React from 'react';
import './index.css';

export interface KpiData {
    name: string;
    value: string;
    valueLink?: string;
    subvalue?: string;
    inlineValue?: boolean;
}

// tslint:disable-next-line
export interface KpiProps extends KpiData {}

export class Kpi extends React.Component<KpiProps> {

    public render() {
        return (
            <div className='kpi_container'>
                <div className='kpi_name'>
                    {this.props.name}
                </div>
                {this.renderValue()}
            </div>
        );
    }

    private renderValue(): JSX.Element {
        const renderValueCore = () => (
            <React.Fragment>
                <span className='kpi_value'>
                    {this.props.value}
                </span>
                {this.props.subvalue && (
                    <span className='kpi_subvalue'>{this.props.subvalue}</span>
                )}
            </React.Fragment>
        );

        return this.props.inlineValue ?
            (<div className='kpi_value_inline'>{renderValueCore()}</div>) :
            renderValueCore();
    }
}