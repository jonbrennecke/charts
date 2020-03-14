import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { range } from 'd3-array';
import { randomUniform } from 'd3-random';
import { schemeSet3 } from 'd3-scale-chromatic';
import { Map } from 'immutable';
import fromPairs from 'lodash/fromPairs';
import randomWords from 'random-words';
import React from 'react';
import uuid from 'uuid';
import { capitalizeFirstLetter, numericFormatter } from '../common';
import { GridLineStyle } from '../GridLines/GridLines';
import { wrapWithTooltip } from '../Tooltip';
import { LineChart } from './LineChart';

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

type Value = {
  id: string;
  x: number;
  y: number;
};

const makeRandomLineData = () =>
  range(numberOfPoints).map(
    (y, i): Value => ({ id: uuid.v4(), y: random(), x: i })
  );

const colors = fromPairs(
  schemeSet3
    .slice(0, 3)
    .map((color, i) => [capitalizeFirstLetter(randomWords()), color])
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
      tooltipValueFormatter={(v: Value) =>
        `${numericFormatter(v.x)} ${numericFormatter(v.y)}`
      }
    />
  ));
