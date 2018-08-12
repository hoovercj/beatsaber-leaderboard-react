import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

// tslint:disable-next-line
const { Welcome } = require('@storybook/react/demo');

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

