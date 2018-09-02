// TODO: Check bundle size before/after
import { debounce } from 'lodash';
import { CommandBar, IContextualMenuItem, Label, SearchBox } from 'office-ui-fabric-react';
import * as React from 'react';

import { Card } from 'src/components/card/index';

import './index.css';

export interface FilterOption {
    label: string;
    active: boolean;
}

export interface FilterProps {
    label: string;
    options: FilterOption[];
    onChange: (filter: FilterOption) => void;
}

export interface FilterBarProps {
    onSearch: (value: string) => void;
    // TODO: Use Filters or remove them
    filters?: FilterProps[];
}

export class FilterBar extends React.Component<FilterBarProps> {

    public render(): JSX.Element {
        return (
            <Card>
                <CommandBar
                    items={this.items}
                    styles={{
                        root: {
                            backgroundColor: 'transparent',
                        }
                    }}
                />
            </Card>
        )
    }

    private get items(): IContextualMenuItem[] {
        const items: IContextualMenuItem[] = [{
            key: 'label',
            onRender: this.renderLabel
        }];

        if (this.props.onSearch) {
            items.push({
                key: 'search',
                onRender: this.renderSearchBox,
            })
        }

        if (this.props.filters) {
            items.push(...this.props.filters.map(filter => {
                return {
                    key: filter.label,
                    name: filter.label,
                    iconProps: {
                        // TODO: use filter solid if filters applied
                        iconName: 'filter',
                    },
                    subMenuProps: {
                        onItemClick: (event, subMenuItem) => filter.onChange(subMenuItem && subMenuItem.data),
                        items: filter.options.map(subMenuItem => {
                            return {
                                key: subMenuItem.label,
                                text: subMenuItem.label,
                                canCheck: true,
                                checked: subMenuItem.active,
                                data: subMenuItem,
                            } as IContextualMenuItem;
                        })
                    },
                    className: 'filter-bar_filter-item',
                } as IContextualMenuItem;
            }));
        }
        return items;
    }

    private renderLabel = (): JSX.Element => {
        return (
            <Label><b>Filter: </b></Label>
        )
    }

    private renderSearchBox = (): JSX.Element => {
        return (
            <SearchBox
                placeholder='Search'
                underlined={true}
                styles={{
                    field: {
                        backgroundColor: 'transparent',
                    },
                    root: {
                        width: '200px',
                    },
                }}
                ariaLabel='Search'
                onSearch={this.props.onSearch}
                onChange={debounce(this.props.onSearch, 500)}
            />
        );
    }
}