import React from 'react';
import { storiesOf } from '@storybook/react';
import { ChartHeader } from './ChartHeader';
import { withKnobs } from '@storybook/addon-knobs';
import { Map } from 'immutable';

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('ChartHeader', () => <ChartHeader title="Title" categories={Map()} />);
