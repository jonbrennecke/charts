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
import { EButtonVariant } from '../components';

const cardShadowColor = opacity(trueBlack, 0.05);

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
          [EButtonVariant.default]: transparent,
          [EButtonVariant.primary]: mediumBlue,
        },
        color: {
          [EButtonVariant.default]: lightGray,
          [EButtonVariant.primary]: transparent,
        },
      },
      hover: {
        shadow: lightGray,
        backgroundColor: {
          [EButtonVariant.default]: transparent,
          [EButtonVariant.primary]: brighter(mediumBlue, 0.33),
        },
        border: {
          [EButtonVariant.default]: mediumBlue,
          [EButtonVariant.primary]: brighter(mediumBlue, 0.33),
        },
        color: {
          [EButtonVariant.default]: mediumBlue,
          [EButtonVariant.primary]: trueWhite,
        },
      },
      active: {
        backgroundColor: {
          [EButtonVariant.default]: transparent,
          [EButtonVariant.primary]: darker(mediumBlue, 0.33),
        },
        border: {
          [EButtonVariant.default]: darker(mediumBlue, 0.5),
          [EButtonVariant.primary]: darker(mediumBlue, 0.33),
        },
        color: {
          [EButtonVariant.default]: darker(mediumBlue, 0.5),
          [EButtonVariant.primary]: trueWhite,
        },
      },
    },
  },
};
