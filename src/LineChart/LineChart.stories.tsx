import React from 'react';
import { storiesOf } from '@storybook/react';
import uuid from 'uuid';
import { scaleLinear } from 'd3-scale';
import { range } from 'd3-array';
import { randomUniform } from 'd3-random';
import { LineChart } from './LineChart';
import { Map } from 'immutable';

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
const values = range(yDomain[1]).map(random);

const makeLineData = () =>
  range(yDomain[1]).map((y, i) => ({ id: uuid.v4(), y: random(), x: i }));

const data = Map<string, ReturnType<typeof makeLineData>>()
  .set('a', makeLineData())
  .set('b', makeLineData())
  .set('c', makeLineData());

const colors = {
  a: '#0000ff',
  b: '#00ff00',
  c: '#ff0000',
};

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
