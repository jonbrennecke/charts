import React from 'react';
import { storiesOf } from '@storybook/react';
import uuid from 'uuid';
import { range } from 'd3-array';
import { randomUniform } from 'd3-random';
import { LineChart } from './LineChart';
import { Map } from 'immutable';
import { schemeSet3 } from 'd3-scale-chromatic';
import fromPairs from 'lodash/fromPairs';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { GridLineStyle } from '../GridLines/GridLines';
import { wrapWithTooltip } from '../Tooltip';

const dimensions = {
  height: 240,
  width: 640,
};

export const padding = {
  top: 15,
  bottom: 15,
  left: 15,
  right: 15,
};

const yDomain = [0, 100];
const numberOfPoints = 50;

const random = randomUniform(yDomain[0], yDomain[1]);

const makeRandomLineData = () =>
  range(numberOfPoints).map((y, i) => ({ id: uuid.v4(), y: random(), x: i }));

const colors = fromPairs(
  schemeSet3.slice(0, 3).map((color, i) => [String.fromCharCode(i), color])
);

const categories = Object.keys(colors);

const data = categories.reduce(
  (map, category) => map.set(category, makeRandomLineData()),
  Map<string, ReturnType<typeof makeRandomLineData>>()
);

const LineChartComponent = wrapWithTooltip(LineChart);

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('Line chart', () => (
    <LineChartComponent
      data={data}
      dimensions={dimensions}
      padding={padding}
      colorAccessor={key => colors[key]}
      yDomain={[-100, 200]}
      numberOfYTicks={5}
      showHorizontalGridLines={boolean('Show horizontal grid lines', true)}
      showVerticalGridLines={boolean('Show vertical grid lines', true)}
      gridlineStyle={select(
        'grid line style',
        {
          Solid: GridLineStyle.solid,
          Dashed: GridLineStyle.dashed,
          Dotted: GridLineStyle.dotted,
        },
        GridLineStyle.solid
      )}
    />
  ));
