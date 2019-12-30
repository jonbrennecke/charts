import { color } from 'd3-color';

import { mediumGray, lightGray, trueBlack } from '../constants/colors';
import { ColorTheme } from './themeTypes';
import { withOpacity, brighter } from './colorUtils';

const cardShadowColor = withOpacity(trueBlack, 0.05);

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
        shadowColor: cardShadowColor,
      },
      header: {
        border: {
          color: lightGray,
        },
        shadow: {
          color: cardShadowColor,
        },
      },
    },
    text: {
      base: {
        color: mediumGray,
      },
      placeholder: {
        color: lightGray,
      },
    },
    select: {
      border: {
        color: lightGray,
        hoverColor: mediumGray,
      },
      option: {
        hoverBackgroundColor: brighter(lightGray, 0.33),
      },
    },
  },
};
