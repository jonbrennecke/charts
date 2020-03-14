import isNil from 'lodash/isNil';

export const ellipsis = (text: string, charLimitBeforeEllipsis: number) =>
  text.length > charLimitBeforeEllipsis
    ? `${text.substr(0, charLimitBeforeEllipsis).trim()}…`
    : text;

export const defaultDomainFormatter = <T extends { label: string }>(data: T) =>
  data.label;

export const numericFormatter = (n: number | string | null) =>
  isNil(n)
    ? ''
    : parseFloat(n.toString())
        .toFixed(2)
        .toString();

export const defaultRangeValueFormatter = numericFormatter;

export const defaultRangeFormatter = <
  T extends { value: number | string | null }
>(
  data: T
) => defaultRangeValueFormatter(data.value);

export const capitalizeFirstLetter = (str: string) =>
  str.length > 0
    ? `${str.replace(/^./, str.charAt(0).toLocaleUpperCase())}`
    : str;
