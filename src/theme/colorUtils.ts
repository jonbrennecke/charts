import { color } from 'd3-color';

export const opacity = (colorSpecifier: string, opacity: number) => {
  const clr = color(colorSpecifier)!;
  clr.opacity = opacity;
  return clr.toString();
};

export const brighter = (colorSpecifier: string, k: number) => {
  const clr = color(colorSpecifier)!;
  return clr.brighter(k).toString();
};

export const darker = (colorSpecifier: string, k: number) => {
  const clr = color(colorSpecifier)!;
  return clr.darker(k).toString();
};
