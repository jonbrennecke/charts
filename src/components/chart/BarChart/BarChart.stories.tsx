import { boolean, select, withKnobs, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { resizableChart } from '../ChartDimensions';
import { generateRandomBarChartConfigForStory } from '../data';
import { GridLineStyle } from '../GridLines/GridLines';
import { wrapWithLegend } from '../Legend';
import { wrapWithTooltip } from '../Tooltip';
import { BarChart } from './BarChart';
import { numericFormatter, defaultChartNumberOfYTicks } from '../common';

const config = generateRandomBarChartConfigForStory();

const BarChartComponent = wrapWithLegend(
  resizableChart(wrapWithTooltip(BarChart))
);

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('Bar chart', () => {
    const { data, categories, padding, colors } = config;
    return (
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
        tooltipValueFormatter={(v: any) => numericFormatter(v.value)}
        numberOfYTicks={number('Number of Y Ticks', defaultChartNumberOfYTicks)}
      />
    );
  });
