import {
  darkGray,
  mediumGray,
  mediumLightGray,
  lightGray,
  trueBlack,
  trueWhite,
  lightBlue,
  mediumBlue,
} from '../constants/colors';
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
    select: {
      border: {
        color: lightGray,
        hoverColor: mediumGray,
      },
      options: {
        backgroundColor: trueWhite,
      },
      option: {
        hoverBackgroundColor: brighter(lightGray, 0.33),
      },
    },
    list: {
      item: {
        hoverColor: mediumBlue,
        hoverBackgroundColor: lightBlue,
        selectedColor: mediumBlue,
      },
    },
    form: {
      field: {
        shadowColor: cardShadowColor,
        borderColor: lightGray,
      },
    },
    button: {
      base: {
        shadowColor: cardShadowColor,
        borderColor: lightGray,
      },
      hover: {
        borderColor: mediumLightGray,
        shadowColor: lightGray,
      },
      active: {
        backgroundColor: brighter(lightGray, 0.33),
      },
    },
  },
};
