import { boolean, select, withKnobs, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { range } from 'd3-array';
import { randomUniform } from 'd3-random';
import { schemeSet3 } from 'd3-scale-chromatic';
import { Map } from 'immutable';
import fromPairs from 'lodash/fromPairs';
import randomWords from 'random-words';
import React from 'react';
import uuid from 'uuid';
import {
  capitalizeFirstLetter,
  numericFormatter,
  defaultChartNumberOfXTicks,
  defaultChartNumberOfYTicks,
  Curve,
} from '../common';
import { GridLineStyle } from '../GridLines/GridLines';
import { wrapWithTooltip } from '../Tooltip';
import { LineChart, LineChartFillStyle } from './LineChart';

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
    (y, x): Value => ({ id: uuid.v4(), y: random(), x })
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
      showHorizontalGridLines={boolean('Show horizontal grid lines', true)}
      showVerticalGridLines={boolean('Show vertical grid lines', true)}
      gridlineStyle={select(
        'Grid line style',
        {
          Solid: GridLineStyle.solid,
          Dashed: GridLineStyle.dashed,
          Dotted: GridLineStyle.dotted,
        },
        GridLineStyle.dotted
      )}
      tooltipValueFormatter={(v: Value) =>
        `${numericFormatter(v.x)} ${numericFormatter(v.y)}`
      }
      numberOfXTicks={number('Number of X Ticks', defaultChartNumberOfXTicks)}
      numberOfYTicks={number('Number of Y Ticks', defaultChartNumberOfYTicks)}
      curve={select(
        'Curve',
        {
          linear: Curve.Linear,
          step: Curve.Step,
          stepBefore: Curve.StepBefore,
          stepAfter: Curve.StepAfter,
          basis: Curve.Basis,
          cardinal: Curve.Cardinal,
          monotoneX: Curve.MonotoneX,
          catmullRom: Curve.CatmullRom,
        },
        Curve.Linear
      )}
      fillStyle={select(
        'Fill style',
        {
          line: LineChartFillStyle.line,
          area: LineChartFillStyle.area,
        },
        LineChartFillStyle.line
      )}
    />
  ));
