import { color } from 'd3-color';

import { mediumGray, lightGray, trueBlack } from '../constants/colors';
import { ColorTheme } from './themeTypes';

// @ts-ignore
let black = color(trueBlack)!;
black.opacity = 0.05;
const shadowColor = black.toString();

export const lightColorTheme: ColorTheme = {
  components: {
    chart: {
      axis: {
        tick: {
          color: mediumGray,
        },
        line: {
          stroke: mediumGray,
        },
        gridline: {
          stroke: lightGray,
        },
      },
    },
    card: {
      border: {
        borderColor: lightGray,
        shadowColor: shadowColor,
      },
      header: {
        border: {
          color: lightGray,
        },
        shadow: {
          color: shadowColor,
        },
      },
    },
    text: {
      color: mediumGray,
    },
  },
};
