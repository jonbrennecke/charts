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
import { LineChart, LineChartFillStyle, LineChartProps } from './LineChart';
import { useState } from '@storybook/addons';
import { resizableChart } from '../ChartDimensions';
import styled from 'styled-components';

export const padding = {
  top: 15,
  bottom: 15,
  left: 15,
  right: 15,
};

const yDomain = [0, 100];
const numberOfPoints = 50;

const randomYData = randomUniform(yDomain[0], yDomain[1]);

const randomCountData = randomUniform(yDomain[0], yDomain[1] * 0.5);

type Value = {
  id: string;
  x: number;
  y: number;
  count: number;
};

const makeRandomLineData = () =>
  range(numberOfPoints).map(
    (y, x): Value => ({
      id: uuid.v4(),
      y: randomYData(),
      x,
      count: randomCountData(),
    })
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

const LineChartComponent = resizableChart(
  wrapWithTooltip(LineChart as React.ComponentType<LineChartProps<Value>>)
);

const Container = styled.div`
  display: flex;
  flex: 1;
  max-width: 768px;
  max-height: 480px;
  height: 100%;
`;

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('Line chart', () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    return (
      <Container>
        <LineChartComponent
          data={data}
          domainConfig={{
            accessor: (value: Value) => value.x,
          }}
          rangeConfig={{
            y: {
              chartType: 'line',
              accessor: (value: Value) => value.y,
            },
            count: {
              chartType: 'bar',
              accessor: (value: Value) => value.count,
            },
          }}
          padding={padding}
          colorAccessor={key => colors[key]}
          selectedCategory={selectedCategory}
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
          numberOfXTicks={number(
            'Number of X Ticks',
            defaultChartNumberOfXTicks
          )}
          numberOfYTicks={number(
            'Number of Y Ticks',
            defaultChartNumberOfYTicks
          )}
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
            Curve.Cardinal
          )}
          fillStyle={select(
            'Fill style',
            {
              line: LineChartFillStyle.line,
              area: LineChartFillStyle.area,
            },
            LineChartFillStyle.line
          )}
          showPoints={boolean('Show Points', true)}
          onValueMouseOver={value => setSelectedCategory(value.category)}
          onValueMouseOut={() => setSelectedCategory('')}
        />
      </Container>
    );
  });
