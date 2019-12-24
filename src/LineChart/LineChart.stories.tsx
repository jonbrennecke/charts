import React from 'react';
import { storiesOf } from '@storybook/react';
import uuid from 'uuid';
import { scaleLinear } from 'd3-scale';
import { range } from 'd3-array';
import { randomUniform } from 'd3-random';
import { LineChart } from './LineChart';

const dimensions = {
  height: 240,
  width: 320,
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

const chartData = values.map((y, i) => ({ id: uuid.v4(), y, x: i }));

storiesOf('Charts', module).add('Line chart', () => (
  <div style={{ width: 320, height: 240 }}>
    <LineChart data={chartData} xScale={xScale} yScale={yScale} />
  </div>
));
