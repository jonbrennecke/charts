import React from 'react';
import uuid from 'uuid';
import { range } from 'd3-array';
import { randomUniform } from 'd3-random';
import { Map } from 'immutable';
import { schemeSet3 } from 'd3-scale-chromatic';
import fromPairs from 'lodash/fromPairs';
import { shallow } from 'enzyme';

import { LineChart } from './LineChart';
import { dataTestAttr } from '../../../testUtils';

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
  schemeSet3.map((color, i) => [String.fromCharCode(i), color])
);

const categories = Object.keys(colors);

const data = categories.reduce(
  (map, category) => map.set(category, makeRandomLineData()),
  Map<string, ReturnType<typeof makeRandomLineData>>()
);

describe('LineChart', () => {
  it('renders basic components', () => {
    const lineChart = shallow(
      <LineChart
        data={data}
        dimensions={dimensions}
        padding={padding}
        colorAccessor={key => colors[key]}
        yDomain={[-100, 200]}
        numberOfYTicks={5}
      />
    );
    expect(lineChart.find(dataTestAttr('paths')).exists()).toBeTruthy();
    expect(lineChart.find(dataTestAttr('x-axis')).exists()).toBeTruthy();
    expect(lineChart.find(dataTestAttr('y-axis')).exists()).toBeTruthy();
  });

  it('works with empty data', () => {
    const lineChart = shallow(
      <LineChart
        data={Map()}
        dimensions={dimensions}
        padding={padding}
        colorAccessor={key => colors[key]}
        numberOfYTicks={5}
      />
    );
    expect(lineChart.find(dataTestAttr('paths')).exists()).toBeTruthy();
    expect(lineChart.find(dataTestAttr('x-axis')).exists()).toBeTruthy();
    expect(lineChart.find(dataTestAttr('y-axis')).exists()).toBeTruthy();
  });

  describe('gridlines', () => {
    it('renders gridlines if showGridLines is true', () => {
      const lineChart = shallow(
        <LineChart
          data={data}
          dimensions={dimensions}
          padding={padding}
          colorAccessor={key => colors[key]}
          yDomain={[-100, 200]}
          numberOfYTicks={5}
          showGridLines={true}
        />
      );
      expect(
        lineChart.find(dataTestAttr('y-axis-gridlines')).exists()
      ).toBeTruthy();
    });

    it('does not render gridlines if showGridLines is false', () => {
      const lineChart = shallow(
        <LineChart
          data={data}
          dimensions={dimensions}
          padding={padding}
          colorAccessor={key => colors[key]}
          yDomain={[-100, 200]}
          numberOfYTicks={5}
          showGridLines={false}
        />
      );
      expect(
        lineChart.find(dataTestAttr('y-axis-gridlines')).exists()
      ).toBeFalsy();
    });
  });
});
