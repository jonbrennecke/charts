// @flow
import { mediumGray, lightGray } from '../constants/colors';

export type HexColor = string;

export interface ColorTheme {
  components: {
    chart: {
      ticks: {
        color: HexColor;
      };
    };
  };
}

export const darkColorTheme: ColorTheme = {
  components: {
    chart: {
      ticks: {
        color: mediumGray,
      },
    },
  },
};

export const lightColorTheme: ColorTheme = {
  components: {
    chart: {
      ticks: {
        color: mediumGray,
      },
    },
  },
};

export const colorThemes = {
  dark: darkColorTheme,
  light: lightColorTheme,
};
