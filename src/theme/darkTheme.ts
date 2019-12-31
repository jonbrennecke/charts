import {
  mediumGray,
  lightGray,
  trueBlack,
  trueWhite,
} from '../constants/colors';
import { ColorTheme } from './themeTypes';

export const darkColorTheme: ColorTheme = {
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
        shadowColor: trueBlack,
      },
      header: {
        border: {
          color: lightGray,
        },
        shadow: {
          color: trueBlack,
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
      options: {
        backgroundColor: trueWhite,
      },
      option: {
        hoverBackgroundColor: lightGray,
      },
    },
  },
};
