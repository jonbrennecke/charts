import React from 'react';
import uuid from 'uuid';
import { range } from 'd3-array';
import { randomUniform } from 'd3-random';
import { Map, List } from 'immutable';
import { schemeSet3 } from 'd3-scale-chromatic';
import fromPairs from 'lodash/fromPairs';
import { shallow } from 'enzyme';

import { dataTestAttr } from '../../../testUtils';
import { BarChart } from './BarChart';

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
const numberOfStacks = 20;

const random = randomUniform(yDomain[0], yDomain[1]);

const colors = fromPairs(
  schemeSet3.map((color, i) => [String.fromCharCode(65 + i), color])
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
  List()
);

describe('BarChart', () => {
  it('renders basic components', () => {
    const barChar = shallow(
      <BarChart
        data={data}
        categories={categories}
        dimensions={dimensions}
        padding={padding}
        colorAccessor={key => colors[key]}
      />
    );
    expect(barChar.find(dataTestAttr('x-axis')).exists()).toBeTruthy();
    expect(barChar.find(dataTestAttr('y-axis')).exists()).toBeTruthy();
    expect(barChar.find(dataTestAttr('stacks')).exists()).toBeTruthy();
  });

  it('works with empty data', () => {
    const barChar = shallow(
      <BarChart
        data={List()}
        categories={categories}
        dimensions={dimensions}
        padding={padding}
        colorAccessor={key => colors[key]}
      />
    );
    expect(barChar.find(dataTestAttr('x-axis')).exists()).toBeTruthy();
    expect(barChar.find(dataTestAttr('y-axis')).exists()).toBeTruthy();
    expect(barChar.find(dataTestAttr('stacks')).exists()).toBeTruthy();
  });

  describe('gridlines', () => {
    it('renders gridlines if showGridLines is true', () => {
      const barChar = shallow(
        <BarChart
          data={data}
          categories={categories}
          dimensions={dimensions}
          padding={padding}
          colorAccessor={key => colors[key]}
          showGridLines={true}
        />
      );
      expect(barChar.find(dataTestAttr('y-axis-gridlines')).exists()).toBeTruthy();
    });

    it('does not render gridlines if showGridLines is false', () => {
      const barChar = shallow(
        <BarChart
          data={data}
          categories={categories}
          dimensions={dimensions}
          padding={padding}
          colorAccessor={key => colors[key]}
          showGridLines={false}
        />
      );
      expect(barChar.find(dataTestAttr('y-axis-gridlines')).exists()).toBeFalsy();
    });
  });
});
