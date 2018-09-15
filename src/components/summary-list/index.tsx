import { List } from 'office-ui-fabric-react';
import * as React from 'react';

import './index.css';

import { FilterBar } from 'src/components/filter-bar/index';
import {
    SummaryCard,
    SummaryCardProps,
} from 'src/components/summary-card';

export interface SummaryListProps {
    renderHeader?: () => JSX.Element;
    summaries: SummaryCardProps[];
}

export interface SummaryListState {
    searchText: string;
}

export class SummaryList extends React.Component<SummaryListProps, SummaryListState> {
    constructor(props: SummaryListProps) {
        super(props);
        this.state = {
            searchText: '',
        }
    }

    public render() {
        return (
            <div className='summary-list_container'>
                {this.props.renderHeader && this.props.renderHeader()}
                <FilterBar
                    onSearch={this.onSearch}
                />
                <List
                    items={this.filteredItems}
                    onRenderCell={this.renderItem}
                />
            </div>

        );
    }

    private get filteredItems(): SummaryCardProps[] {
        const searchText = this.state.searchText.toLowerCase();

        if (!searchText.trim()) {
            return this.props.summaries;
        }

        return this.props.summaries.filter(summary => {
            return summary.title.toString().toLowerCase().indexOf(searchText) >= 0
                || summary.subtitle.toString().toLowerCase().indexOf(searchText) >= 0
                || summary.kpiData.kpis.findIndex(kpi => {
                    return kpi.name.toString().toLowerCase().indexOf(searchText) >= 0
                        || kpi.value.toString().toLowerCase().indexOf(searchText) >= 0;
                }) >= 0
        });
    }

    private onSearch = (value: string) => {
        this.setState({
            searchText: value,
        });
    }

    private renderItem = (item: SummaryCardProps) => {
        return (
            <SummaryCard
                {...item}
            />
        );
    }
}