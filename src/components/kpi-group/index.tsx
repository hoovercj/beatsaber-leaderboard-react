import * as React from 'react';
import './index.css';

import {
    Kpi,
    KpiData,
} from 'src/components/kpi';

export interface KpiGroupProps {
    name?: string;
    kpis: KpiData[];
}

export class KpiGroup extends React.Component<KpiGroupProps> {

    public render() {
        return (
            <div>
                {this.props.name &&
                    <div className='kpi-group_name'>{this.props.name}</div>
                }
                <div className={'kpi-group_container'}>
                    {this.renderKpis()}
                </div>
            </div>
        );
    }

    private renderKpis = () => {
        const kpiCount = this.props.kpis.length;
        const showBorder = (index: number) => index < (kpiCount - 1);
        return this.props.kpis.map((kpi, index) => this.renderKpi(kpi, showBorder(index)));
    }

    private renderKpi = (kpi: KpiData, showBorder: boolean = true) => {
        const key = kpi.key ? kpi.key : kpi.name;
        return (
            <div key={key} className={'kpi-group_stat-wrapper'}>
                <div className={'kpi-group_stat'}>
                    <Kpi {...kpi} />
                </div>
                {showBorder && <div className={'kpi-group_separator'}>{/*nothing*/}</div>}
            </div>
        )
    }
}
