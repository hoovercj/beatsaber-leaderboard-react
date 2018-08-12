import { List } from 'office-ui-fabric-react';
import * as React from 'react';

import './index.css';

import {
    SummaryCard,
    SummaryCardProps,
} from 'src/components/summary-card';

export interface SummaryListProps {
    summaries: SummaryCardProps[];
}

export class SummaryList extends React.Component<SummaryListProps> {
    public render() {
        return (
            <List
                items={this.props.summaries}
                className={'summary-list_detailsListContainer'}
                onRenderCell={this.renderItem}
            />

        );
    }

    private renderItem = (item: SummaryCardProps) => {
        return (
            <SummaryCard
                {...item}
            />
        );
    }
}