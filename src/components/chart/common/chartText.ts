export const ellipsis = (text: string, charLimitBeforeEllipsis: number) =>
  text.length > charLimitBeforeEllipsis
    ? `${text.substr(0, charLimitBeforeEllipsis).trim()}…`
    : text;

export const defaultDomainFormatter = <T extends { label: string }>(data: T) =>
  data.label;

export const defaultRangeValueFormatter = (n: number | string) =>
  parseFloat(n.toString())
    .toFixed(2)
    .toString();

export const defaultRangeFormatter = <T extends { value: number }>(data: T) =>
  defaultRangeValueFormatter(data.value);
