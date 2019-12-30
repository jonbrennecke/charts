import { mediumGray, lightGray, trueBlack } from '../constants/colors';
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
      color: mediumGray,
    },
    select: {
      border: {
        color: lightGray,
        hoverColor: mediumGray,
      },
      option: {
        hoverBackgroundColor: lightGray,
      },
    },
  },
};
