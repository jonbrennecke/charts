export const ellipsis = (text: string, charLimitBeforeEllipsis: number) =>
  text.length > charLimitBeforeEllipsis
    ? `${text.substr(0, charLimitBeforeEllipsis)}…`
    : text;
