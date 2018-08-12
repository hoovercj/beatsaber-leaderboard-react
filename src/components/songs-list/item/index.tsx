import { Link } from 'office-ui-fabric-react';
import * as React from 'react';

import './index.css';

import { Card } from 'src/components/card';
import { StatisticData } from 'src/components/songs-list/statistic';
import { StatisticGroup } from 'src/components/songs-list/statistic-group';

export interface SongsListItemProps {
    title: string;
    author: string;
    scores: Score[];
}

export interface Score {
    difficulty: string;
    topPlayer: string;
    fullCombo: boolean;
}

export class SongsListItem extends React.Component<SongsListItemProps> {
    public render() {
        const { title, author, scores } = this.props;

        const stats: StatisticData[] = scores.map(score => {
            return {
                name: score.difficulty,
                value: `${score.topPlayer}${score.fullCombo ? ' (FC)' : ''}`,
            }
        })

        return (
            <Card>
                <div className={'songs-list-item_container'}>
                    <div className={'songs-list-item_header-wrapper'}>
                        <Link
                            className={'songs-list-item_name'}
                        >
                            {title}
                        </Link>
                        <div className={'songs-list-item_subheader'}>{author}</div>
                        <StatisticGroup statistics={stats} />
                    </div>
                </div>
            </Card>
        );
    }
}