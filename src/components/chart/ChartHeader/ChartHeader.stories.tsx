import React from 'react';
import { storiesOf } from '@storybook/react';
import { ChartHeader } from './ChartHeader';
import { withKnobs } from '@storybook/addon-knobs';

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('ChartHeader', () => <ChartHeader title="Title" />);
