import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Legend, LegendItem } from './Legend';
import randomWords from 'random-words';
import { capitalizeFirstLetter } from '../common';

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('Legend', () => (
    <Legend>
      <LegendItem color="#ffff00">
        {capitalizeFirstLetter(randomWords())}
      </LegendItem>
      <LegendItem color="#00ffff">
        {capitalizeFirstLetter(randomWords())}
      </LegendItem>
    </Legend>
  ));
