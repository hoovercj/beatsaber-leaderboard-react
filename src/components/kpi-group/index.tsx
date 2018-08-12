import * as React from 'react';
import './index.css';

import {
    Kpi,
    KpiData,
} from 'src/components/kpi';

export interface KpiGroupProps {
    kpis: KpiData[];
}

export class KpiGroup extends React.Component<KpiGroupProps> {

    public render() {
        return (
            <div className={'kpi-group_container'}>
                {this.renderKpis()}
            </div>
        );
    }

    private renderKpis = () => {
        const kpiCount = this.props.kpis.length;
        const showBorder = (index: number) => index < (kpiCount - 1);
        return this.props.kpis.map((kpi, index) => this.renderKpi(kpi, showBorder(index)));
    }

    private renderKpi = (kpi: KpiData, showBorder: boolean = true) => {
        return (
            <div key={kpi.name} className={'kpi-group_stat-wrapper'}>
                <div className={'kpi-group_stat'}>
                    <Kpi name={kpi.name} value={kpi.value} />
                </div>
                {showBorder && <div className={'kpi-group_separator'}>{/*nothing*/}</div>}
            </div>
        )
    }
}