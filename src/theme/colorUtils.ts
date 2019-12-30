import { color } from 'd3-color';

export const withOpacity = (colorSpecifier: string, opacity: number) => {
  const clr = color(colorSpecifier)!;
  clr.opacity = opacity;
  return clr.toString();
};

export const brighter = (colorSpecifier: string, k: number) => {
  const clr = color(colorSpecifier)!;
  return clr.brighter(k).toString();
};
