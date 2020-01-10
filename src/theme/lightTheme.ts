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
        selectedBackgroundColor: lightBlue,
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
        shadow: opacity(cardShadowColor, 0.02),
        primaryText: trueWhite,
        backgroundColor: {
          default: transparent,
          primary: mediumBlue,
        },
        color: {
          default: lightGray,
          primary: transparent,
        },
      },
      hover: {
        shadow: lightGray,
        backgroundColor: {
          default: transparent,
          primary: brighter(mediumBlue, 0.33),
        },
        border: {
          default: mediumBlue,
          primary: brighter(mediumBlue, 0.33),
        },
        color: {
          default: mediumBlue,
          primary: trueWhite,
        },
      },
      active: {
        backgroundColor: {
          default: transparent,
          primary: darker(mediumBlue, 0.33),
        },
        border: {
          default: darker(mediumBlue, 0.5),
          primary: darker(mediumBlue, 0.33),
        },
        color: {
          default: darker(mediumBlue, 0.5),
          primary: trueWhite,
        },
        borderShadow: {
          default: mediumBlue,
          primary: mediumBlue,
        },
      },
    },
  },
};
