import React from 'react';
import { storiesOf } from '@storybook/react';
import { LineChart } from './LineChart';

storiesOf('Charts', module).add('Line chart', () => (
  <div>
    <LineChart />
  </div>
));
