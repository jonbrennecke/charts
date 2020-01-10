import React from 'react';
import { storiesOf } from '@storybook/react';
import uuid from 'uuid';
import { range } from 'd3-array';
import { randomUniform } from 'd3-random';
import { PieChart } from './PieChart';
import { Map } from 'immutable';
import { schemeSet3 } from 'd3-scale-chromatic';
import fromPairs from 'lodash/fromPairs';
import { withKnobs } from '@storybook/addon-knobs';

const dimensions = {
  height: 240,
  width: 640,
};

export const padding = {
  top: 15,
  bottom: 15,
  left: 25,
  right: 25,
};

const yDomain = [0, 100];
const random = randomUniform(yDomain[0], yDomain[1]);
const colors = fromPairs(
  schemeSet3.map((color, i) => [String.fromCharCode(65 + i), color])
);
const categories = Object.keys(colors);
const data = categories.reduce(
  (map, category) =>
    map.set(category, {
      label: `${category}: Lorem ipsum dolor sit amet`,
      value: random(),
    }),
  Map<string, { value: number; label: string }>()
);

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('Pie chart', () => (
    <PieChart
      data={data}
      dimensions={dimensions}
      padding={padding}
      colorAccessor={key => colors[key]}
    />
  ));
