import * as React from 'react';

import './index.css';

import { RenderFunction } from '@storybook/react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

initializeIcons();

export const AppDecorator = (story: RenderFunction) => (
  <div className='app'>
    {story()}
  </div>
);