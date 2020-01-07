import { css } from 'styled-components';

export const cssEllipsis = () =>
  css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
