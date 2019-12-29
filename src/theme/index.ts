// @flow
import { mediumGray, lightGray } from '../constants/colors';

export type HexColor = string;

export interface ColorTheme {
  components: {
    chart: {
      axis: {
        tick: {
          color: HexColor;
        };
        line: {
          stroke: HexColor;
        };
        gridline: {
          stroke: HexColor;
        };
      };
    };
    card: {
      border: {
        color: HexColor;
      };
    };
    text: {
      color: HexColor;
    };
  };
}

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
        color: lightGray,
      },
    },
    text: {
      color: mediumGray,
    },
  },
};

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
        color: lightGray,
      },
    },
    text: {
      color: mediumGray,
    },
  },
};

export const colorThemes = {
  dark: darkColorTheme,
  light: lightColorTheme,
};
