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
      };
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
      },
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
      },
    },
  },
};

export const colorThemes = {
  dark: darkColorTheme,
  light: lightColorTheme,
};
