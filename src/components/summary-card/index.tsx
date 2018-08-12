import { Link } from 'office-ui-fabric-react';
import * as React from 'react';

import './index.css';

import { Card } from 'src/components/card';
import { KpiData } from 'src/components/kpi';
import { KpiGroup } from 'src/components/kpi-group';

export interface SummaryCardProps {
    title: string;
    subtitle: string;
    kpis: KpiData[];
}

export class SummaryCard extends React.Component<SummaryCardProps> {
    public render() {
        const { title, subtitle, kpis } = this.props;

        return (
            <Card>
                <div className={'summary-card_container'}>
                    <div className={'summary-card_header-wrapper'}>
                        <Link
                            className={'summary-card_name'}
                        >
                            {title}
                        </Link>
                        <div className={'summary-card_subheader'}>{subtitle}</div>
                        <KpiGroup kpis={kpis} />
                    </div>
                </div>
            </Card>
        );
    }
}