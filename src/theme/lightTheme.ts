import {
  darkGray,
  mediumGray,
  mediumLightGray,
  lightGray,
  trueBlack,
  trueWhite,
  lightBlue,
  mediumBlue,
  transparent,
} from '../constants/colors';
import { ColorTheme } from './themeTypes';
import { opacity, brighter, darker } from './colorUtils';

const cardShadowColor = opacity(trueBlack, 0.05);

export const lightColorTheme: ColorTheme = {
  components: {
    chart: {
      pie: {
        slice: {
          stroke: mediumGray,
        },
      },
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
      link: {
        color: mediumLightGray,
        activeColor: darkGray,
        hoverColor: mediumGray,
      },
      input: {
        placeholderColor: lightGray,
        color: mediumGray,
      },
    },
  },
};
