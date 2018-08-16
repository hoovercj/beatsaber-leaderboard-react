import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { AppDecorator } from '../decorators';

import { KpiGroupProps } from 'src/components/kpi-group/index';
import { SummaryCard, SummaryCardProps } from 'src/components/summary-card';
import { SummaryList } from 'src/components/summary-list';

const kpis: KpiGroupProps = {
    name: 'Kpi Group',
    kpis: [{
        name: 'Kpi 1',
        value: 'Awesome',
        subvalue: 'Subtext'
    },{
        name: 'Kpi 2',
        value: 'Bad'
    }]
};

let seed = 1;
const generateSummaryCardProps = (id: string = String(seed++)): SummaryCardProps => {
    return {
        title: `Summary Card ${id}`,
        subtitle: 'Subtitlessss',
        kpiData: kpis,
    }
};

const generateSummaryCards = (count: number = 5): SummaryCardProps[] => {
    const ret: SummaryCardProps[] = [];
    for(let i = 0; i < count; i++)  {
        ret.push(generateSummaryCardProps());
    }

    return ret;
}

storiesOf('Summaries and KPIs', module)
  .addDecorator(AppDecorator)
  .add('Summary Card', () => <SummaryCard
      title='Summary Card'
      subtitle='Subtitle'
      kpiData={kpis}
    />
  )
  .add('Summary List', () => <SummaryList
      summaries={generateSummaryCards()}
    />
  );
