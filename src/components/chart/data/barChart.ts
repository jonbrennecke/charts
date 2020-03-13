import { range } from 'd3-array';
import { randomUniform } from 'd3-random';
import { schemeSet3 } from 'd3-scale-chromatic';
import { List, Map } from 'immutable';
import fromPairs from 'lodash/fromPairs';
import randomWords from 'random-words';
import uuid from 'uuid';
import { capitalizeFirstLetter, IChartPadding } from '../common';

const colors = fromPairs(
  schemeSet3.map((color, i) => [capitalizeFirstLetter(randomWords()), color])
);

const categories = Object.keys(colors);

const makeRandomBarData = (random: () => number) =>
  categories.reduce(
    (map, category) =>
      map.set(category, {
        id: uuid.v4(),
        value: random(),
      }),
    Map<string, { id: string; value: ReturnType<typeof random> }>()
  );

const makeRandomValueGenerator = (min: number, max: number) =>
  randomUniform(min, max);

const generateRandomBarChartData = (
  numberOfStacks: number,
  [y0, y1]: [number, number]
) =>
  range(numberOfStacks).reduce(
    (list, _x, i) =>
      list.push({
        id: uuid.v4(),
        label: 'Lorem ipsum',
        data: makeRandomBarData(makeRandomValueGenerator(y0, y1)),
      }),
    List() as List<{
      id: string;
      label: string;
      data: Map<string, { id: string; value: number }>;
    }>
  );

export const generateRandomBarChartConfigForStory = ({
  numberOfStacks = 20,
  padding = {
    top: 15,
    bottom: 25,
    left: 25,
    right: 15,
  },
  range = [0, 100],
}: {
  numberOfStacks?: number;
  padding?: IChartPadding;
  range?: [number, number];
} = {}) => ({
  data: generateRandomBarChartData(numberOfStacks, range),
  categories,
  padding,
  colors,
});
