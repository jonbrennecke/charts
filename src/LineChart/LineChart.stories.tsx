import React from 'react';
import { storiesOf } from '@storybook/react';
import uuid from 'uuid';
import { scaleLinear } from 'd3-scale';
import { range } from 'd3-array';
import { randomUniform } from 'd3-random';
import { LineChart } from './LineChart';
import { Map } from 'immutable';
import { schemeSet3 } from 'd3-scale-chromatic';
import fromPairs from 'lodash/fromPairs';

const dimensions = {
  height: 240,
  width: 640,
};

const numberOfDataPoints = 10;
const yDomain = [0, 100];
const xDomain = [0, numberOfDataPoints];

const xScale = scaleLinear()
  .domain(xDomain)
  .range([0, dimensions.width]);

const yScale = scaleLinear()
  .domain(yDomain)
  .range([dimensions.height, 0]);

const random = randomUniform(yDomain[0], yDomain[1]);

const makeRandomLineData = () =>
  range(yDomain[1]).map((y, i) => ({ id: uuid.v4(), y: random(), x: i }));

const colors = fromPairs(
  schemeSet3.map((color, i) => [String.fromCharCode(i), color])
);

const categories = Object.keys(colors);

const data = categories.reduce(
  (map, category) => map.set(category, makeRandomLineData()),
  Map<string, ReturnType<typeof makeRandomLineData>>()
);

storiesOf('Charts', module).add('Line chart', () => (
  <div style={{ width: 320, height: 240 }}>
    <LineChart
      data={data}
      xScale={xScale}
      yScale={yScale}
      colorAccessor={key => colors[key]}
    />
  </div>
));
