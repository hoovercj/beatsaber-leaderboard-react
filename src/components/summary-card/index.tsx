import * as React from 'react';

import './index.css';

import { Card } from 'src/components/card';
import { KpiGroup, KpiGroupProps as KpiGroupData } from 'src/components/kpi-group';
import { Link } from 'src/components/link';

export interface SummaryCardProps {
    title: string;
    titleLink?: string;
    subtitle: string;
    subtitleLink?: string;
    kpiData: KpiGroupData;
}

export class SummaryCard extends React.Component<SummaryCardProps> {
    public render() {
        const { title, titleLink, subtitle, kpiData } = this.props;

        const TitleComponent = titleLink ? Link : 'span';

        return (
            <Card>
                <div className={'summary-card_container'}>
                    <div className={'summary-card_header-wrapper'}>
                        <TitleComponent
                            to={titleLink}
                            className={'summary-card_name'}
                        >
                            {title}
                        </TitleComponent>
                        <div className={'summary-card_subheader'}>{subtitle}</div>
                        <KpiGroup name={kpiData.name} kpis={kpiData.kpis} />
                    </div>
                </div>
            </Card>
        );
    }
}