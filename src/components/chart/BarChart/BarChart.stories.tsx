import { boolean, withKnobs, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { range } from 'd3-array';
import { randomUniform } from 'd3-random';
import { schemeSet3 } from 'd3-scale-chromatic';
import { List, Map } from 'immutable';
import fromPairs from 'lodash/fromPairs';
import React from 'react';
import uuid from 'uuid';
import { wrapWithChartHeader } from '../ChartHeader';
import { BarChart } from './BarChart';
import randomWords from 'random-words';
import { GridLineStyle } from '../GridLines/GridLines';
import { capitalizeFirstLetter } from '../common';
import { wrapWithTooltip } from '../Tooltip';
import { resizableChart } from '../ChartDimensions';
import { wrapWithLegend } from '../Legend';

export const padding = {
  top: 15,
  bottom: 25,
  left: 25,
  right: 15,
};

const yDomain = [0, 100];
const numberOfStacks = 20;

const random = randomUniform(yDomain[0], yDomain[1]);

const colors = fromPairs(
  schemeSet3.map((color, i) => [capitalizeFirstLetter(randomWords()), color])
);

const categories = Object.keys(colors);

const makeRandomBarData = () =>
  categories.reduce(
    (map, category) =>
      map.set(category, {
        id: uuid.v4(),
        value: random(),
      }),
    Map<string, { id: string; value: ReturnType<typeof random> }>()
  );

const data = range(numberOfStacks).reduce(
  (list, _x, i) =>
    list.push({
      id: uuid.v4(),
      label: 'Lorem ipsum',
      data: makeRandomBarData(),
    }),
  List() as List<{
    id: string;
    label: string;
    data: Map<string, { id: string; value: number }>;
  }>
);

const BarChartComponent = wrapWithLegend(
  resizableChart(wrapWithTooltip(BarChart))
);

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('Bar chart', () => (
    <BarChartComponent
      data={data}
      categories={categories}
      padding={padding}
      colorAccessor={key => colors[key]}
      showHorizontalGridLines={boolean('Show horizontal grid lines', true)}
      showVerticalGridLines={boolean('Show vertical grid lines', true)}
      showTooltipOnHover={boolean('Show tooltip on hover', true)}
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
