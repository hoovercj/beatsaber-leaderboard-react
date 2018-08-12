import * as React from 'react';

import './index.css';

import { RenderFunction } from '@storybook/react';

export const AppDecorator = (story: RenderFunction) => (
  <div className='app'>
    {story()}
  </div>
);